import L from '../../../common/logger';
import MsgVpnAclProfileConfig = Components.Schemas.MsgVpnAclProfile;
import MsgVpnAclProfileSubscribeExceptionConfig = Components.Schemas.MsgVpnAclProfileSubscribeException;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnAclProfileSubscribeTopicException as TaskServiceRequest, MsgVpnAclProfileSubscribeTopicExceptionResponse as TaskServiceResponse } from "../../../../src/clients/sempv2";
import _ from "lodash";

export interface ACLProfileSubscribeExceptionTaskConfig extends SEMPv2TaskConfig {
    profile: MsgVpnAclProfileConfig,
    exception: MsgVpnAclProfileSubscribeExceptionConfig,
}

type TaskConfigAlias = ACLProfileSubscribeExceptionTaskConfig;

export default class ACLProfileSubscribeExceptionTask extends SEMPv2Task {
    private operationName: string = 'MsgVpnAclProfileTopicSubscribeException';
    constructor(taskConfig: ACLProfileSubscribeExceptionTaskConfig) {
        super(taskConfig);
    }

    public async isApplicable(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return this.isApplicableEnvironment(config.exception)
    }

    protected async isPresent(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const result: TaskServiceResponse = await this.apiClient.getMsgVpnAclProfileSubscribeTopicException(
                config.environment.service.msgVpnName, config.profile.aclProfileName, config.exception.subscribeTopicExceptionSyntax, encodeURIComponent(config.exception.subscribeTopicException));
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }
    protected async create(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.createMsgVpnAclProfileSubscribeTopicException(config.environment.service.msgVpnName, config.profile.aclProfileName, _.omit(config.exception, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`create${this.operationName}`, config.profile.aclProfileName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`create${this.operationName}`, config.profile.aclProfileName, config.state, e);
        }

    }
    protected async update(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return super.createSuccessfulTaskResult(`noOp${this.operationName}`, config.profile.aclProfileName, config.state, null);
    }
    protected async delete(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnAclProfileSubscribeTopicException(
                config.environment.service.msgVpnName, config.profile.aclProfileName, config.exception.subscribeTopicExceptionSyntax, encodeURIComponent(config.exception.subscribeTopicException));
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, config.profile.aclProfileName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`delete${this.operationName}`, config.profile.aclProfileName, config.state, e);
        }
    }
}