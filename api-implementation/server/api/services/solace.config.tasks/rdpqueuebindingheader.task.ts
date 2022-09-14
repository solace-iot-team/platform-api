import L from '../../../common/logger';
import BrokerObjectConfig = Components.Schemas.MsgVpnRestDeliveryPointQueueBindingHeader;
import MsgVpnRestDeliveryPoint = Components.Schemas.MsgVpnRestDeliveryPoint;
import MsgVpnRestDeliveryPointQueueBinding = Components.Schemas.MsgVpnRestDeliveryPointQueueBinding;
import { TaskResult } from "../../../../src/tasks/task.interface";
import { SEMPv2Task, SEMPv2TaskConfig } from "./solace.task";
import { MsgVpnRestDeliveryPointQueueBindingRequestHeader as TaskServiceRequest} from "../../../../src/clients/sempv2/models/MsgVpnRestDeliveryPointQueueBindingRequestHeader";
import { MsgVpnRestDeliveryPointQueueBindingRequestHeaderResponse as TaskServiceResponse} from "../../../../src/clients/sempv2/models/MsgVpnRestDeliveryPointQueueBindingRequestHeaderResponse";
import _ from "lodash";

export interface RdpQueueBindingHeaderTaskConfig extends SEMPv2TaskConfig {
    configObject: BrokerObjectConfig,
    queueBinding: MsgVpnRestDeliveryPointQueueBinding,
    rdp: MsgVpnRestDeliveryPoint
}

type TaskConfigAlias = RdpQueueBindingHeaderTaskConfig;

export default class RdpQueueBindingRequestHeaderTask extends SEMPv2Task {
    
    private operationName: string = 'MsgVpnRestDeliveryPointQueueBindingHeader';
    constructor(taskConfig: RdpQueueBindingHeaderTaskConfig) {
        super(taskConfig);
    }
    public isApplicable(): boolean {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        return this.isApplicableEnvironment(config.configObject)
    }

    protected async isPresent(): Promise<boolean> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const result: TaskServiceResponse = await this.apiClient.getMsgVpnRestDeliveryPointQueueBindingRequestHeader(
                config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.queueBinding.queueBindingName, config.configObject.headerName);
            return (result != null && result.data != null);
        } catch (e) {
            L.debug(e);
            return false;
        }
    }
    protected async create(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.createMsgVpnRestDeliveryPointQueueBindingRequestHeader(config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.queueBinding.queueBindingName, _.omit(config.configObject, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`create${this.operationName}`, config.configObject.headerName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`create${this.operationName}`,  config.configObject.headerName, config.state, e);
        }

    }
    protected async update(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response = await this.apiClient.updateMsgVpnRestDeliveryPointQueueBindingRequestHeader(config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.queueBinding.queueBindingName, config.configObject.headerName, _.omit(config.configObject, this.paths) as TaskServiceRequest);
            return super.createSuccessfulTaskResult(`update${this.operationName}`, config.configObject.headerName, config.state, response);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`update${this.operationName}`, config.configObject.headerName, config.state, e);
        }
    }
    protected async delete(): Promise<TaskResult> {
        const config: TaskConfigAlias = this.config() as TaskConfigAlias;
        try {
            const response: TaskServiceResponse = await this.apiClient.deleteMsgVpnRestDeliveryPointQueueBindingRequestHeader(
                config.environment.service.msgVpnName, config.rdp.restDeliveryPointName, config.queueBinding.queueBindingName, config.configObject.headerName);
            return super.createSuccessfulTaskResult(`delete${this.operationName}`, config.configObject.headerName, config.state, response.data);
        } catch (e) {
            L.error(e);
            return super.createFailureTaskResult(`delete${this.operationName}`, config.configObject.headerName, config.state, e);
        }
    }
}