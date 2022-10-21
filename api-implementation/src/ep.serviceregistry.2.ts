import L from '../server/common/logger';
import { Service } from "./clients/solacecloud/models/Service";
import { ServiceRegistry } from "./serviceregistry";
import solacecloudfacade from "./solacecloudfacade";
import { EnvironmentsService } from "./clients/ep.2.0/services/EnvironmentsService";
import { EnvironmentsServiceDefault } from "./clients/ep.2.0/services/EnvironmentsServiceDefault";
import { getEventPortalBaseUrl, getEventPortalToken, getOrg } from "./cloudtokenhelper";
import { ApiOptions } from './clients/ep.2.0/core/ApiOptions';
import { SolaceMessagingServiceResponse } from "./clients/ep.2.0/models/SolaceMessagingServiceResponse";
import { ErrorResponseInternal } from "../server/api/middlewares/error.handler";
import { SolaceMessagingServicesResponse } from "./clients/ep.2.0/models/SolaceMessagingServicesResponse";
import { EnvironmentMessagingService } from './clients/ep.2.0/models/EnvironmentMessagingService';

import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';

const serviceCache = new CacheContainer(new MemoryStorage());
const servicesCache = new CacheContainer(new MemoryStorage());

const opts: ApiOptions = {
    baseUrl: getEventPortalBaseUrl,
    token: getEventPortalToken,

};

const NOT_AVAILABLE: string = 'not available';

export class EPServiceRegistry2 implements ServiceRegistry {
    private ep2EnvService: EnvironmentsService;

    constructor() {
        this.ep2EnvService = new EnvironmentsServiceDefault(opts);
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
        let msgSvcResponse = await serviceCache.getItem<SolaceMessagingServiceResponse>(cacheKey);

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
            } else if (msgSvc.bindings?.management?.connections?.length > 0) {
                const connection = msgSvc.bindings.management.connections[0];
                svc = this.creaateNonCloudService(msgSvc, connection, id);

            }
        }


        return svc;
    }

    private creaateNonCloudService(msgSvc: EnvironmentMessagingService, connection: { name?: string; authenticationType?: "basicAuthentication"; url?: string; msgVpn?: string; users?: { name?: string; username?: string; password?: string; }[]; }, id: string): Service {
        const sempUrl: string  = connection.url.includes('/SEMP/v2/config')?connection.url:`${connection.url}/SEMP/v2/config`;
        return {
            adminProgress: NOT_AVAILABLE,
            adminState: NOT_AVAILABLE,
            creationState: 'completed',
            datacenterId: msgSvc.eventMeshId,
            datacenterProvider: 'custom',
            messagingProtocols: this.generateMessageProtocolsStandardPorts(connection.url),
            messagingStorage: 0,
            msgVpnAttributes: null,
            msgVpnName: connection.msgVpn,
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
                username: connection.users[0].username,
                password: connection.users[0].password.substring(2, connection.users[0].password.length-1),
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
    private generateMessageProtocolsStandardPorts(sempUri: string): {
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
    }[]{
        const sempParsedURL = new URL(sempUri);
        const mqtt = `tcp://${sempParsedURL.hostname}:1883`;
        L.info(mqtt);
        return [
            {
                "name": "MQTT",
                "username": "",
                "password": "",
                "endPoints": [
                    {
                        "name": "MQTT",
                        "transport": "TCP",
                        "uris": [
                            `tcp://${sempParsedURL.hostname}:1883`
                        ],
                        "secured": "no",
                        "compressed": "no"
                    },
                    {
                        "name": "Secured MQTT",
                        "transport": "SSL",
                        "uris": [
                            `ssl://${sempParsedURL.hostname}:8883`
                        ],
                        "secured": "yes",
                        "compressed": "no"
                    },
                    {
                        "name": "WebSocket MQTT",
                        "transport": "WS",
                        "uris": [
                            `ws://${sempParsedURL.hostname}:8000`
                        ],
                        "secured": "no",
                        "compressed": "no"
                    },
                    {
                        "name": "WebSocket Secured MQTT",
                        "transport": "WSS",
                        "uris": [
                            `wss://${sempParsedURL.hostname}:8443`
                        ],
                        "secured": "yes",
                        "compressed": "no"
                    }
                ],
                "limits": {}
            },
            {
                "name": "JMS",
                "username": "",
                "password": "",
                "endPoints": [
                    {
                        "name": "JMS",
                        "transport": "TCP",
                        "uris": [
                            `smf://${sempParsedURL.hostname}:55555`
                        ],
                        "secured": "no",
                        "compressed": "no"
                    },
                    {
                        "name": "Secured JMS",
                        "transport": "TLS",
                        "uris": [
                            `smfs://${sempParsedURL.hostname}:55443`
                        ],
                        "secured": "yes",
                        "compressed": "no"
                    }
                ],
                "limits": {}
            },
            {
                "name": "REST",
                "username": "",
                "password": "",
                "endPoints": [
                    {
                        "name": "REST",
                        "transport": "HTTP",
                        "uris": [
                            `http://${sempParsedURL.hostname}:9000`
                        ],
                        "secured": "no",
                        "compressed": "no"
                    },
                    {
                        "name": "Secured REST",
                        "transport": "HTTPS",
                        "uris": [
                            `https://${sempParsedURL.hostname}:9443`
                        ],
                        "secured": "yes",
                        "compressed": "no"
                    }
                ],
                "limits": {}
            },
            {
                "name": "AMQP",
                "username": "",
                "password": "",
                "endPoints": [
                    {
                        "name": "AMQP",
                        "transport": "AMQP",
                        "uris": [
                            `amqp://${sempParsedURL.hostname}:5672`
                        ],
                        "secured": "no",
                        "compressed": "no"
                    },
                    {
                        "name": "Secured AMQP",
                        "transport": "AMQPS",
                        "uris": [
                            `amqps://${sempParsedURL.hostname}:5671`
                        ],
                        "secured": "yes",
                        "compressed": "no"
                    }
                ],
                "limits": {}
            },
            {
                "name": "SMF",
                "username": "",
                "password": "",
                "endPoints": [
                    {
                        "name": "SMF",
                        "transport": "TCP",
                        "uris": [
                            `tcp://${sempParsedURL.hostname}:55555`
                        ],
                        "secured": "no",
                        "compressed": "no"
                    },
                    {
                        "name": "Compressed SMF",
                        "transport": "TCP",
                        "uris": [
                            `tcp://${sempParsedURL.hostname}:55003`
                        ],
                        "secured": "no",
                        "compressed": "yes"
                    },
                    {
                        "name": "Secured SMF",
                        "transport": "TLS",
                        "uris": [
                            `tcps://${sempParsedURL.hostname}:55443`
                        ],
                        "secured": "yes",
                        "compressed": "no"
                    }
                ],
                "limits": {}
            },
            {
                "name": "Web Messaging",
                "username": "",
                "password": "",
                "endPoints": [
                    {
                        "name": "Web Messaging",
                        "transport": "WS or HTTP",
                        "uris": [
                            `ws://${sempParsedURL.hostname}:80`
                        ],
                        "secured": "no",
                        "compressed": "no"
                    },
                    {
                        "name": "Secured Web Messaging",
                        "transport": "WSS or HTTPS",
                        "uris": [
                            `wss://${sempParsedURL.hostname}:443`
                        ],
                        "secured": "yes",
                        "compressed": "no"
                    }
                ],
                "limits": {}
            }
        ];
    }
    public async getServices(): Promise<Service[]> {
        const cacheKey = this.calculateCacheKey();
        const cachedServices = await servicesCache.getItem<SolaceMessagingServicesResponse>(cacheKey);
        let msgSvcs: SolaceMessagingServicesResponse = cachedServices;
        if (!msgSvcs) {
            msgSvcs = await this.ep2EnvService.getMessagingServices();
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