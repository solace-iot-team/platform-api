import { taskFactory, TaskState } from "../../../../src/tasks/task.interface";
import { TaskSet } from "../../../../src/tasks/task.set";
import ClientUsernameTask, { ClientUsernameTaskConfig } from "../solace.config.tasks/clientusername.task";
import { TaskSetBuilder } from "./config.taskset";

class ClientUsernameBuilder implements TaskSetBuilder {
    build(configSet: Components.Schemas.AppConfigSet, envService: Components.Schemas.EnvironmentService, state: TaskState): TaskSet {
        const tasks = new TaskSet();
        for (const clientUsername of configSet.clientUsernames) {
            const usernameConfig: ClientUsernameTaskConfig = {
                configObject: clientUsername,
                environment: envService,
                state: state
            };
            const clientUserName = taskFactory(ClientUsernameTask, usernameConfig);
            tasks.add(clientUserName);
        }
        return tasks;
    }

}

export default new ClientUsernameBuilder();