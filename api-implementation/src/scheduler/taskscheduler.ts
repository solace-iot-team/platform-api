import L from '../../server/common/logger';

import OrganizationService from '../../server/api/services/organizations.service';
import DatabaseBootstrapper from '../../server/api/services/persistence/databasebootstrapper';

import { Agenda, Job, Processor } from "agenda";
import { databaseaccess } from '../databaseaccess';
import { AppProvisioningJob } from './jobs/appprovisioningjob';
import { AppRotateCredentialsJobSpec, OrganizationAppsRotateCredentials } from './jobs/rotatecredentials';
import { ns } from '../../server/api/middlewares/context.handler';
import { ContextConstants } from '../../server/common/constants';

import Organization = Components.Schemas.Organization;
import ImporterRegistry from '../../server/api/services/importer/importerregistry';
import { ErrorResponseInternal } from '../../server/api/middlewares/error.handler';


const DEFAULT_JOB_INTERVAL = 15;

export interface AgendaJobSpec {
  jobName: string,
  orgName: string,
  data: AgendaJobData,
}

export interface AgendaJobData {
  name: string,
  orgName: string,
  org: Organization,
}

export default class TaskScheduler {

  #agendas: Map<string, Agenda> = new Map();

  private randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  constructor() {
    L.info(`TaskScheduler is created`);
    DatabaseBootstrapper.on('added', this.onNewOrganization.bind(this));
    DatabaseBootstrapper.on('deleted', this.onDeleteOrganization.bind(this));
  }

  public async enable() {
    const orgs = await OrganizationService.all();
    L.info(`enabling jobs on ${orgs.length} orgs`);
    let i = 1;
    for (const o of orgs) {

      const orgAgenda: Agenda = await this.createAgenda(o.name);
      this.#agendas.set(o.name, orgAgenda);

      const jobSpec: AppRotateCredentialsJobSpec = new AppRotateCredentialsJobSpec();
      const jobs = await orgAgenda.jobs(
        { name: jobSpec.jobName }
      );
      if (jobs.length == 0) {
        jobSpec.data = {
          name: o.name,
          orgName: o.name,
          org: o
        };
        jobSpec.orgName = o.name;
        const job = orgAgenda.create(jobSpec.jobName, jobSpec.data);
        const startAt = new Date();
        startAt.setMinutes(startAt.getMinutes() + i);
        const offset = i;
        const cron: string = `${(DEFAULT_JOB_INTERVAL*0+offset)},${(DEFAULT_JOB_INTERVAL*1+offset)},${(DEFAULT_JOB_INTERVAL*2+offset)},${(DEFAULT_JOB_INTERVAL*3+offset)}  * * * * `; 
        L.info(cron);
        job.repeatEvery(cron, { skipImmediate: true, startDate: startAt });
    
        await job.save();
        i++
      }
    }

    L.info(`TaskScheduler is enabled`);
  }

  public async disable() {
    for (const agenda of this.#agendas.values()) {
      await agenda.stop();
    }
  }

  private async onNewOrganization(orgName: string) {
    const agenda: Agenda = this.#agendas.get(orgName);
    if (agenda){
      L.info(`agenda already exists, this is an org updated, exiting`);
      return;
    }
    L.info(`creating job for new org  ${orgName} `);
    const o = await OrganizationService.byName(orgName);
    const orgAgenda: Agenda = await this.createAgenda(o.name);
    this.#agendas.set(o.name, orgAgenda);
    const jobSpec: AppRotateCredentialsJobSpec = new AppRotateCredentialsJobSpec();
    jobSpec.data = {
      name: o.name,
      orgName: o.name,
      org: o
    };
    jobSpec.orgName = o.name;
    const startAt = new Date();
    startAt.setMinutes(startAt.getMinutes() + this.randomIntFromInterval(0, 3));
    const job = orgAgenda.create(jobSpec.jobName, jobSpec.data);
    const offset = this.randomIntFromInterval(0, 14);
    const cron: string = `${(DEFAULT_JOB_INTERVAL*0+offset)},${(DEFAULT_JOB_INTERVAL*1+offset)},${(DEFAULT_JOB_INTERVAL*2+offset)},${(DEFAULT_JOB_INTERVAL*3+offset)}  * * * *`; 
    L.info(cron);
    job.repeatEvery(cron, { skipImmediate: true, startDate: startAt });
    await job.save();

  }

  public async queueJob(spec: AgendaJobSpec): Promise<Job>{
    const agenda: Agenda = this.#agendas.get(spec.orgName);
    const inFlight: boolean = await this.isJobAlreadyQueued(spec);
    L.debug(`Job ${spec.jobName} for ${spec.orgName} ${spec.data.name} in flight ${inFlight}`);
    // if a job is in flight for a specific name/org combo schedule the next job to give previous job 
    const delay: number = inFlight ? 30000 : 5;
    if (agenda) {
      const job = agenda.create(spec.jobName, spec.data);
      const runAt = new Date();
      runAt.setMilliseconds(runAt.getMilliseconds() + delay);
      const j = await job.schedule(runAt).save();
      return j;
    } else if (!agenda) {
      L.error(`No agenda for ${spec.orgName}, could not queue job`);
    }
  }

  public async scheduleJobAtInterval(spec: AgendaJobSpec, interval: number) {
    L.info(`Schedule job ${spec.jobName} in ${spec.orgName}`);
    const agenda: Agenda = this.#agendas.get(spec.orgName);
    const inFlight: boolean = await this.isJobDefined(spec.data.name, spec.data.orgName);
    L.debug(`Job ${spec.jobName} for ${spec.orgName} ${spec.data.name} scheduled ${inFlight}`);
    // if a job is scheduled we need to remove the schedule and add this new job in the schedule
    if (agenda) {
      const query = {
        'data.name': spec.data.name,
        'data.orgName': spec.data.orgName,
      };
      const matchingJobs = await agenda.jobs(query);
      if (matchingJobs.length > 0) {
        const existingJob = matchingJobs[0];
        await existingJob.disable().remove();
      }
      const job = agenda.create(spec.jobName, spec.data);
      const cron: string = `*/${interval} * * * *`; 
  
      await job.repeatEvery(cron).save();

    } else if (!agenda) {
      L.error(`No agenda for ${spec.orgName}, could not queue job`);
    }
  }

  public async isJobAlreadyQueued(spec: AgendaJobSpec): Promise<boolean> {
    return await this.isJobDefined(spec.data.name, spec.data.orgName, true);
  }

  public async isJobDefined(name: string, organization?: string, pendingOnly?: boolean): Promise<boolean> {
    let org = organization;
    if (!org && ns != null && ns.getStore() && ns.getStore().get(ContextConstants.ORG_NAME)) {
      org = ns.getStore().get(ContextConstants.ORG_NAME);
    }
    if (this.#agendas.get(org)) {
      const agenda: Agenda = this.#agendas.get(org);
      const query = {
        'data.name': name,
        'data.orgName': org,
      };
      if (pendingOnly) {
        query['lastFinishedAt'] = null;

      }
      const matchingJobs = await agenda.jobs(query);
      if (matchingJobs.length > 0) {
        L.debug(`Job already in flight for ${name} in ${org}`);
        return true;
      } else {
        return false;
      }

    } else {
      L.error(`No agenda found for ${org}`);
      return false;
    }

  }
  public async allJobsWithName(name: string, organization?: string): Promise<Job[]> {
    let org = organization;
    if (!org && ns != null && ns.getStore() && ns.getStore().get(ContextConstants.ORG_NAME)) {
      org = ns.getStore().get(ContextConstants.ORG_NAME);
    }
    if (this.#agendas.get(org)) {
      const agenda: Agenda = this.#agendas.get(org);
      const query = {
        name: name,
        'data.orgName': org,
      };
      const matchingJobs = await agenda.jobs(query);
      return matchingJobs;
    } else {
      throw new ErrorResponseInternal(500, 'No scheduler found');
    }
  }

  public async findJobInstanceWithName(name: string, organization?: string): Promise<any> {
    let org = organization;
    if (!org && ns != null && ns.getStore() && ns.getStore().get(ContextConstants.ORG_NAME)) {
      org = ns.getStore().get(ContextConstants.ORG_NAME);
    }
    if (this.#agendas.get(org)) {
      const agenda: Agenda = this.#agendas.get(org);
      const query = {
        'data.name': name,
        'data.orgName': org,
      };
      const matchingJobs = await agenda.jobs(query);
      if (matchingJobs.length != 1) {
        throw new ErrorResponseInternal(404, `Not found`);
      } else {
        return matchingJobs[0];
      }
    } else {
      throw new ErrorResponseInternal(500, 'No scheduler found');
    }
  }

  public async removeJob(name: string, organization?: string): Promise<number> {
    let org = organization;
    if (!org && ns != null && ns.getStore() && ns.getStore().get(ContextConstants.ORG_NAME)) {
      org = ns.getStore().get(ContextConstants.ORG_NAME);
    }
    if (this.#agendas.get(org)) {
      const agenda: Agenda = this.#agendas.get(org);
      const query = {
        'data.name': name,
        'data.orgName': org,
      };
      const matchingJobs = await agenda.jobs(query);
      if (matchingJobs.length > 0) {
        L.debug(`Job already in flight for ${name} in ${org}`);
        matchingJobs[0].remove();
        return 204
      } else {
        return 404;
      }

    } else {
      L.error(`No agenda found for ${org}`);
      return 404;
    }

  }

  private async onDeleteOrganization(orgName: string) {
    L.info(`deleting job for  org  ${orgName} `);
    try {

      const agenda = this.#agendas.get(orgName);
      await agenda.stop();
      this.#agendas.delete(orgName);
    } catch (e) {
      L.info(`error deleting agenda for ${orgName}`, e);
    } finally {

    }
  }

  private async createAgenda(orgName: string): Promise<Agenda> {
    try {
      // create an agenda per org
      const agenda = new Agenda({
        mongo: (await databaseaccess.getClient()).db(orgName),
        name: orgName,
        processEvery: '1 minute',
        defaultLockLifetime: 45000,
      });

      agenda.define('reprovisionApp', { shouldSaveResult: true, }, AppProvisioningJob.provision);
      agenda.define((new AppRotateCredentialsJobSpec()).jobName, { shouldSaveResult: true, }, OrganizationAppsRotateCredentials.rotateCredentials);

      const importers = ImporterRegistry.all();
      importers.forEach((v, k) => {
        L.info(`define job for importer ${k} in org ${orgName}`);
        agenda.define(k, { shouldSaveResult: true, lockLifetime: 300*1000, lockLimit: 5 }, v.import);
      })
      await agenda.start();
      return agenda;
    } catch (e) {
      L.error(`could not create agenda ${orgName}`);
      return null;
    }
  }
}
