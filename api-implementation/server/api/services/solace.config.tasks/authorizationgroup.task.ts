import L from '../../../common/logger';
import BrokerObjectConfig = Components.Schemas.MsgVpnAuthorizationGroup;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnAuthorizationGroup as TaskServiceRequest, MsgVpnAuthorizationGroupResponse as TaskServiceResponse} from "../../../../src/clients/sempv2";
import _ from "lodash";

export interface AuthorizationGroupTaskConfig extends SEMPv2TaskConfig {
    configObject: BrokerObjectConfig,
}

type TaskConfigAlias = AuthorizationGroupTaskConfig;

export default class AuthorizationGroupTask extends SEMPv2Task {
    
    private operationName: string = 'MsgVpnAuthorizationGroup';
    constructor(taskConfig: AuthorizationGroupTaskConfig) {
        super(taskConfig);
    }

    public isApplicable(): boolean {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return this.isApplicableEnvironment(config.configObject)
    }
       
    protected async isPresent(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const result: TaskServiceResponse = await this.apiClient.getMsgVpnAuthorizationGroup(
                config.environment.service.msgVpnName, config.configObject.authorizationGroupName);
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }
    protected async create(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.createMsgVpnAuthorizationGroup(config.environment.service.msgVpnName, _.omit(config.configObject, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`create${this.operationName}`, config.configObject.authorizationGroupName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`create${this.operationName}`, config.configObject.authorizationGroupName, config.state, e);
        }

    }
    protected async update(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const requestObject = _.omit(config.configObject, this.paths);
            const disableRequest: TaskServiceRequest = {
                enabled: false
            };
            const disableResponse: TaskServiceResponse = await this.apiClient.updateMsgVpnAuthorizationGroup(config.environment.service.msgVpnName, config.configObject.authorizationGroupName, disableRequest as TaskServiceRequest);
            const response: TaskServiceResponse = await this.apiClient.updateMsgVpnAuthorizationGroup(config.environment.service.msgVpnName, config.configObject.authorizationGroupName, requestObject as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`update${this.operationName}`, config.configObject.authorizationGroupName, config.state, response);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`update${this.operationName}`, config.configObject.authorizationGroupName, config.state, e);
        }
    }
    protected async delete(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnAuthorizationGroup(
                config.environment.service.msgVpnName, config.configObject.authorizationGroupName);
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, config.configObject.authorizationGroupName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`delete${this.operationName}`, config.configObject.authorizationGroupName, config.state, e);
        }
    }
}