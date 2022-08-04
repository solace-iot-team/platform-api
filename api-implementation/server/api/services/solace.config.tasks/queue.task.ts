import L from '../../../common/logger';
import BrokerObjectConfig = Components.Schemas.MsgVpnQueue;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnQueue as TaskServiceRequest, MsgVpnQueueResponse as TaskServiceResponse} from "../../../../src/clients/sempv2";
import _ from "lodash";

export interface QueueTaskConfig extends SEMPv2TaskConfig {
    configObject: BrokerObjectConfig,
}

type TaskConfigAlias = QueueTaskConfig;

export default class QueueTask extends SEMPv2Task {
    paths: string[] = ['attributes', 'tags', 'queueSubscriptions', 'environments'];
    private operationName: string = 'MsgVpnClientUsername';
    constructor(taskConfig: QueueTaskConfig) {
        super(taskConfig);
    }

    public isApplicable(): boolean {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return this.isApplicableEnvironment(config.configObject)
    }

    protected async isPresent(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const result: TaskServiceResponse = await this.apiClient.getMsgVpnQueue(
                config.environment.service.msgVpnName, config.configObject.queueName);
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }
    protected async create(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.createMsgVpnQueue(config.environment.service.msgVpnName, _.omit(config.configObject, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`create${this.operationName}`, config.configObject.queueName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`create${this.operationName}`, config.configObject.queueName, config.state, e);
        }

    }
    protected async update(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const disableQueueRequest = {...config.configObject};
            disableQueueRequest.ingressEnabled = false;
            disableQueueRequest.egressEnabled = false;
            let response: TaskServiceResponse = await this.apiClient.updateMsgVpnQueue(config.environment.service.msgVpnName, config.configObject.queueName, _.omit(disableQueueRequest, this.paths) as TaskServiceRequest);
            response = await this.apiClient.updateMsgVpnQueue(config.environment.service.msgVpnName, config.configObject.queueName, _.omit(config.configObject, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`update${this.operationName}`, config.configObject.queueName, config.state, response);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`update${this.operationName}`, config.configObject.queueName, config.state, e);
        }
    }
    protected async delete(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnQueue(
                config.environment.service.msgVpnName, config.configObject.queueName);
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, config.configObject.queueName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`delete${this.operationName}`, config.configObject.queueName, config.state, e);
        }
    }
}