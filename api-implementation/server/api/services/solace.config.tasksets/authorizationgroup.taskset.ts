import { taskFactory, TaskState } from "../../../../src/tasks/task.interface";
import { TaskSet } from "../../../../src/tasks/task.set";
import AuthorizationGroupTask, { AuthorizationGroupTaskConfig } from "../solace.config.tasks/authorizationgroup.task";
import { TaskSetBuilder } from "./config.taskset";

class AuthorizationGroupBuilder implements TaskSetBuilder {
    build(configSet: Components.Schemas.AppConfigSet, envService: Components.Schemas.EnvironmentService, state: TaskState): TaskSet {
        if (!configSet.authorizationGroup) {
            return new TaskSet();
        }
        const authzGroupConfig: AuthorizationGroupTaskConfig = {
            configObject: configSet.authorizationGroup,
            environment: envService,
            state: state
        };
        const authzGroup = taskFactory(AuthorizationGroupTask, authzGroupConfig);
        const tasks = new TaskSet();
        tasks.add(authzGroup);
        return tasks;
    }

}

export default new AuthorizationGroupBuilder();