import L from '../../../common/logger';
import MsgVpnAclProfileConfig = Components.Schemas.MsgVpnAclProfile;
import MsgVpnAclProfilePublishExceptionConfig = Components.Schemas.MsgVpnAclProfilePublishException;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnAclProfile as TaskServiceRequest, MsgVpnAclProfileResponse as TaskServiceResponse } from "../../../../src/clients/sempv2";
import _ from "lodash";

export interface ACLProfilePublishExceptionTaskConfig extends SEMPv2TaskConfig {
    profile: MsgVpnAclProfileConfig,
    exception: MsgVpnAclProfilePublishExceptionConfig,
}

type TaskConfigAlias = ACLProfilePublishExceptionTaskConfig;

export default class ACLProfilePublishExceptionTask extends SEMPv2Task {
    private operationName: string = 'MsgVpnAclProfileTopicPublishException';
    constructor(taskConfig: ACLProfilePublishExceptionTaskConfig) {
        super(taskConfig);
    }

    public async isApplicable(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return this.isApplicableEnvironment(config.exception)
    }

    protected async isPresent(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const result: TaskServiceResponse = await this.apiClient.getMsgVpnAclProfilePublishTopicException(
                config.environment.service.msgVpnName, config.profile.aclProfileName, config.exception.publishTopicExceptionSyntax, encodeURIComponent(config.exception.publishTopicException));
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }
    protected async create(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.createMsgVpnAclProfilePublishTopicException(config.environment.service.msgVpnName, config.profile.aclProfileName, _.omit(config.exception, this.paths) as TaskServiceRequest);
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
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnAclProfilePublishTopicException(
                config.environment.service.msgVpnName, config.profile.aclProfileName, config.exception.publishTopicExceptionSyntax, encodeURIComponent(config.exception.publishTopicException));
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, config.profile.aclProfileName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`delete${this.operationName}`, config.profile.aclProfileName, config.state, e);
        }
    }
}