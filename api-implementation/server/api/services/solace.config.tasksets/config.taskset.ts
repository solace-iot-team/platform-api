import { TaskState } from "../../../../src/tasks/task.interface";
import { TaskSet } from "../../../../src/tasks/task.set";
import AppConfigSet = Components.Schemas.AppConfigSet;
import EnvironmentServce = Components.Schemas.EnvironmentService;

export interface TaskSetBuilder{
    build(configSet: AppConfigSet, envService: EnvironmentServce, state: TaskState): TaskSet
}