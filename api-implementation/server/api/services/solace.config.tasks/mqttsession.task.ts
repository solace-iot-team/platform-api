import L from '../../../common/logger';
import BrokerObjectConfig = Components.Schemas.MsgVpnMqttSession;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnMqttSession as TaskServiceRequest, MsgVpnMqttSessionsResponse as TaskServiceResponse} from "../../../../src/clients/sempv2";
import _ from "lodash";

export interface MqttSessionTaskConfig extends SEMPv2TaskConfig {
    configObject: BrokerObjectConfig,
}

type TaskConfigAlias = MqttSessionTaskConfig;

export default class MqttSessionTask extends SEMPv2Task {
    
    private operationName: string = 'MsgVpnMqttSession';
    constructor(taskConfig: MqttSessionTaskConfig) {
        super(taskConfig);
    }
    protected async isPresent(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const result: TaskServiceResponse = (await this.apiClient.getMsgVpnMqttSession(
                config.environment.service.msgVpnName, config.configObject.mqttSessionClientId, config.configObject.mqttSessionVirtualRouter)) as TaskServiceResponse ;
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }

    public isApplicable(): boolean {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return this.isApplicableEnvironment(config.configObject)
    }

    protected async create(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.createMsgVpnMqttSession(config.environment.service.msgVpnName, _.omit(config.configObject, this.paths) as TaskServiceRequest) as TaskServiceResponse;
            return super.createSuccessfulTaskResult(`create${this.operationName}`, config.configObject.mqttSessionClientId, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`create${this.operationName}`, config.configObject.mqttSessionClientId, config.state, e);
        }

    }
    protected async update(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const requestObject = _.omit(config.configObject, this.paths);
            const disableRequest: TaskServiceRequest = {
                enabled: false,
                mqttSessionClientId: requestObject.mqttSessionClientId
            }
            const disableResponse: TaskServiceResponse = await this.apiClient.updateMsgVpnMqttSession(config.environment.service.msgVpnName, config.configObject.mqttSessionClientId, config.configObject.mqttSessionVirtualRouter, disableRequest as TaskServiceRequest) as TaskServiceResponse;
            const response: TaskServiceResponse = await this.apiClient.updateMsgVpnMqttSession(config.environment.service.msgVpnName, config.configObject.mqttSessionClientId, config.configObject.mqttSessionVirtualRouter, requestObject as TaskServiceRequest) as TaskServiceResponse;
            return super.createSuccessfulTaskResult(`update${this.operationName}`, config.configObject.mqttSessionClientId, config.state, response);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`update${this.operationName}`, config.configObject.mqttSessionClientId, config.state, e);
        }
    }
    protected async delete(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnMqttSession(
                config.environment.service.msgVpnName, config.configObject.mqttSessionClientId, config.configObject.mqttSessionVirtualRouter);
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, config.configObject.mqttSessionClientId, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`delete${this.operationName}`, config.configObject.mqttSessionClientId, config.state, e);
        }
    }
}