import { taskFactory, TaskState } from "../../../../src/tasks/task.interface";
import { TaskSet } from "../../../../src/tasks/task.set";
import QueueTask, { QueueTaskConfig } from "../solace.config.tasks/queue.task";
import QueueSubscriptionTask, { QueueSubscriptionTaskConfig } from "../solace.config.tasks/queuesubscription.task";
import { TaskSetBuilder } from "./config.taskset";
import MsgVpnQueue = Components.Schemas.MsgVpnQueue;
import EnvironmentServce = Components.Schemas.EnvironmentService;

export class QueueBuilder implements TaskSetBuilder {
    public build(configSet: Components.Schemas.AppConfigSet, envService: Components.Schemas.EnvironmentService, state: TaskState): TaskSet {
        if (!configSet.queues || configSet.queues.length < 1) {
            return new TaskSet();
        }
        return this.buildQueuesTaskSetInternal(configSet.queues, envService, state);
    }

    protected buildQueuesTaskSetInternal(queues: MsgVpnQueue[], environmentService: EnvironmentServce, state: TaskState): TaskSet {
        const tasks: TaskSet = new TaskSet();
        if (!queues || queues.length == 0) {
            return tasks;
        }
        for (const queue of queues) {
            // only configure queues with subscriptions
            if (queue.queueSubscriptions && queue.queueSubscriptions.length > 0) {
                const queueConfig: QueueTaskConfig = {
                    configObject: queue,
                    environment: environmentService,
                    state: state
                };
                const queueTask = taskFactory(QueueTask, queueConfig);
                tasks.add(queueTask);
                for (const subcription of queue.queueSubscriptions) {
                    const queueSubscriptionConfig: QueueSubscriptionTaskConfig = {
                        configObject: subcription,
                        queue: queue,
                        environment: environmentService,
                        state: state
                    };
                    const subscriptionTask = taskFactory(QueueSubscriptionTask, queueSubscriptionConfig);
                    tasks.add(subscriptionTask);

                }

            }
        }
        return tasks;
    }

}

export default new QueueBuilder();