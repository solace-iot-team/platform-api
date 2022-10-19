import L from '../../../common/logger';
import MsgVpnAclProfileConfig = Components.Schemas.MsgVpnAclProfile;
import BrokerObjectConfig = Components.Schemas.MsgVpnClientProfile;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnClientProfile as TaskServiceRequest, MsgVpnClientProfileResponse as TaskServiceResponse} from "../../../../src/clients/sempv2";
import _ from "lodash";
import SolaceCloudFacade from '../../../../src/solacecloudfacade';
import { Service } from '../../../../src/clients/solacecloud/models/Service';

export interface ClientProfileTaskConfig extends SEMPv2TaskConfig {
    profile: BrokerObjectConfig,
}

type TaskConfigAlias = ClientProfileTaskConfig;

export default class ClientProfileTask extends SEMPv2Task {
    private operationName: string = 'MsgVpnClientProfile';
    constructor(taskConfig: ClientProfileTaskConfig) {
        super(taskConfig);
    }

    public async isApplicable(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return this.isApplicableEnvironment(config.profile)
    }

    protected async isPresent(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const result: TaskServiceResponse = await this.apiClient.getMsgVpnClientProfile(
                config.environment.service.msgVpnName, config.profile.clientProfileName);
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }
    protected async create(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            let response: TaskServiceResponse = null;
            try {
                const svc = config.environment.service as Service;
                svc.serviceId = svc['solaceCloudMessagingServiceId']?svc['solaceCloudMessagingServiceId']:svc.serviceId;
                response = (await SolaceCloudFacade.createClientProfile(svc, (_.omit(config.profile, this.paths) as any))) as TaskServiceResponse;
                L.info(`ClientProfile ${config.profile.clientProfileName} created via Cloud API on service ${config.environment.service.serviceId}`);
              } catch (cloudError) {
                try {
                  response = await this.apiClient.createMsgVpnClientProfile(config.environment.service.msgVpnName, _.omit(config.profile, this.paths) as TaskServiceRequest);
                  L.info(`ClientProfile ${config.profile.clientProfileName} created via SEMPv2 on service ${config.environment.service.serviceId}`);
                } catch (sempError) {
                  L.error(`ClientProfile ${config.profile.clientProfileName} could not be created on service ${config.environment.service.serviceId}`, sempError);
                  return super.createFailureTaskResult(`create${this.operationName}`, config.profile.clientProfileName, config.state, sempError);
                }
              }
            return super.createSuccessfulTaskResult(`create${this.operationName}`, config.profile.clientProfileName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`create${this.operationName}`, config.profile.clientProfileName, config.state, e);
        }

    }
    protected async update(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            //const response: TaskServiceResponse = await this.apiClient.updateMsgVpnClientProfile(config.service.msgVpnName, config.profile.clientProfileName, _.omit(config.profile, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`update${this.operationName}`, config.profile.clientProfileName, config.state, null);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`update${this.operationName}`, config.profile.clientProfileName, config.state, e);
        }
    }
    protected async delete(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnClientProfile(
                config.environment.service.msgVpnName, config.profile.clientProfileName);
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, config.profile.clientProfileName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`delete${this.operationName}`, config.profile.clientProfileName, config.state, e);
        }
    }
}