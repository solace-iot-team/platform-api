import L from '../../../common/logger';
import BrokerObjectConfig = Components.Schemas.MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName;
import MsgVpnRestDeliveryPointRestConsumer = Components.Schemas.MsgVpnRestDeliveryPointRestConsumer;
import MsgVpnRestDeliveryPoint = Components.Schemas.MsgVpnRestDeliveryPoint;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName as TaskServiceRequest, MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonNameResponse as TaskServiceResponse } from "../../../../src/clients/sempv2";
import _ from "lodash";

export interface RdpConsumerTlsComonNameTaskConfig extends SEMPv2TaskConfig {
    configObject: BrokerObjectConfig,
    rdp: MsgVpnRestDeliveryPoint,
    rdpConsumer: MsgVpnRestDeliveryPointRestConsumer,
}

type TaskConfigAlias = RdpConsumerTlsComonNameTaskConfig;

export default class RdpConsumerTlsComonNameTask extends SEMPv2Task {

    private operationName: string = 'MsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName';
    constructor(taskConfig: RdpConsumerTlsComonNameTaskConfig) {
        super(taskConfig);
    }

    public isApplicable(): boolean {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return this.isApplicableEnvironment(config.configObject)
    }

    protected async isPresent(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const result: TaskServiceResponse = await this.apiClient.getMsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName(
                config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.rdpConsumer.restConsumerName, config.configObject.tlsTrustedCommonName);
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }
    protected async create(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.createMsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName(config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.rdpConsumer.restConsumerName, _.omit(config.configObject, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`create${this.operationName}`, config.configObject.tlsTrustedCommonName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`create${this.operationName}`, config.configObject.tlsTrustedCommonName, config.state, e);
        }

    }
    protected async update(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return super.createSuccessfulTaskResult(`update${this.operationName}`, config.configObject.tlsTrustedCommonName, config.state, null);
    }
    protected async delete(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnRestDeliveryPointRestConsumerTlsTrustedCommonName(
                config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.rdpConsumer.restConsumerName, config.configObject.tlsTrustedCommonName);
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, config.configObject.tlsTrustedCommonName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`delete${this.operationName}`, config.configObject.tlsTrustedCommonName, config.state, e);
        }
    }
}