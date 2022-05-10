import L from '../../server/common/logger';

import OrganizationService from '../../server/api/services/organizations.service';
import DatabaseBootstrapper from '../../server/api/services/persistence/databasebootstrapper';
import Bree from 'bree';
import path from 'node:path';

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

export default class TaskScheduler {
  /** The job scheduler. */
  #scheduler: Bree;

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
    orgs.forEach(o => {
      const job = { ...jobTemplate };
      job.worker = {
        workerData: o,
      };
      job.name = o.name;
      job.timeout = `${(i * this.randomIntFromInterval(30, 120))}s`;
      this.#scheduler.add(job);
      i++
    });

    this.#scheduler.start();
    L.info(`TaskScheduler is enabled`);
  }

  public disable() {
    this.#scheduler.stop();
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
    } catch (e) {

    } finally {

    }

  }
  private async onDeleteOrganization(orgName: string) {
    L.info(`deleting job for  org  ${orgName} `);
    this.#scheduler.stop(orgName);
    this.#scheduler.remove(orgName);
  }
}
