import L from '../../../common/logger';
import BrokerObjectConfig = Components.Schemas.MsgVpnRestDeliveryPoint;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnRestDeliveryPoint as TaskServiceRequest, MsgVpnRestDeliveryPointResponse as TaskServiceResponse} from "../../../../src/clients/sempv2";
import _ from "lodash";
import { ConfigSyncLocalDatabaseRow } from '../../../../src/clients/sempv2monitor/models/ConfigSyncLocalDatabaseRow';

export interface RdpTaskConfig extends SEMPv2TaskConfig {
    configObject: BrokerObjectConfig,
}

type TaskConfigAlias = RdpTaskConfig;

export default class RdpTask extends SEMPv2Task {
    protected paths: string[] = ['attributes', 'tags','services', 'queues', 'queueBindings','restConsumers', 'environments','clientProfile'];
    private operationName: string = 'MsgVpnRestDeliveryPoint';
    constructor(taskConfig: RdpTaskConfig) {
        super(taskConfig);
    }

    public async isApplicable(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return this.isApplicableEnvironment(config.configObject)
    }

    protected async isPresent(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const result: TaskServiceResponse = await this.apiClient.getMsgVpnRestDeliveryPoint(
                config.environment.service.msgVpnName, config.configObject.restDeliveryPointName);
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }
    protected async create(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const request = _.omit(config.configObject, this.paths) as TaskServiceRequest;
            request.clientProfileName = config.configObject.clientProfile.clientProfileName;
            const response: TaskServiceResponse = await this.apiClient.createMsgVpnRestDeliveryPoint(config.environment.service.msgVpnName, request);
            return super.createSuccessfulTaskResult(`create${this.operationName}`, config.configObject.restDeliveryPointName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`create${this.operationName}`, config.configObject.restDeliveryPointName, config.state, e);
        }

    }
    protected async update(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const disableRdpRequest: TaskServiceRequest = {
                enabled: false,
            };
            let response: TaskServiceResponse = await this.apiClient.updateMsgVpnRestDeliveryPoint(config.environment.service.msgVpnName, config.configObject.restDeliveryPointName, _.omit(disableRdpRequest, this.paths) as TaskServiceRequest);
            response = await this.apiClient.updateMsgVpnRestDeliveryPoint(config.environment.service.msgVpnName, config.configObject.restDeliveryPointName, _.omit(config.configObject, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`update${this.operationName}`, config.configObject.restDeliveryPointName, config.state, response);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`update${this.operationName}`, config.configObject.restDeliveryPointName, config.state, e);
        }
    }
    protected async delete(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnRestDeliveryPoint(
                config.environment.service.msgVpnName, config.configObject.restDeliveryPointName);
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, config.configObject.restDeliveryPointName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`delete${this.operationName}`, config.configObject.restDeliveryPointName, config.state, e);
        }
    }
}