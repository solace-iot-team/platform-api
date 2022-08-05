import { taskFactory, TaskState } from "../../../../src/tasks/task.interface";
import { TaskSet } from "../../../../src/tasks/task.set";
import ClientUsernameTask, { ClientUsernameTaskConfig } from "../solace.config.tasks/clientusername.task";
import { TaskSetBuilder } from "./config.taskset";

class ClientUsernameBuilder implements TaskSetBuilder {
    build(configSet: Components.Schemas.AppConfigSet, envService: Components.Schemas.EnvironmentService, state: TaskState): TaskSet {
        const usernameConfig: ClientUsernameTaskConfig = {
            configObject: configSet.clientUsername,
            environment: envService,
            state: state
        };
        const clientUserName = taskFactory(ClientUsernameTask, usernameConfig);
        const tasks = new TaskSet();
        tasks.add(clientUserName);
        return tasks;
    }
    
}

export default new ClientUsernameBuilder();