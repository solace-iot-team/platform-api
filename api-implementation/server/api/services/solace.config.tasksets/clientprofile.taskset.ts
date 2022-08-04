import { taskFactory, TaskState } from "../../../../src/tasks/task.interface";
import { TaskSet } from "../../../../src/tasks/task.set";
import ClientProfileTask, { ClientProfileTaskConfig } from "../solace.config.tasks/clientprofile.task";
import { TaskSetBuilder } from "./config.taskset";

class ClientProfileBuilder implements TaskSetBuilder {
    build(configSet: Components.Schemas.AppConfigSet, envService: Components.Schemas.EnvironmentService, state: TaskState): TaskSet {
        const clientProfile: ClientProfileTaskConfig = {
            profile: configSet.clientProfile,
            environment: envService,
            state: state
        };
        const cProfile = taskFactory(ClientProfileTask, clientProfile);
        const tasks = new TaskSet();
        tasks.add(cProfile);
        return tasks;
    }
    
}

export default new ClientProfileBuilder();