import L from '../../../common/logger';
import BrokerObjectConfig = Components.Schemas.MsgVpnClientUsername;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnClientUsername as TaskServiceRequest, MsgVpnClientUsernameResponse as TaskServiceResponse} from "../../../../src/clients/sempv2";
import _ from "lodash";

export interface ClientUsernameTaskConfig extends SEMPv2TaskConfig {
    configObject: BrokerObjectConfig,
}

type TaskConfigAlias = ClientUsernameTaskConfig;

export default class ClientUsernameTask extends SEMPv2Task {
    
    private operationName: string = 'MsgVpnClientUsername';
    constructor(taskConfig: ClientUsernameTaskConfig) {
        super(taskConfig);
    }

    public async isApplicable(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return this.isApplicableEnvironment(config.configObject)
    }

    protected async isPresent(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const result: TaskServiceResponse = await this.apiClient.getMsgVpnClientUsername(
                config.environment.service.msgVpnName, config.configObject.clientUsername);
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }
    protected async create(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.createMsgVpnClientUsername(config.environment.service.msgVpnName, _.omit(config.configObject, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`create${this.operationName}`, config.configObject.clientUsername, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`create${this.operationName}`, config.configObject.clientUsername, config.state, e);
        }

    }
    protected async update(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const requestObject = _.omit(config.configObject, this.paths);
            const disableRequest: TaskServiceRequest = {
                enabled: false,
            }
            const disableResponse: TaskServiceResponse = await this.apiClient.updateMsgVpnClientUsername(config.environment.service.msgVpnName, config.configObject.clientUsername, disableRequest as TaskServiceRequest);
            const response: TaskServiceResponse = await this.apiClient.updateMsgVpnClientUsername(config.environment.service.msgVpnName, config.configObject.clientUsername, requestObject as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`update${this.operationName}`, config.configObject.clientUsername, config.state, response);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`update${this.operationName}`, config.configObject.clientUsername, config.state, e);
        }
    }
    protected async delete(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnClientUsername(
                config.environment.service.msgVpnName, config.configObject.clientUsername);
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, config.configObject.clientUsername, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`delete${this.operationName}`, config.configObject.clientUsername, config.state, e);
        }
    }
}