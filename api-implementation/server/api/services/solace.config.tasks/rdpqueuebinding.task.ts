import L from '../../../common/logger';
import BrokerObjectConfig = Components.Schemas.MsgVpnRestDeliveryPointQueueBinding;
import MsgVpnRestDeliveryPoint = Components.Schemas.MsgVpnRestDeliveryPoint;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnRestDeliveryPointQueueBinding as TaskServiceRequest, MsgVpnRestDeliveryPointQueueBindingResponse as TaskServiceResponse} from "../../../../src/clients/sempv2";
import _ from "lodash";

export interface RdpQueueBindingTaskConfig extends SEMPv2TaskConfig {
    configObject: BrokerObjectConfig,
    rdp: MsgVpnRestDeliveryPoint
}

type TaskConfigAlias = RdpQueueBindingTaskConfig;

export default class RdpQueueBindingTask extends SEMPv2Task {
    
    private operationName: string = 'MsgVpnRestDeliveryPointQueueBinding';
    constructor(taskConfig: RdpQueueBindingTaskConfig) {
        super(taskConfig);
    }
    public isApplicable(): boolean {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return this.isApplicableEnvironment(config.configObject)
    }

    protected async isPresent(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const result: TaskServiceResponse = await this.apiClient.getMsgVpnRestDeliveryPointQueueBinding(
                config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.configObject.queueBindingName);
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }
    protected async create(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.createMsgVpnRestDeliveryPointQueueBinding(config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, _.omit(config.configObject, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`create${this.operationName}`, config.configObject.queueBindingName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`create${this.operationName}`, config.configObject.queueBindingName, config.state, e);
        }

    }
    protected async update(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response = await this.apiClient.updateMsgVpnRestDeliveryPointQueueBinding(config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.configObject.queueBindingName, _.omit(config.configObject, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`update${this.operationName}`, config.rdp.restDeliveryPointName, config.state, response);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`update${this.operationName}`, config.configObject.queueBindingName, config.state, e);
        }
    }
    protected async delete(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnRestDeliveryPointQueueBinding(
                config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.configObject.queueBindingName);
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, config.configObject.queueBindingName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`delete${this.operationName}`, config.configObject.queueBindingName, config.state, e);
        }
    }
}