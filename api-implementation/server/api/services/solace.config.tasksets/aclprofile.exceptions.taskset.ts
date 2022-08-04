import { taskFactory, TaskState } from "../../../../src/tasks/task.interface";
import { TaskSet } from "../../../../src/tasks/task.set";
import ACLProfileClientConnectExceptionTask, { ACLProfileClientConnectExceptionTaskConfig } from "../solace.config.tasks/aclprofile.clientconnectionexception.task";
import ACLProfilePublishExceptionTask, { ACLProfilePublishExceptionTaskConfig } from "../solace.config.tasks/aclprofile.publishexception.task";
import ACLProfileSubscribeExceptionTask, { ACLProfileSubscribeExceptionTaskConfig } from "../solace.config.tasks/aclprofile.subscribeexception.task";
import { TaskSetBuilder } from "./config.taskset";

export class ACLProfileExceptionsBuilder implements TaskSetBuilder {
    public build(configSet: Components.Schemas.AppConfigSet, environmentService: Components.Schemas.EnvironmentService, state: TaskState): TaskSet {
        const tasks: TaskSet = new TaskSet();
        if (configSet.aclProfile.publishExceptions) {
            for (const pe of configSet.aclProfile.publishExceptions) {
                const exceptionConfig: ACLProfilePublishExceptionTaskConfig = {
                    profile: configSet.aclProfile,
                    exception: pe,
                    environment: environmentService,
                    state: state,
                };
                const exceptionTask = taskFactory(ACLProfilePublishExceptionTask, exceptionConfig);
                tasks.add(exceptionTask);
            }
        }
        if (configSet.aclProfile.subscribeExceptions) {
            for (const se of configSet.aclProfile.subscribeExceptions) {
                const exceptionConfig: ACLProfileSubscribeExceptionTaskConfig = {
                    profile: configSet.aclProfile,
                    exception: se,
                    environment: environmentService,
                    state: state,
                };
                const exceptionTask = taskFactory(ACLProfileSubscribeExceptionTask, exceptionConfig);
                tasks.add(exceptionTask);
            }
        }

        if (configSet.aclProfile.clientConnectExceptions) {
            for (const c of configSet.aclProfile.clientConnectExceptions) {
                const exceptionConfig: ACLProfileClientConnectExceptionTaskConfig = {
                    profile: configSet.aclProfile,
                    exception: c,
                    environment: environmentService,
                    state: state,
                };
                const exceptionTask = taskFactory(ACLProfileClientConnectExceptionTask, exceptionConfig);
                tasks.add(exceptionTask);
            }
        }


        return tasks;

    }
}

export default new ACLProfileExceptionsBuilder();