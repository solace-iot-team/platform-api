import L from '../../../common/logger';
import { AllService, SempMetaOnlyResponse } from "../../../../src/clients/sempv2";
import { TaskConfig, TaskResult, TaskState, TaskTemplate } from "../../../../src/tasks/task.interface";
import SempV2ClientFactory from "../broker/sempv2clientfactory";
import { Service } from '../../../../src/clients/solacecloud/models/Service'
import EnvironmentService = Components.Schemas.EnvironmentService;
export interface SEMPv2TaskConfig extends TaskConfig {
    environment: EnvironmentService,

}

export abstract class SEMPv2Task extends TaskTemplate {
    protected apiClient: AllService;
    protected apiVersion: string;
    protected paths: string[] = ["tags", "attributes", 'environments'];

    constructor(taskConfig: SEMPv2TaskConfig) {
        super(taskConfig);
        this.apiClient = SempV2ClientFactory.getSEMPv2Client(taskConfig.environment.service as Service);
        SempV2ClientFactory.getSEMPv2ClientVersion(taskConfig.environment.service as Service).then(p => {
            this.apiVersion = p;
        });
    }

    protected isApplicableEnvironment(configObject: any): boolean {
        const envs: string[] = configObject.environments;
        if (!envs) {
            return true;
        }
        const envName: string = (this.taskConfig as SEMPv2TaskConfig).environment.environment;
        return envs.includes(envName);
    }

    protected createSuccessfulTaskResult(operationName: string, name: string, state: TaskState, data: any): TaskResult {
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
    protected createFailureTaskResult(operationName: string, name: string, state: TaskState, e: Error): TaskResult {
        let data: any = e;
        let msg: string = `${name} failure: ${e.message}`;
        if (e['body']) {
            const err: SempMetaOnlyResponse = e['body'];
            if (err?.meta?.error) {
                L.error(err.meta.error.status);
                L.error(err.meta.error.description);
                data = err.meta.error;
                msg = `${name} failure: ${err.meta.error.status} ${err.meta.error.description}`;
            } else {
                L.error(e['body']);
            }
        } else {
            L.error(e);
        }
        L.error(msg);
        const result: TaskResult = {
            data: data,
            log: {
                action: operationName,
                info: msg,
            },
            state: state,
            success: false,
        };
        return result;
    }
}