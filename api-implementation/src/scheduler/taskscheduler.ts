import L from '../../server/common/logger';

import OrganizationService from '../../server/api/services/organizations.service';
import DatabaseBootstrapper from '../../server/api/services/persistence/databasebootstrapper';
import Bree from 'bree';
import path from 'node:path';

import { Agenda } from "agenda";
import { databaseaccess } from '../databaseaccess';
import { AppProvisioningJob } from './jobs/appprovisioningjob';

import Organization = Components.Schemas.Organization;

const jobDir = path.join(__dirname, './jobs');

const jobTemplate: Bree.JobOptions = {
  name: '',
  path: path.join(__dirname, './jobs/rotatecredentials.ts'),
  timeout: '10s',
  interval: '15m',
  worker: {
  }
};
const jobs: Bree.JobOptions[] = [];

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
  #scheduler: Bree;

  #agendas: Map<string, Agenda> = new Map();

  private randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  constructor() {
    Bree.extend(require('@breejs/ts-worker'));


    this.#scheduler = new Bree({
      root: jobDir,
      defaultExtension: process.env.TS_NODE ? 'ts' : 'js',
      jobs: jobs,
      logger: false,
      worker: {
        workerData: {},
      },
      outputWorkerMetadata: false,
      workerMessageHandler: (message: any, workerMetadata?: any): void => {
        if (message.message === 'done') {
          L.info(`Worker for job '${message.name}' signaled completion`);
        }
      },
      silenceRootCheckError: true,
    });
    L.info(`TaskScheduler is created`);
    DatabaseBootstrapper.on('added', this.onNewOrganization.bind(this));
    DatabaseBootstrapper.on('deleted', this.onDeleteOrganization.bind(this));
  }

  public async enable() {
    const orgs = await OrganizationService.all();
    L.info(`enabling jobs on ${orgs.length} orgs`);
    let i = 1;
    for (const o of orgs) {

      const job = { ...jobTemplate };
      job.worker = {
        workerData: o,
      };
      job.name = o.name;
      job.timeout = `${(i * this.randomIntFromInterval(30, 120))}s`;
      this.#scheduler.add(job);

      this.#agendas.set(o.name, await this.createAgenda(o.name));
      // if (this.#agendas.get(o.name)){
      //   await this.#agendas.get(o.name).now('reprovision', o.name);
      // }
      i++
    }

    this.#scheduler.start();
    L.info(`TaskScheduler is enabled`);
  }

  public async disable() {
    await this.#scheduler.stop();
    for (const agenda of this.#agendas.values()) {
      await agenda.stop();
    }
  }

  private async onNewOrganization(orgName: string) {
    L.info(`creating job for new org  ${orgName} `);
    const org = await OrganizationService.byName(orgName);
    const job = { ...jobTemplate };
    job.worker = {
      workerData: org,
    };
    job.name = orgName;
    job.timeout = `${this.randomIntFromInterval(60, 180)}s`;
    try {
      this.#scheduler.add(job);
      this.#scheduler.start(orgName);
      this.#agendas.set(orgName, await this.createAgenda(orgName));
    } catch (e) {
      L.info(`error adding job for ${orgName}`, e);
    } finally {

    }
  }

  public async queueJob(spec: AgendaJobSpec) {
    const agenda: Agenda = this.#agendas.get(spec.orgName);
    const inFlight: boolean = await this.isJobAlreadyQueued(spec);
    L.debug(`Job ${spec.jobName} for ${spec.orgName} ${spec.data.name} in flight ${inFlight}`);
    if (agenda && !inFlight) {
      const job = agenda.create(spec.jobName, spec.data);
      await job.schedule('in a tenth of a second').save();
      //await agenda.now(spec.jobName, spec.data);
    } else if (!agenda){
      L.error(`No agenda for ${spec.orgName}, could not queue job`);
    }
  }

  public async isJobAlreadyQueued(spec: AgendaJobSpec): Promise<boolean> {
    return await this.isJobQueued(spec.data.orgName, spec.data.name);
  }

  public async isJobQueued(organization: string, name: string): Promise<boolean> {
    if (this.#agendas.get(organization)) {
      const agenda: Agenda = this.#agendas.get(organization);
      const matchingJobs = await agenda.jobs({
        'data.name': name,
        'data.orgName': organization,
        lastFinishedAt: null
      });
      if (matchingJobs.length > 0) {
        L.debug(`Job already in flight for ${name} in ${organization}`);
        return true;
      } else {
        return false;
      }

    } else {
      L.error(`No agenda found for ${organization}`);
      return false;
    }

  }

  private async onDeleteOrganization(orgName: string) {
    L.info(`deleting job for  org  ${orgName} `);
    try {
      await this.#scheduler.stop(orgName);
      await this.#scheduler.remove(orgName);
      const agenda = this.#agendas.get(orgName);
      await agenda.stop();
    } catch (e) {
      L.info(`error deleting job for ${orgName}`, e);
    } finally {

    }
  }

  private async createAgenda(orgName: string): Promise<Agenda> {
    // create an agenda per org
    const agenda = new Agenda({
      mongo: databaseaccess.client.db(orgName),
      name: orgName,
      processEvery: '1 minute',
    });
    agenda.define('reprovisionApp', { shouldSaveResult: true,  },AppProvisioningJob.provision);
    await agenda.start();
    return agenda;
  }
}
