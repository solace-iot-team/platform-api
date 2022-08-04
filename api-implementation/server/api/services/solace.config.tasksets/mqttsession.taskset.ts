import { taskFactory, TaskState } from "../../../../src/tasks/task.interface";
import { TaskSet } from "../../../../src/tasks/task.set";
import MqttSessionTask, { MqttSessionTaskConfig } from "../solace.config.tasks/mqttsession.task";
import { TaskSetBuilder } from "./config.taskset";

class MQTTSessionGroupBuilder implements TaskSetBuilder {
    build(configSet: Components.Schemas.AppConfigSet, envService: Components.Schemas.EnvironmentService, state: TaskState): TaskSet {
        if (!configSet.mqttSession) {
            return new TaskSet();
        }
        const mqttSessionConfig: MqttSessionTaskConfig = {
            configObject: configSet.mqttSession,
            environment: envService,
            state: state
        };
        const mqttSession = taskFactory(MqttSessionTask, mqttSessionConfig);

        const tasks = new TaskSet();
        tasks.add(mqttSession);
        return tasks;
    }

}

export default new MQTTSessionGroupBuilder();