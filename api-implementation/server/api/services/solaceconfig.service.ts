import L from '../../common/logger';
import { PersistenceService } from "./persistence.service";

import AppConfigSet = Components.Schemas.AppConfigSet;
import ConfigSnapshot = Components.Schemas.ConfigSnapshot;
import ConfigState = Components.Schemas.ConfigState;
import { ErrorResponseInternal } from "../middlewares/error.handler";
import { TaskSet } from "../../../src/tasks/task.set";
import { TaskState } from "../../../src/tasks/task.interface";

import { diff, jsonPatchPathConverter } from 'just-diff';
import EnvironmentServce = Components.Schemas.EnvironmentService;
import _ from 'lodash';
import clientusernameBuilder from './solace.config.tasksets/clientusername.taskset';
import clientprofileBuilder from './solace.config.tasksets/clientprofile.taskset';
import authorizationgroupBuilder from './solace.config.tasksets/authorizationgroup.taskset';
import mqttsessionBuilder from './solace.config.tasksets/mqttsession.taskset';
import queueBuilder from './solace.config.tasksets/queue.taskset';
import restdeliverypointBuilder from './solace.config.tasksets/restdeliverypoint.taskset';
import aclprofileExceptionsBuilder from './solace.config.tasksets/aclprofile.exceptions.taskset';
import aclprofileBuilder from './solace.config.tasksets/aclprofile.taskset';
import MsgVpnQueue = Components.Schemas.MsgVpnQueue;
import { config } from 'dotenv';

export class SolaceConfigService {

    private persistenceService: PersistenceService;
    private revisionsPersistenceService: PersistenceService;
    constructor() {
        this.persistenceService = new PersistenceService('solaceAppConfigSets');
        this.revisionsPersistenceService = new PersistenceService('solaceAppConfigSetRevisions');
    }

    /**
     * App Config Sets Public methods
     */
    /**
     * All app config sets
     */
    public async all(): Promise<string[]> {
        return await this.persistenceService.all();
    }

    /**
     * 
     * @param name Get a specific config set
     */
    public async byName(name: string): Promise<AppConfigSet> {
        return await this.persistenceService.byName(name);
    }

    /**
     * 
     * @param configSet Apply a config set
     */
    public async apply(configSet: AppConfigSet): Promise<ConfigState> {
        // retrieve previous snapshot/revision - i.e. this is the currently active set
        let isModification: boolean = false;
        let previousConfigSet: AppConfigSet;
        try {
            previousConfigSet = await this.persistenceService.byName(configSet.name);
            isModification = true;
            await this.doApplyDeltaConfigSet(configSet, previousConfigSet);
        } catch (e) {
            if (e.statusCode && e.statusCode == 404) {
                // no previous configuration applied
                isModification = false;
                // simply transform config set to task set for each service
                await this.doApplyConfigSet(configSet);
            } else {
                throw e;
            }
        }
        // make sure we capture the state if not set already
        if (!configSet.state) {
            const configState: ConfigState = {
                applied: true,
                appliedAt: (new Date()).getTime(),
                appliedBy: 'system',
            }
            configSet.state = configState;
        }
        if (isModification) {
            this.saveRevision(previousConfigSet);
            await this.persistenceService.update(configSet.name, configSet);
        } else {
            await this.persistenceService.create(configSet.name, configSet);
        }
        return configSet.state;
    }

    private async doApplyConfigSet(configSet: AppConfigSet) {
        const tasks: TaskSet = new TaskSet();
        // all tasks need to create the object
        for (const service of configSet.services) {
            const allTasks: TaskSet = this.buildApplyConfigSetTaskList(configSet, service);
            tasks.appendTaskSet(allTasks);
        }
        const result = await tasks.execute();
        if (!result.success) {
            const errors: string[] = [];
            result.results.filter(r => !r.success).forEach(r => errors.push(`${r.log.action} ${r.log.info}`));
            // fatal failure, apply a previous config, otherwise delete
            configSet.state = {
                applied: false,
                appliedAt: (new Date()).getTime(),
                appliedBy: 'system',
                errors: errors,
            };

        } else {
            configSet.state = {
                applied: true,
                appliedAt: (new Date()).getTime(),
                appliedBy: 'system',
            };
        }
    }

    // 
    /**
     * build a standard present tasklist for an App Config Set
     * @param configSet 
     * @param service - the service the changes shall be applied to
     * @returns 
     */
    private buildApplyConfigSetTaskList(configSet: AppConfigSet, service: EnvironmentServce): TaskSet {
        const tasks: TaskSet = new TaskSet();
        const state: TaskState = TaskState.PRESENT;
        const aclTasks = aclprofileBuilder.build(configSet, service, state);
        tasks.appendTaskSet(aclTasks);
        const cProfile = clientprofileBuilder.build(configSet, service, state);
        tasks.appendTaskSet(cProfile);
        const authzGroup = authorizationgroupBuilder.build(configSet, service, state);
        tasks.appendTaskSet(authzGroup);
        const clientUserName = clientusernameBuilder.build(configSet, service, state);
        tasks.appendTaskSet(clientUserName);
        const mqttSession = mqttsessionBuilder.build(configSet, service, state);
        tasks.appendTaskSet(mqttSession);
        const queueTasks = queueBuilder.build(configSet, service, state);
        tasks.appendTaskSet(queueTasks);
        tasks.appendTaskSet(restdeliverypointBuilder.build(configSet, service, state));
        return tasks;
    }

    private async doApplyDeltaConfigSet(configSet: AppConfigSet, previousConfigSet: AppConfigSet) {
        const tasks: TaskSet = new TaskSet();
        const appDiff = diff(configSet, previousConfigSet, jsonPatchPathConverter);
        L.debug(appDiff);
        if (!configSet.attributes) {
            configSet.attributes = [];
        }
        configSet.attributes.push({
            name: 'diff',
            value: JSON.stringify(appDiff),
        });
        const removedConfigSet = _.cloneDeep(previousConfigSet);
        removedConfigSet.mqttSession = null;
        removedConfigSet.queues = [];
        removedConfigSet.restDeliveryPoints = [];
        removedConfigSet.aclProfile.subscribeExceptions = [];
        removedConfigSet.aclProfile.publishExceptions = [];
        removedConfigSet.aclProfile.clientConnectExceptions = [];
        const serviceDeletedSet = _.cloneDeep(previousConfigSet);
        serviceDeletedSet.services = [];

        // get everything that was replaced and figure out which of the replacements need an absent task for old object
        const replaced = appDiff.filter(d => d.op == 'replace');
        // get deletions - these all need to use absent state 
        let removed: boolean = false;
        if (!_.isEqual(previousConfigSet.mqttSession, configSet.mqttSession) && previousConfigSet.mqttSession) {
            removedConfigSet.mqttSession = previousConfigSet.mqttSession;
            removed = true;
        }
        const removedServices = _.differenceWith(previousConfigSet.services, configSet.services, _.isEqual);
        if (removedServices) {
            serviceDeletedSet.services = removedServices;
        }
        const removedQueues: MsgVpnQueue[] = _.differenceWith(previousConfigSet.queues, configSet.queues, (a: any, b: any) => { return (a.queueName == b.queueName) });
        if (removedQueues) {
            removed = true;
            for (const removedQ of removedQueues) {
                const newQ = _.cloneDeep(removedQ);
                newQ.queueSubscriptions = [];
                removedConfigSet.queues.push(newQ);
            }
        }
        // find queues still shared between previous and new set and compare their subscriptions
        const sharedQueues = _.intersectionWith(previousConfigSet.queues, configSet.queues, (a: any, b: any) => { return (a.queueName == b.queueName) });
        for (const sharedQueue of sharedQueues) {
            const previousSubscriptions = previousConfigSet.queues.find(q => q.queueName == sharedQueue.queueName).queueSubscriptions;
            const subscribeExceptions = configSet.queues.find(q => q.queueName == sharedQueue.queueName).queueSubscriptions;
            const removedSubscriptions = _.differenceWith(previousSubscriptions, subscribeExceptions, _.isEqual);
            if (removedSubscriptions && removedSubscriptions.length > 0) {
                removed = true;
                const newQ = _.cloneDeep(sharedQueue)
                newQ.queueSubscriptions = removedSubscriptions;
                removedConfigSet.queues.push(newQ);
            }
        }
        const removedRDPs = _.differenceWith(previousConfigSet.restDeliveryPoints, configSet.restDeliveryPoints, _.isEqual);
        if (removedRDPs) {
            removedConfigSet.restDeliveryPoints = removedRDPs;
            removed = true;
        }

        const sharedRDPs = _.intersectionWith(previousConfigSet.restDeliveryPoints, configSet.restDeliveryPoints, (a, b) => { return (a.environments[0] == b.environments[0]) });
        for (const rdp of sharedRDPs) {
            for (const sharedQueue of rdp.queues) {
                const previousSubscriptions = previousConfigSet.restDeliveryPoints.find(r=> (r.restDeliveryPointName == rdp.restDeliveryPointName && r.environments[0] == rdp.environments[0])).queues.find(q => q.queueName == sharedQueue.queueName).queueSubscriptions;
                const subscribeExceptions = configSet.restDeliveryPoints.find(r=> (r.restDeliveryPointName == rdp.restDeliveryPointName && r.environments[0] == rdp.environments[0])).queues.find(q => q.queueName == sharedQueue.queueName).queueSubscriptions;
                const removedSubscriptions = _.differenceWith(previousSubscriptions, subscribeExceptions, _.isEqual);
                if (removedSubscriptions && removedSubscriptions.length > 0) {
                    removed = true;
                    const newRDP = _.cloneDeep(rdp);
                    const newQ = _.cloneDeep(sharedQueue);
                    newQ.queueSubscriptions = removedSubscriptions;
                    newRDP.queues.push(newQ);
                    removedConfigSet.restDeliveryPoints.push(newRDP);
                }
            }
        }

        const removedClientConnectExceptions = _.differenceWith(previousConfigSet.aclProfile.clientConnectExceptions, configSet.aclProfile.clientConnectExceptions, _.isEqual);
        if (removedClientConnectExceptions) {
            removedConfigSet.aclProfile.clientConnectExceptions = removedClientConnectExceptions;
        }

        const removedPublishTopicExceptions = _.differenceWith(previousConfigSet.aclProfile.publishExceptions, configSet.aclProfile.publishExceptions, _.isEqual);
        if (removedPublishTopicExceptions) {
            removedConfigSet.aclProfile.publishExceptions = removedPublishTopicExceptions;
        }
        const removedSubscribeTopicExceptions = _.differenceWith(previousConfigSet.aclProfile.subscribeExceptions, configSet.aclProfile.subscribeExceptions, _.isEqual);
        if (removedSubscribeTopicExceptions) {
            removedConfigSet.aclProfile.subscribeExceptions = removedSubscribeTopicExceptions;
        }
        ////////////////////////////////
        // apply the changes
        ////////////////////////////////
        if (removedConfigSet.services && removedConfigSet.services.length > 1) {
            this.doDeleteConfigSet(serviceDeletedSet);
        }

        for (const service of configSet.services) {

            if (removed) {
                const mqttAbsent = mqttsessionBuilder.build(removedConfigSet, service, TaskState.ABSENT);
                tasks.appendTaskSet(mqttAbsent);
                tasks.appendTaskSet(queueBuilder.build(removedConfigSet, service, TaskState.ABSENT));
                tasks.appendTaskSet(restdeliverypointBuilder.build(removedConfigSet, service, TaskState.ABSENT));
                tasks.appendTaskSet(aclprofileExceptionsBuilder.build(removedConfigSet, service, TaskState.ABSENT))
            }


            // check any objects where the identifier has changed e.g. clientUsername
            for (const r of replaced) {
                if (r.path.includes('authorizationGroup/authorizationGroupName')) {
                    const authzGroupAbsent = authorizationgroupBuilder.build(previousConfigSet, service, TaskState.ABSENT);
                    tasks.appendTaskSet(authzGroupAbsent);
                }
                if (r.path.includes('mqttSession/mqttSessionClientId')) {
                    const mqttAbsent = mqttsessionBuilder.build(previousConfigSet, service, TaskState.ABSENT);
                    tasks.appendTaskSet(mqttAbsent);
                }
                if (r.path.includes('clientUsername/clientUsername')) {
                    const userNameAbsent = clientusernameBuilder.build(previousConfigSet, service, TaskState.ABSENT);
                    tasks.appendTaskSet(userNameAbsent);
                }
                if (r.path.includes('aclProfile/aclProfileName')) {
                    const aclAbsent = aclprofileBuilder.build(previousConfigSet, service, TaskState.ABSENT);
                    tasks.appendTaskSet(aclAbsent);
                }
            }

            //build tasks for anything else in the taskset 
            tasks.appendTaskSet(this.buildApplyConfigSetTaskList(configSet, service));

        }
        const result = await tasks.execute();
        if (!result.success) {
            const errors: string[] = [];
            result.results.filter(r => !r.success).forEach(r => errors.push(`${r.log.action} ${r.log.info}`));
            // fatal failure, apply a previous config, otherwise delete
            configSet.state = {
                applied: false,
                appliedAt: (new Date()).getTime(),
                appliedBy: 'system',
                errors: errors,
            };

        } else {
            configSet.state = {
                applied: true,
                appliedAt: (new Date()).getTime(),
                appliedBy: 'system',
            };
        }

    }

    private async doDeleteConfigSet(configSet: AppConfigSet) {
        // remove all broker objects
        const state: TaskState = TaskState.ABSENT;
        const tasks: TaskSet = new TaskSet();
        // prep config set
        if (configSet.queues) {
            for (const q of configSet.queues) {
                q.queueSubscriptions = [];
            }
        }
        if (configSet.restDeliveryPoints) {
            for (const r of configSet.restDeliveryPoints) {
                if (r.queues) {
                    for (const q of r.queues) {
                        q.queueSubscriptions = [];
                    }
                }
            }
        }
        for (const service of configSet.services) {
            const mqttSession = mqttsessionBuilder.build(configSet, service, state);
            tasks.appendTaskSet(mqttSession);
            const queueTasks = queueBuilder.build(configSet, service, state);
            tasks.appendTaskSet(queueTasks);
            tasks.appendTaskSet(restdeliverypointBuilder.build(configSet, service, state));

            const authzGroup = authorizationgroupBuilder.build(configSet, service, state);
            tasks.appendTaskSet(authzGroup);

            const clientUserName = clientusernameBuilder.build(configSet, service, state);
            tasks.appendTaskSet(clientUserName);

            const acl = aclprofileBuilder.build(configSet, service, state);
            tasks.appendTaskSet(acl);
        }
        const result = await tasks.execute();
        if (!result.success) {
            const errors: string[] = [];
            result.results.filter(r => !r.success).forEach(r => errors.push(`${r.log.action} ${r.log.info}`));
            // fatal failure, flip all tasks to absent and run task set again
            configSet.state = {
                applied: false,
                appliedAt: (new Date()).getTime(),
                appliedBy: 'system',
                errors: errors,
            }
        }
    }

    public async delete(name: string): Promise<number> {
        const configSet: AppConfigSet = await this.persistenceService.byName(name);
        await this.doDeleteConfigSet(configSet);
        await this.saveRevision(configSet);
        return await this.persistenceService.delete(name);
    }



    /**
     * Config Set revisions public methods
     */

    /**
     * 
     * @param name name of the app config set
     */
    public async allRevisions(name: string): Promise<number[]> {
        const revisions: number[] = [];
        const snapshots: ConfigSnapshot[] = await this.revisionsPersistenceService.all({ name: name });
        for (const s of snapshots) {
            revisions.push(s.revision);
        }
        return revisions;
    }

    /**
     * 
     * @param name name of the app config set
     * @param revision revision number of the config set
     */
    public async revisionByName(name: string, revision: number): Promise<ConfigSnapshot> {
        const snapshots: ConfigSnapshot[] = await this.revisionsPersistenceService.all({ name: name, revision: revision });
        if (snapshots && snapshots.length == 1) {
            return snapshots[0];
        } else {
            throw new ErrorResponseInternal(404, `Revision ${revision} of ${name} can not be found.`)
        }

    }

    /** Private utility methods */

    private async getNewRevisionNumber(name: string): Promise<number> {
        const revisions: number[] = await this.allRevisions(name);
        if (revisions && revisions.length > 0) {
            const maxValue = Math.max(...revisions);
            return maxValue + 1;
        } else {
            return 1;
        }
    }
    private async saveRevision(configSet: AppConfigSet) {
        const revisionNumber: number = await this.getNewRevisionNumber(configSet.name);
        const revision: ConfigSnapshot = {
            appliedAt: configSet.state.appliedAt,
            appliedBy: configSet.state.appliedBy,
            archivedAt: (new Date()).getTime(),
            archivedBy: 'system',
            config: configSet,
            name: configSet.name,
            revision: revisionNumber,
            applied: configSet.state.applied,
        };
        await this.revisionsPersistenceService.create(`${configSet.name}@${revisionNumber}`, revision);
    }

}
export default new SolaceConfigService();