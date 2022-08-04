import { taskFactory, TaskState } from "../../../../src/tasks/task.interface";
import { TaskSet } from "../../../../src/tasks/task.set";
import ACLProfileTask, { ACLProfileTaskConfig } from "../solace.config.tasks/aclprofile.task";
import aclprofileExceptionsBuilder from "./aclprofile.exceptions.taskset";
import { TaskSetBuilder } from "./config.taskset";

export class ACLProfileBuilder implements TaskSetBuilder {
    public build(configSet: Components.Schemas.AppConfigSet, envService: Components.Schemas.EnvironmentService, state: TaskState): TaskSet {
        const tasks: TaskSet = new TaskSet();
        if (!configSet.aclProfile) {
            return tasks;
        }
        const aclConfig: ACLProfileTaskConfig = {
            profile: configSet.aclProfile,
            environment: envService,
            state: state,
        };
        const acl = taskFactory(ACLProfileTask, aclConfig);
        tasks.add(acl);
        if (state == TaskState.ABSENT) {
            // when absent deleting the parent object removes all children
            return tasks;
        }
        const exceptionTaskSet = aclprofileExceptionsBuilder.build(configSet, envService, state);
        tasks.appendTaskSet(exceptionTaskSet);


        return tasks;

    }
}

export default new ACLProfileBuilder();