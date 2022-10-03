import { taskFactory, TaskState } from "../../../../src/tasks/task.interface";
import { TaskSet } from "../../../../src/tasks/task.set";
import ClientProfileTask, { ClientProfileTaskConfig } from "../solace.config.tasks/clientprofile.task";
import RdpTask, { RdpTaskConfig } from "../solace.config.tasks/rdp.task";
import RdpConsumerTask, { RdpConsumerTaskConfig } from "../solace.config.tasks/rdpconsumer.task";
import RdpConsumerTlsComonNameTask, { RdpConsumerTlsComonNameTaskConfig } from "../solace.config.tasks/rdpconsumertlscommonname.task";
import RdpQueueBindingTask, { RdpQueueBindingTaskConfig } from "../solace.config.tasks/rdpqueuebinding.task";
import RdpQueueBindingRequestHeaderTask, { RdpQueueBindingHeaderTaskConfig } from "../solace.config.tasks/rdpqueuebindingheader.task";
import { QueueBuilder } from "./queue.taskset";

class RestDeliveryPointBuilder extends QueueBuilder {
    public build(configSet: Components.Schemas.AppConfigSet, envService: Components.Schemas.EnvironmentService, state: TaskState): TaskSet {
        const tasks: TaskSet = new TaskSet();
        if (!configSet.restDeliveryPoints || configSet.restDeliveryPoints.length < 1) {
            return tasks;
        } else if (state == TaskState.ABSENT) {
            for (const rdp of configSet.restDeliveryPoints) {
                const rdpConfig: RdpTaskConfig = {
                    configObject: rdp,
                    environment: envService,
                    state: state

                }
                const rdpTask = taskFactory(RdpTask, rdpConfig);
                tasks.add(rdpTask);
                for (const q of rdp.queues){
                    q.queueSubscriptions = [];
                }
                tasks.appendTaskSet(this.buildQueuesTaskSetInternal(rdp.queues, envService, state));
            }
            return tasks;
        }
        for (const rdp of configSet.restDeliveryPoints) {
            // only configure correctly configured rdps
            if (
                rdp.restConsumers && rdp.restConsumers.length > 0
                && rdp.queueBindings && rdp.queueBindings.length > 0
                && rdp.queues && rdp.queues.length > 0
                && rdp.environments.includes(envService.environment)
            ) {
                const clientProfile: ClientProfileTaskConfig = {
                    profile: rdp.clientProfile,
                    environment: envService,
                    state: state
                };
                const cProfile = taskFactory(ClientProfileTask, clientProfile);
                tasks.add(cProfile);
        
                const disabledRdp = { ...rdp };
                disabledRdp.enabled = false;
                const rdpConfig: RdpTaskConfig = {
                    configObject: disabledRdp,
                    environment: envService,
                    state: state

                }
                const rdpTask = taskFactory(RdpTask, rdpConfig);
                tasks.add(rdpTask);
                for (const consumer of rdp.restConsumers) {
                    const disabledConsumer = { ...consumer };
                    disabledConsumer.enabled = false;
                    const rdpConsumerConfigDisabled: RdpConsumerTaskConfig = {
                        configObject: disabledConsumer,
                        rdp: rdp,
                        environment: envService,
                        state: state
                    }
                    const consumerDisbaledTask = taskFactory(RdpConsumerTask, rdpConsumerConfigDisabled);
                    tasks.add(consumerDisbaledTask);
                    if (consumer.trustedCNs) {
                        for (const cn of consumer.trustedCNs) {
                            const cnTaskConfig: RdpConsumerTlsComonNameTaskConfig = {
                                configObject: cn,
                                rdp: rdp,
                                rdpConsumer: consumer,
                                environment: envService,
                                state: state
                            }
                            const cnTask = taskFactory(RdpConsumerTlsComonNameTask, cnTaskConfig);
                            tasks.add(cnTask);
                        }
                    }
                    const rdpConsumerConfig: RdpConsumerTaskConfig = {
                        configObject: consumer,
                        rdp: rdp,
                        environment: envService,
                        state: state
                    }
                    const consumerTask = taskFactory(RdpConsumerTask, rdpConsumerConfig);
                    tasks.add(consumerTask);

                }
                tasks.appendTaskSet(this.buildQueuesTaskSetInternal(rdp.queues, envService, state));
                for (const queueBinding of rdp.queueBindings) {
                    const rdpQueueBindingConfig: RdpQueueBindingTaskConfig = {
                        configObject: queueBinding,
                        rdp: rdp,
                        environment: envService,
                        state: state
                    }
                    const bindingTask = taskFactory(RdpQueueBindingTask, rdpQueueBindingConfig);
                    tasks.add(bindingTask);
                    if (queueBinding.requestHeaders){
                        for (const header of queueBinding.requestHeaders){
                            const rdpQueueBindingHeaderConfig: RdpQueueBindingHeaderTaskConfig = {
                                configObject: header,
                                queueBinding: queueBinding,
                                rdp: rdp,
                                environment: envService,
                                state: state
                            }
                            const headerTask = taskFactory(RdpQueueBindingRequestHeaderTask, rdpQueueBindingHeaderConfig);
                            tasks.add(headerTask);
                        }
                    }
                }

                const rdpConfigEnabled: RdpTaskConfig = {
                    configObject: rdp,
                    environment: envService,
                    state: state

                }
                const enableRdpTask = taskFactory(RdpTask, rdpConfigEnabled);
                tasks.add(enableRdpTask);

            }
        }
        return tasks;
    }



}

export default new RestDeliveryPointBuilder();