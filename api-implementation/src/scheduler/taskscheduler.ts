import L from '../../server/common/logger';

import OrganizationService from '../../server/api/services/organizations.service';
import DatabaseBootstrapper from '../../server/api/services/persistence/databasebootstrapper';
//import Bree from 'bree';
//import path from 'node:path';

import { Agenda } from "agenda";
import { databaseaccess } from '../databaseaccess';
import { AppProvisioningJob } from './jobs/appprovisioningjob';
import { AppRotateCredentialsJobSpec, OrganizationAppsRotateCredentials } from './jobs/rotatecredentials';
import { ns } from '../../server/api/middlewares/context.handler';
import { ContextConstants } from '../../server/common/constants';

import Organization = Components.Schemas.Organization;

//const jobDir = path.join(__dirname, './jobs');

// const jobTemplate: Bree.JobOptions = {
//   name: '',
//   path: path.join(__dirname, './jobs/rotatecredentials.ts'),
//   timeout: '10s',
//   interval: '15m',
//   worker: {
//   }
// };
// const jobs: Bree.JobOptions[] = [];

const DEFAULT_JOB_INTERVAL = `1 minute`;

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
  /** The job scheduler. */
  //#scheduler: Bree;

  #agendas: Map<string, Agenda> = new Map();

  private randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  constructor() {
    // Bree.extend(require('@breejs/ts-worker'));


    // this.#scheduler = new Bree({
    //   root: jobDir,
    //   defaultExtension: process.env.TS_NODE ? 'ts' : 'js',
    //   jobs: jobs,
    //   logger: false,
    //   worker: {
    //     workerData: {},
    //   },
    //   outputWorkerMetadata: false,
    //   workerMessageHandler: (message: any, workerMetadata?: any): void => {
    //     if (message.message === 'done') {
    //       L.info(`Worker for job '${message.name}' signaled completion`);
    //     }
    //   },
    //   silenceRootCheckError: true,
    // });
    L.info(`TaskScheduler is created`);
    DatabaseBootstrapper.on('added', this.onNewOrganization.bind(this));
    DatabaseBootstrapper.on('deleted', this.onDeleteOrganization.bind(this));
  }

  public async enable() {
    const orgs = await OrganizationService.all();
    L.info(`enabling jobs on ${orgs.length} orgs`);
    let i = 1;
    for (const o of orgs) {

      // const job = { ...jobTemplate };
      // job.worker = {
      //   workerData: o,
      // };
      // job.name = o.name;
      // job.timeout = `${(i * this.randomIntFromInterval(30, 120))}s`;
      //this.#scheduler.add(job);
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
        job.repeatEvery(DEFAULT_JOB_INTERVAL, { skipImmediate: true, startDate: startAt });
        await job.save();
        i++
      }
    }

    //this.#scheduler.start();
    L.info(`TaskScheduler is enabled`);
  }

  public async disable() {
    for (const agenda of this.#agendas.values()) {
      await agenda.stop();
    }
  }

  private async onNewOrganization(orgName: string) {
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
    startAt.setMilliseconds(startAt.getMilliseconds() + this.randomIntFromInterval(30000, 120000));
    const job = orgAgenda.create(jobSpec.jobName, jobSpec.data);
    job.repeatEvery(DEFAULT_JOB_INTERVAL, { skipImmediate: true, startDate: startAt });
    await job.save();
    // job.worker = {
    //   workerData: org,
    // };
    // job.name = orgName;
    // job.timeout = `${this.randomIntFromInterval(60, 180)}s`;
    // try {
    //   this.#scheduler.add(job);
    //   this.#scheduler.start(orgName);
    //   this.#agendas.set(orgName, await this.createAgenda(orgName));
    // } catch (e) {
    //   L.info(`error adding job for ${orgName}`, e);
    // } finally {

    // }
  }

  public async queueJob(spec: AgendaJobSpec) {
    const agenda: Agenda = this.#agendas.get(spec.orgName);
    const inFlight: boolean = await this.isJobAlreadyQueued(spec);
    L.debug(`Job ${spec.jobName} for ${spec.orgName} ${spec.data.name} in flight ${inFlight}`);
    // if a job is in flight for a specific name/org combo schedule the next job to give previous job 
    const delay: number = inFlight ? 30000 : 5;
    if (agenda) {
      const job = agenda.create(spec.jobName, spec.data);
      const runAt = new Date();
      runAt.setMilliseconds(runAt.getMilliseconds() + delay);
      await job.schedule(runAt).save();
    } else if (!agenda) {
      L.error(`No agenda for ${spec.orgName}, could not queue job`);
    }
  }

  public async isJobAlreadyQueued(spec: AgendaJobSpec): Promise<boolean> {
    return await this.isJobQueued(spec.data.name, spec.data.orgName);
  }

  public async isJobQueued(name: string, organization?: string): Promise<boolean> {
    let org = organization;
    if (!org && ns != null && ns.getStore() && ns.getStore().get(ContextConstants.ORG_NAME)) {
      org = ns.getStore().get(ContextConstants.ORG_NAME);
    }
    if (this.#agendas.get(org)) {
      const agenda: Agenda = this.#agendas.get(org);
      const matchingJobs = await agenda.jobs({
        'data.name': name,
        'data.orgName': org,
        lastFinishedAt: null
      });
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

  private async onDeleteOrganization(orgName: string) {
    L.info(`deleting job for  org  ${orgName} `);
    try {
      // await this.#scheduler.stop(orgName);
      // await this.#scheduler.remove(orgName);
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
        mongo: databaseaccess.client.db(orgName),
        name: orgName,
        processEvery: DEFAULT_JOB_INTERVAL,
      });

      agenda.define('reprovisionApp', { shouldSaveResult: true, }, AppProvisioningJob.provision);
      agenda.define((new AppRotateCredentialsJobSpec()).jobName, { shouldSaveResult: true, }, OrganizationAppsRotateCredentials.rotateCredentials);
      await agenda.start();
      return agenda;
    } catch (e) { 
      L.error(`could not create agenda ${orgName}`);
      return null;
    }
  }
}
