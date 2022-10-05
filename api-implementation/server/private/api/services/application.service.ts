import { ApiOptions } from "../../../../src/clients/ep.2.0/core/ApiOptions";
import { ApplicationVersionResponse } from "../../../../src/clients/ep.2.0/models/ApplicationVersionResponse";
import { EventMeshResponse } from "../../../../src/clients/ep.2.0/models/EventMeshResponse";
import { SolaceMessagingServicesResponse } from "../../../../src/clients/ep.2.0/models/SolaceMessagingServicesResponse";
import { ApplicationsService } from "../../../../src/clients/ep.2.0/services/ApplicationsService";
import { ApplicationsServiceDefault } from "../../../../src/clients/ep.2.0/services/ApplicationsServiceDefault";
import { EnvironmentsService } from "../../../../src/clients/ep.2.0/services/EnvironmentsService";
import { EnvironmentsServiceDefault } from "../../../../src/clients/ep.2.0/services/EnvironmentsServiceDefault";
import { EventMeshesService } from "../../../../src/clients/ep.2.0/services/EventMeshesService";
import { EventMeshesServiceDefault } from "../../../../src/clients/ep.2.0/services/EventMeshesServiceDefault";
import { getEventPortalBaseUrl, getEventPortalToken } from "../../../../src/cloudtokenhelper";
import MsgVpnAclProfile = Components.Schemas.MsgVpnAclProfile;
import MsgVpnAclProfilePublishException = Components.Schemas.MsgVpnAclProfilePublishException;
import MsgVpnAclProfileSubscribeException = Components.Schemas.MsgVpnAclProfileSubscribeException;
import AppConfigSet = Components.Schemas.AppConfigSet;
import EnvironmentService = Components.Schemas.EnvironmentService;
import epServiceregistry2 from "../../../../src/ep.serviceregistry.2";
import { EnvironmentResponse } from "../../../../src/clients/ep.2.0/models/EnvironmentResponse";
import { ApplicationVersion } from "../../../../src/clients/ep.2.0/models/ApplicationVersion";
import { ErrorResponseInternal } from "../../../api/middlewares/error.handler";
import apphelper from "../../../../src/apphelper";
import asyncapihelper, { Direction } from "../../../../src/asyncapihelper";
import solaceconfigService from "../../../api/services/solaceconfig.service";
import L from '../../../common/logger';


const opts: ApiOptions = {
    baseUrl: getEventPortalBaseUrl,
    token: getEventPortalToken,


};

export interface ApplicationImportRequest {
    applicationVersionId: string
}

export class ApplicationService {
    private applicationsService: ApplicationsService;
    private eventMeshService: EventMeshesService;
    private environmentService: EnvironmentsService;
    constructor() {
        this.applicationsService = new ApplicationsServiceDefault(opts);
        this.eventMeshService = new EventMeshesServiceDefault(opts);
        this.environmentService = new EnvironmentsServiceDefault(opts);
    }
    public async import(request: ApplicationImportRequest): Promise<Components.Schemas.ConfigState> {
        const applicationVersionId: string = request.applicationVersionId;
        // obtain application version from EP 2.0 -> consumer information
        const applicationVersion = (await this.applicationsService.getApplicationVersion(applicationVersionId)) as ApplicationVersionResponse;
        if (!applicationVersion.data) {
            throw new ErrorResponseInternal(404, 'not found');
        }
        // obtain Async API - > subscriptions/topic exceptions, enumerations
        const asyncAPI = await this.applicationsService.getAsyncApiForApplicationVersion(applicationVersionId, 'json', '2.0.0');
        // get event meshes, get all messaging services in meshes
        const services: EnvironmentService[] = [];
        const environments: Set<string> = new Set<string>();
        if (applicationVersion.data?.eventMeshIds?.length > 0) {
            for (const meshId of applicationVersion.data?.eventMeshIds) {
                const mesh = (await this.eventMeshService.getEventMesh(meshId)) as EventMeshResponse;

                const messagingServices = (await this.environmentService.getMessagingServices(meshId)) as SolaceMessagingServicesResponse;
                for (const messagingService of messagingServices.data) {
                    let envName = `${messagingService.id}`;
                    if (mesh.data?.environmentId) {
                        const env = (await this.environmentService.getEnvironment(mesh.data?.environmentId)) as EnvironmentResponse;
                        envName = `${env.data.id}-${messagingService.id}`;
                    }
                    try {
                        const svc = await epServiceregistry2.getServiceById(messagingService.id);
                        if (svc && !services.find(s => s.environment == envName)) {
                            environments.add(envName);
                            services.push({
                                environment: envName,
                                service: svc as Components.Schemas.Service
                            });
                        }
                    } catch (e) {
                        L.warn(`No valid service details obtainable for ${envName} ${messagingService.id} `);
                    }
                }

            }

        }

        if (services.length > 0) {
            const aclProfile = await this.buildACLProfile(applicationVersion.data, environments, asyncAPI);
            const appConfigSet: AppConfigSet = {
                aclProfile: aclProfile,
                authorizationGroup: {
                    aclProfileName: applicationVersionId,
                    authorizationGroupName: applicationVersionId,
                    clientProfileName: applicationVersionId,
                    enabled: true,
                    environments: Array.from(environments),
                },
                clientProfile: {
                    allowGuaranteedEndpointCreateEnabled: false,
                    allowGuaranteedMsgReceiveEnabled: true,
                    allowGuaranteedMsgSendEnabled: true,
                    allowTransactedSessionsEnabled: false,
                    clientProfileName: applicationVersionId,
                    compressionEnabled: false,
                    environments: Array.from(environments),
                },
                clientUsernames: [{
                    aclProfileName: applicationVersionId,
                    clientProfileName: applicationVersionId,
                    clientUsername: applicationVersion.data.applicationId,
                    enabled: true,
                    environments: Array.from(environments),
                    password: apphelper.generateConsumerSecret(),
                }],
                displayName: applicationVersion['parent'] ? applicationVersion.data['parent']['name'] : applicationVersion.data.displayName,
                services: services,
                name: applicationVersionId,
            }
            const result = await solaceconfigService.apply(appConfigSet);
            return result;
        } else {
            return null;
        }

    }

    private async buildACLProfile(applicationVersion: ApplicationVersion, environments: Set<string>, specification: any): Promise<MsgVpnAclProfile> {
        const envs = Array.from(environments);
        const subscribeExceptions: MsgVpnAclProfileSubscribeException[] = [];
        const publishExceptions: MsgVpnAclProfilePublishException[] = [];
        const subscribeResources = await asyncapihelper.getChannelResources(specification, Direction.Publish);
        for (const subscribeResource of subscribeResources) {
            subscribeExceptions.push({
                environments: envs,
                subscribeTopicException: subscribeResource,
                subscribeTopicExceptionSyntax: 'smf',
            });
        }
        const publishResources = await asyncapihelper.getChannelResources(specification, Direction.Subscribe);
        for (const publishResource of publishResources) {
            publishExceptions.push({
                environments: envs,
                publishTopicException: publishResource,
                publishTopicExceptionSyntax: 'smf',
            });
        }
        return {
            aclProfileName: applicationVersion.id,
            clientConnectDefaultAction:
                'allow',
            publishTopicDefaultAction:
                'disallow',
            subscribeTopicDefaultAction:
                'disallow',
            publishExceptions: publishExceptions,
            subscribeExceptions: subscribeExceptions,
            tags: ['ep2-application', applicationVersion['parent'] ? applicationVersion['parent']['name'] : applicationVersion.displayName, applicationVersion.id],
            environments: Array.from(environments)
        };

    }
}

export default new ApplicationService();