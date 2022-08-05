import L from '../../../common/logger';
import BrokerObjectConfig = Components.Schemas.MsgVpnRestDeliveryPointRestConsumer;
import MsgVpnRestDeliveryPoint = Components.Schemas.MsgVpnRestDeliveryPoint;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnRestDeliveryPointRestConsumer as TaskServiceRequest, MsgVpnRestDeliveryPointRestConsumerResponse as TaskServiceResponse} from "../../../../src/clients/sempv2";
import _ from "lodash";

export interface RdpConsumerTaskConfig extends SEMPv2TaskConfig {
    configObject: BrokerObjectConfig,
    rdp: MsgVpnRestDeliveryPoint
}

type TaskConfigAlias = RdpConsumerTaskConfig;

export default class RdpConsumerTask extends SEMPv2Task {
    protected paths: string[] = ['attributes', 'tags', 'trustedCNs', 'environments'];
    private operationName: string = 'MsgVpnRestDeliveryPointRestConsumer';
    constructor(taskConfig: RdpConsumerTaskConfig) {
        super(taskConfig);
    }

    public isApplicable(): boolean {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return this.isApplicableEnvironment(config.configObject)
    }

    protected async isPresent(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const result: TaskServiceResponse = await this.apiClient.getMsgVpnRestDeliveryPointRestConsumer(
                config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.configObject.restConsumerName);
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }
    protected async create(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.createMsgVpnRestDeliveryPointRestConsumer(config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, _.omit(config.configObject, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`create${this.operationName}`, config.configObject.restConsumerName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`create${this.operationName}`, config.configObject.restConsumerName, config.state, e);
        }

    }
    protected async update(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const disableRdpRequest: TaskServiceRequest = {
                enabled: false
            };
            let response: TaskServiceResponse = await this.apiClient.updateMsgVpnRestDeliveryPointRestConsumer(config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.configObject.restConsumerName, _.omit(disableRdpRequest, this.paths) as TaskServiceRequest);
            response = await this.apiClient.updateMsgVpnRestDeliveryPointRestConsumer(config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.configObject.restConsumerName, _.omit(config.configObject, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`update${this.operationName}`, config.configObject.restConsumerName, config.state, response);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`update${this.operationName}`, config.configObject.restConsumerName, config.state, e);
        }
    }
    protected async delete(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnRestDeliveryPointRestConsumer(
                config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.configObject.restConsumerName);
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, config.configObject.restConsumerName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`delete${this.operationName}`, config.configObject.restConsumerName, config.state, e);
        }
    }
}