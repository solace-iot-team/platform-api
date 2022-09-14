import L from '../../../common/logger';
import BrokerObjectConfig = Components.Schemas.MsgVpnQueueSubscription;
import QueueConfig = Components.Schemas.MsgVpnQueue;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnQueueSubscription as TaskServiceRequest, MsgVpnQueueSubscriptionResponse as TaskServiceResponse } from "../../../../src/clients/sempv2";
import _ from "lodash";

export interface QueueSubscriptionTaskConfig extends SEMPv2TaskConfig {
    configObject: BrokerObjectConfig,
    queue: QueueConfig
}

type TaskConfigAlias = QueueSubscriptionTaskConfig;

export default class QueueSubscriptionTask extends SEMPv2Task {

    private operationName: string = 'MsgVpnQueueSubscription';
    constructor(taskConfig: QueueSubscriptionTaskConfig) {
        super(taskConfig);
    }

    public async isApplicable(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return this.isApplicableEnvironment(config.configObject)
    }

    protected async isPresent(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const result: TaskServiceResponse = await this.apiClient.getMsgVpnQueueSubscription(
                config.environment.service.msgVpnName, config.queue.queueName, encodeURIComponent(config.configObject.subscriptionTopic));
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }
    protected async create(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.createMsgVpnQueueSubscription(config.environment.service.msgVpnName, config.queue.queueName, _.omit(config.configObject, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`create${this.operationName}`, config.configObject.subscriptionTopic, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`create${this.operationName}`, config.configObject.subscriptionTopic, config.state, e);
        }

    }
    protected async update(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return super.createSuccessfulTaskResult(`update${this.operationName}`, config.configObject.subscriptionTopic, config.state, null);
    }
    protected async delete(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnQueueSubscription(
                config.environment.service.msgVpnName, config.queue.queueName, config.configObject.subscriptionTopic);
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, encodeURIComponent(config.configObject.subscriptionTopic), config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`delete${this.operationName}`, config.configObject.subscriptionTopic, config.state, e);
        }
    }
}