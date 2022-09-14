import L from '../../../common/logger';
import MsgVpnAclProfileConfig = Components.Schemas.MsgVpnAclProfile;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnAclProfile as TaskServiceRequest, MsgVpnAclProfileResponse as TaskServiceResponse } from "../../../../src/clients/sempv2";
import _ from "lodash";

export interface ACLProfileTaskConfig extends SEMPv2TaskConfig {
    profile: MsgVpnAclProfileConfig,
}

export default class ACLProfileTask extends SEMPv2Task {
    protected paths: string[] = ["aclProfileName", "clientConnectDefaultAction", "publishTopicDefaultAction", "subscribeTopicDefaultAction"];
    private operationName: string = 'MsgVpnAclProfile';
    constructor(taskConfig: ACLProfileTaskConfig) {
        super(taskConfig);
    }

    public async isApplicable(): Promise<boolean> {
        const config: ACLProfileTaskConfig = this.config() as ACLProfileTaskConfig;
        return this.isApplicableEnvironment(config.profile)
    }
    protected async isPresent(): Promise<boolean> {
        const config: ACLProfileTaskConfig = this.config() as ACLProfileTaskConfig;
        try {
            const result: TaskServiceResponse = await this.apiClient.getMsgVpnAclProfile(config.environment.service.msgVpnName, config.profile.aclProfileName);
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }
    protected async create(): Promise<TaskResult> {
        const config: ACLProfileTaskConfig = this.config() as ACLProfileTaskConfig;
        try {
            const response: TaskServiceResponse = await this.apiClient.createMsgVpnAclProfile(config.environment.service.msgVpnName, _.pick(config.profile, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`create${this.operationName}`, config.profile.aclProfileName, config.state, response.data);
        } catch (e) {
            return super.createFailureTaskResult(`create${this.operationName}`, config.profile.aclProfileName, config.state, e);
        }

    }
    protected async update(): Promise<TaskResult> {
        const config: ACLProfileTaskConfig = this.config() as ACLProfileTaskConfig;
        try {
            const response: TaskServiceResponse = await this.apiClient.updateMsgVpnAclProfile(config.environment.service.msgVpnName, config.profile.aclProfileName, _.pick(config.profile, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`update${this.operationName}`, config.profile.aclProfileName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`update${this.operationName}`, config.profile.aclProfileName, config.state, e);
        }
    }
    protected async delete(): Promise<TaskResult> {
        const config: ACLProfileTaskConfig = this.config() as ACLProfileTaskConfig;
        try {
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnAclProfile(config.environment.service.msgVpnName, config.profile.aclProfileName);
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, config.profile.aclProfileName, config.state, response.data);
        } catch (e) {
            L.error(e);
            if (e.body){
                L.error(e.body);
            }
            return super.createFailureTaskResult(`delete${this.operationName}`, config.profile.aclProfileName, config.state, e);
        }
    }
}