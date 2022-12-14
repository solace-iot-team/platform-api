import L from '../server/common/logger';
import { Service } from "./clients/solacecloud/models/Service";
import { ServiceRegistry } from "./serviceregistry";
import solacecloudfacade from "./solacecloudfacade";
import { MessagingServicesService } from "./clients/ep.2.0/services/MessagingServicesService";
import { MessagingServicesServiceDefault } from "./clients/ep.2.0/services/MessagingServicesServiceDefault";
import { getEventPortalBaseUrl, getEventPortalToken, getOrg } from "./cloudtokenhelper";
import { ApiOptions } from './clients/ep.2.0/core/ApiOptions';
import { ErrorResponseInternal } from "../server/api/middlewares/error.handler";

import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { MessagingServiceResponse } from './clients/ep.2.0/models/MessagingServiceResponse';
import { MessagingServicesResponse } from './clients/ep.2.0/models/MessagingServicesResponse';
import { MessagingService } from './clients/ep.2.0/models/MessagingService';
import { MessagingServiceConnection } from './clients/ep.2.0/models/MessagingServiceConnection';

const serviceCache = new CacheContainer(new MemoryStorage());
const servicesCache = new CacheContainer(new MemoryStorage());

const opts: ApiOptions = {
    baseUrl: getEventPortalBaseUrl,
    token: getEventPortalToken,

};

interface MessagingProtocol {
    name: string,
    username: string,
    password: string,
    endPoints: Array<{
        name: string,
        transport: string,
        uris: Array<string>,
        secured: string,
        compressed: string,
    }>,
    limits?: any,
}

const NOT_AVAILABLE: string = 'not available';

export class EPServiceRegistry2 implements ServiceRegistry {
    private ep2EnvService: MessagingServicesService;

    constructor() {
        this.ep2EnvService = new MessagingServicesServiceDefault(opts);
    }
    public async getServiceByEnvironment(e: Components.Schemas.Environment): Promise<Service> {
        const svc = await this.getServiceById(e.serviceId);
        if (svc) {
            return svc;
        } else {
            throw new ErrorResponseInternal(404, `Service ${e.serviceId} in environment ${e.name} does not exist or is incorrectly configred`);
        }
    }

    public async getServiceById(id: string): Promise<Service> {
        const cacheKey = this.calculateCacheKey(id);
        let msgSvcResponse = await serviceCache.getItem<MessagingServiceResponse>(cacheKey);

        let svc: Service = null;
        if (!msgSvcResponse) {
            msgSvcResponse = await this.ep2EnvService.getMessagingService(id);
            serviceCache.setItem(this.calculateCacheKey(id), msgSvcResponse, { ttl: 360 });
        }
        if (msgSvcResponse.data) {
            const msgSvc = msgSvcResponse.data;
            if (msgSvc.solaceCloudMessagingServiceId) {
                svc = await solacecloudfacade.getServiceById(msgSvc.solaceCloudMessagingServiceId);
                svc.serviceId = id;
                svc['solaceCloudMessagingServiceId'] = msgSvc.solaceCloudMessagingServiceId;
            } else if (msgSvc['bindings']?.management?.connections?.length > 0) {
                const connection = msgSvc['bindings'].management.connections[0];
                svc = this.createNonCloudService(msgSvc, id);

            }
        }


        return svc;
    }

    private createNonCloudService(msgSvc: MessagingService, id: string): Service {
        let sempConnection = this.findConnectionByProtocol(msgSvc.messagingServiceConnections, 'https', 'semp');
        if (!sempConnection){
            // fall back to plain HTTP SEMP connection
            sempConnection = this.findConnectionByProtocol(msgSvc.messagingServiceConnections, 'http', 'semp'); 
        }
        const connection = msgSvc['bindings'].management.connections[0];
        let sempUrl: string  = "";
        let sempUser: string = "";
        let sempPassword: string = "";
        let sempMsgVpn: string = "";
        //backwards compatibility - try to find undocumented bindings object
        if (sempConnection){
            sempUrl = sempConnection.url;
            sempUser = sempConnection.messagingServiceAuthentications[0].messagingServiceCredentials[0].credentials['username'];
            sempPassword = sempConnection.messagingServiceAuthentications[0].messagingServiceCredentials[0].credentials['password'];
            sempMsgVpn = sempConnection.bindings['msgVpn'];
        } else if (connection && connection.url  && connection.users && connection.users[0].username){
            sempUrl = connection.url;
            sempUser = connection.users[0].username;
            sempPassword = connection.users[0].password;
            sempMsgVpn = connection.msgVpn;
        }
        sempUrl =  sempUrl.includes('/SEMP/v2/config') ? sempUrl : `${sempUrl}/SEMP/v2/config`;
        sempPassword = sempPassword.substring(2, sempPassword.length-1);
        return {
            adminProgress: NOT_AVAILABLE,
            adminState: NOT_AVAILABLE,
            creationState: 'completed',
            datacenterId: msgSvc.eventMeshId,
            datacenterProvider: 'custom',
            messagingProtocols: this.mapMessageProtocols(msgSvc.messagingServiceConnections),
            messagingStorage: 0,
            msgVpnAttributes: null,
            msgVpnName: sempMsgVpn,
            name: msgSvc.name,
            serviceClassDisplayedAttributes: {
                "High Availability": NOT_AVAILABLE,
                Storage: NOT_AVAILABLE,
                Queues: NOT_AVAILABLE,
                Clients: NOT_AVAILABLE,
                "Message Broker Tenancy": NOT_AVAILABLE,
                "Network Speed": NOT_AVAILABLE,
                "Network Usage": NOT_AVAILABLE,
            },
            serviceClassId: NOT_AVAILABLE,
            serviceId: id,
            serviceTypeId: NOT_AVAILABLE,
            servicePackageId: NOT_AVAILABLE,
            managementProtocols: [{
                name: 'SEMP',
                username: sempUser,
                password: sempPassword,
                endPoints: [
                    {
                        name: 'Secured SEMP Config',
                        secured: 'yes',
                        uris: [sempUrl]
                    }
                ]
            }]
        };
    }
    private mapMessageProtocols(connections: MessagingServiceConnection[]): {
        name: string,
        username: string,
        password: string,
        endPoints: Array<{
            name: string,
            transport: string,
            uris: Array<string>,
            secured: string,
            compressed: string,
        }>,
        limits?: any,
    }[] {
        const messagingProtocols = [];
        messagingProtocols.push(this.mapAMQP(connections));
        messagingProtocols.push(this.mapMQTT(connections));
        messagingProtocols.push(this.mapJMS(connections));
        messagingProtocols.push(this.mapSMF(connections));
        messagingProtocols.push(this.mapREST(connections));
        messagingProtocols.push(this.mapWebMessaging(connections));
        return messagingProtocols.filter(m => m != null);
    }

    private mapAMQP(connections: MessagingServiceConnection[]): MessagingProtocol {
        const amqpConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'amqp', 'amqp');
        const amqpsConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'amqps', 'amqp')
        if (amqpConnection || amqpsConnection) {
            const mp: MessagingProtocol = {
                name: 'AMQP',
                endPoints: [],
                password: "",
                username: "",
                limits: {},
            }
            if (amqpConnection) {
                mp.endPoints.push({
                    "name": "AMQP",
                    "transport": "AMQP",
                    "uris": [
                        amqpConnection.url
                    ],
                    "secured": "no",
                    "compressed": "no"
                });
            }
            if (amqpsConnection) {
                mp.endPoints.push(
                    {
                        "name": "Secured AMQP",
                        "transport": "AMQPS",
                        "uris": [
                            amqpsConnection.url
                        ],
                        "secured": "yes",
                        "compressed": "no"
                    }
                );
            }
            return mp;
        } else {
            return null;
        }
    }

    private mapMQTT(connections: MessagingServiceConnection[]): MessagingProtocol {
        const mqttConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'tcp', 'mqtt');
        const secureMqttConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'ssl', 'mqtt');
        const wsMqttConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'ws', 'mqtt');
        const wssMqttConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'wss', 'mqtt');
        if (mqttConnection || secureMqttConnection || wsMqttConnection || wssMqttConnection) {
            const mp: MessagingProtocol = {
                name: 'AMQP',
                endPoints: [],
                password: "",
                username: "",
                limits: {},
            }
            if (mqttConnection) {
                mp.endPoints.push({
                    "name": "MQTT",
                    "transport": "TCP",
                    "uris": [
                        mqttConnection.url
                    ],
                    "secured": "no",
                    "compressed": "no"
                });
            }
            if (secureMqttConnection) {
                mp.endPoints.push({
                    "name": "Secured MQTT",
                    "transport": "SSL",
                    "uris": [
                        secureMqttConnection.url
                    ],
                    "secured": "yes",
                    "compressed": "no"
                });
            }
            if (wsMqttConnection) {
                mp.endPoints.push(
                    {
                        "name": "WebSocket MQTT",
                        "transport": "WS",
                        "uris": [
                            wsMqttConnection.url
                        ],
                        "secured": "no",
                        "compressed": "no"
                    }
                );
            }
            if (wssMqttConnection) {
                mp.endPoints.push(
                    {
                        "name": "WebSocket Secured MQTT",
                        "transport": "WSS",
                        "uris": [
                            wssMqttConnection.url
                        ],
                        "secured": "yes",
                        "compressed": "no"
                    }
                );
            }

            return mp;
        } else {
            return null;
        }
    }

    private mapJMS(connections: MessagingServiceConnection[]): MessagingProtocol {
        const jmsConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'tcp', 'smf');
        const secureJmsConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'tcps', 'smf')
        if (jmsConnection || secureJmsConnection) {
            const mp: MessagingProtocol = {
                name: 'JMS',
                endPoints: [],
                password: "",
                username: "",
                limits: {},
            }
            if (jmsConnection) {
                mp.endPoints.push({
                    "name": "JMS",
                    "transport": "TCP",
                    "uris": [
                        jmsConnection.url
                    ],
                    "secured": "no",
                    "compressed": "no"
                });
            }
            if (secureJmsConnection) {
                mp.endPoints.push(
                    {
                        "name": "Secured JMS",
                        "transport": "TLS",
                        "uris": [
                            secureJmsConnection.url
                        ],
                        "secured": "yes",
                        "compressed": "no"
                    }
                );
            }
            return mp;
        } else {
            return null;
        }
    }

    private mapSMF(connections: MessagingServiceConnection[]): MessagingProtocol {
        const smfConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'tcp', 'smf');
        const secureSmfConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'tcps', 'smf')
        if (smfConnection || secureSmfConnection) {
            const mp: MessagingProtocol = {
                name: 'JMS',
                endPoints: [],
                password: "",
                username: "",
                limits: {},
            }
            if (smfConnection) {
                mp.endPoints.push({
                    "name": "SMF",
                    "transport": "TCP",
                    "uris": [
                        smfConnection.url
                    ],
                    "secured": "no",
                    "compressed": "no"
                });
                mp.endPoints.push(
                    {
                        "name": "Compressed SMF",
                        "transport": "TCP",
                        "uris": [
                            smfConnection.url
                        ],
                        "secured": "no",
                        "compressed": "yes"
                    }
                );
            }
            if (secureSmfConnection) {
                mp.endPoints.push(
                    {
                        "name": "Secured SMF",
                        "transport": "TLS",
                        "uris": [
                            secureSmfConnection.url
                        ],
                        "secured": "yes",
                        "compressed": "no"
                    }
                );
            }
            return mp;
        } else {
            return null;
        }
    }

    private mapREST(connections: MessagingServiceConnection[]): MessagingProtocol {
        const restConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'http', 'rest');
        const secureRestConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'https', 'rest')
        if (restConnection || secureRestConnection) {
            const mp: MessagingProtocol = {
                name: 'JMS',
                endPoints: [],
                password: "",
                username: "",
                limits: {},
            }
            if (restConnection) {
                mp.endPoints.push({
                    "name": "REST",
                    "transport": "HTTP",
                    "uris": [
                        restConnection.url
                    ],
                    "secured": "no",
                    "compressed": "no"
                });

            }
            if (secureRestConnection) {
                mp.endPoints.push(
                    {
                        "name": "Secured REST",
                        "transport": "HTTPS",
                        "uris": [
                            secureRestConnection.url
                        ],
                        "secured": "yes",
                        "compressed": "no"
                    }
                );
            }
            return mp;
        } else {
            return null;
        }
    }

    private mapWebMessaging(connections: MessagingServiceConnection[]): MessagingProtocol {
        const smfConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'ws', 'smf');
        const secureSmfConnection: MessagingServiceConnection = this.findConnectionByProtocol(connections, 'wss', 'smf')
        if (smfConnection || secureSmfConnection) {
            const mp: MessagingProtocol = {
                name: 'JMS',
                endPoints: [],
                password: "",
                username: "",
                limits: {},
            }
            if (smfConnection) {
                mp.endPoints.push({
                    "name": "Web Messaging",
                    "transport": "WS or HTTP",
                    "uris": [
                        smfConnection.url
                    ],
                    "secured": "no",
                    "compressed": "no"
                });
            }
            if (secureSmfConnection) {
                mp.endPoints.push(
                    {
                        "name": "Secured Web Messaging",
                        "transport": "WSS or HTTPS",
                        "uris": [
                            secureSmfConnection.url
                        ],
                        "secured": "yes",
                        "compressed": "no"
                    }
                );
            }
            return mp;
        } else {
            return null;
        }
    }

    private findConnectionByProtocol(connections: MessagingServiceConnection[], transport: string, protocol: string): MessagingServiceConnection {
        return connections.find(c => c.messagingServiceAuthentications?.length > 0
            && c.messagingServiceAuthentications[0].authenticationDetails
            && c.messagingServiceAuthentications[0].authenticationDetails['protocol']
            && c.messagingServiceAuthentications[0].authenticationDetails['protocol'] == transport
            && c.messagingServiceAuthentications[0].authenticationDetails['properties']
            && c.messagingServiceAuthentications[0].authenticationDetails['properties'][0]
            && c.messagingServiceAuthentications[0].authenticationDetails['properties'][0].value == protocol
        );
    }

    public async getServices(): Promise<Service[]> {
        const cacheKey = this.calculateCacheKey();
        const cachedServices = await servicesCache.getItem<MessagingServicesResponse>(cacheKey);
        let msgSvcs: MessagingServicesResponse = cachedServices;
        if (!msgSvcs) {
            msgSvcs = await this.ep2EnvService.getMessagingServices(99, 1);
            servicesCache.setItem(cacheKey, msgSvcs, { ttl: 360 });
        }

        const svcs: Service[] = [];
        if (msgSvcs.data?.length > 0) {
            for (const msgSvc of msgSvcs.data) {
                try {
                    const svc = await this.getServiceById(msgSvc.id);
                    if (svc) {
                        svcs.push(svc);
                    }
                } catch (e) {
                    L.warn(e);
                }
            }
        }
        return svcs;
    }
    private calculateCacheKey(id?: string): string {
        let cacheKey: string = getOrg();
        if (id) {
            cacheKey = `${cacheKey}:${id}`;
        }
        return cacheKey;
    }
}

export default new EPServiceRegistry2();