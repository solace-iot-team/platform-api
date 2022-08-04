import { AllService } from "../../../../src/clients/sempv2";
import { TaskConfig, TaskResult, TaskState, TaskTemplate } from "../../../../src/tasks/task.interface";
import SempV2ClientFactory from "../broker/sempv2clientfactory";
import { Service } from '../../../../src/clients/solacecloud/models/Service'
import EnvironmentService = Components.Schemas.EnvironmentService;
export interface SEMPv2TaskConfig extends TaskConfig{
    environment: EnvironmentService,

}

export abstract class SEMPv2Task  extends TaskTemplate{
    protected apiClient: AllService;
    protected paths: string[] = ["tags", "attributes", 'environments'];

    constructor(taskConfig: SEMPv2TaskConfig){
        super(taskConfig);
        this.apiClient = SempV2ClientFactory.getSEMPv2Client(taskConfig.environment.service as Service);
    }

    protected isApplicableEnvironment(configObject: any): boolean {
        const envs: string[] = configObject.environments;
        if (!envs){
            return true;
        } 
        const envName: string = (this.taskConfig as SEMPv2TaskConfig).environment.environment;
        return envs.includes(envName);
    }

    protected createSuccessfulTaskResult(operationName: string, name: string, state: TaskState, data: any): TaskResult{
        const result: TaskResult = {
            data: data,
            log: {
                action: operationName,
                info: `${operationName} ${name} successful`
            },
            state: state,
            success: true,
        };
        return result;
    }
    protected createFailureTaskResult(operationName: string, name: string, state: TaskState, e: Error): TaskResult{
        const result: TaskResult = {
            data: e,
            log: {
                action: operationName,
                info: `${name} failure: ${e.message}`,
            },
            state: state,
            success: false,
        };
        return result;
    }
}