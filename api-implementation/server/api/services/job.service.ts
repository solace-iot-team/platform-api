import L from '../../common/logger';
import { PersistenceService } from './persistence.service';
import { Job as AgendaJob } from 'agenda';
import Job = Components.Schemas.Job;

export class HistoryService {

  private persistenceService: PersistenceService;

  constructor() {
    this.persistenceService = new PersistenceService('agendaJobs');

  }

  async all(status: string): Promise<Job[]> {
    const results: Job[] = [];
    let query = {};
    if (status && status == 'finished') {
      query = { "lastFinishedAt": { $ne: null } };
    }
    if (status && status == 'pending') {
      query = { "lastFinishedAt": { $eq: null } };
    }
    const jobs: Job[] = await this.persistenceService.all(query, { at: -1 }, null, true);
    for (const rawJob of jobs) {
      const job: Job = {
        id: `${rawJob['_id']}`,
        name: rawJob.name,
      }
      if (rawJob['data']['name'] ){
        job.instanceName = rawJob['data']['name'];
      }
      if (rawJob.app) {
        job.app = rawJob.app;
        delete job.app.credentials;
      }
      if (rawJob['data']['app']) {
        job.app = rawJob['data']['app'];
        delete job.app.credentials;
      }
      if (rawJob.result) {
        job.result = rawJob.result;
      }
      if (rawJob.lastFinishedAt) {
        job.lastFinishedAt = rawJob.lastFinishedAt;
        job.status = 'finished';
      } else {
        job.status = 'pending';
      }
      if (rawJob.lastRunAt) {
        job.lastRunAt = rawJob.lastRunAt;
      }
      if (rawJob.nextRunAt) {
        job.nextRunAt = rawJob.nextRunAt;
      }

      results.push(job);
    }
    return results;
  }
}

export default new HistoryService();