//import { parentPort, workerData } from 'node:worker_threads';
import L from '../../../server/common/logger';
//import { databaseaccess } from '../../databaseaccess';
import AppHelper from '../../apphelper';
import AppsService from '../../../server/api/services/apps.service';
import TeamsService from '../../../server/api/services/teams.service';
import DevelopersService from '../../../server/api/services/developers.service';

import App = Components.Schemas.App;
import AppPatch = Components.Schemas.AppPatch;
//export const ns = new AsyncLocalStorage();
import ContextRunner from '../contextrunner';
import Organization = Components.Schemas.Organization;

import { AgendaJobSpec, AgendaJobData } from '../taskscheduler';
import { Job } from 'agenda';

export class AppRotateCredentialsJobSpec implements AgendaJobSpec {
  jobName: string;
  orgName: string;
  data: AgendaJobData;

  constructor() {
    this.jobName = 'rotateAppCredentials';
  }

}

// (async () => {
//   L.info(`Init rotate  credentials ${workerData.job.worker.workerData}`);
//   const dbURL = process.env.DB_URL || `mongodb://@localhost:27017/solace-platform?retryWrites=true&w=majority`;
//   let isConnected = false;
//   while (!isConnected) {
//     try {
//       await databaseaccess.connect(dbURL);
//       L.info(`Connected to Mongo!`);
//       isConnected = true;
//     } catch (err) {
//       L.error(err, `Unable to connect to Mongo, err=${JSON.stringify(err)}. Continue retrying`);

//     }
//   }
// })();

export class OrganizationAppsRotateCredentials {
  static async doRotateCredentials() {
    const now: number = Date.now();
    const apps: App[] = await AppsService.all({ "credentials.expiresAt": { $gt: -1, $lt: now } });
    L.info(`results ${apps.length}`);
    for (const app of apps) {
      if (app.credentials && app.credentials.secret) {
        L.debug(`now: ${now} expiresAt: ${app.credentials.expiresAt}`);
        app.credentials.secret.consumerSecret = AppHelper.generateConsumerSecret();
        AppHelper.resetCredentialsDates(app);
        const appUpdate: AppPatch = {
          credentials: app.credentials,
        };
        switch (app['appType']) {
          case 'team': {
            await TeamsService.updateApp(app['ownerId'], app.name, appUpdate);
            break;
          }
          case 'developer': {
            await DevelopersService.updateApp(app['ownerId'], app.name, appUpdate);
            break;
          }
          default: {
            break;
          }
        }
      }
    }
    //parentPort?.postMessage('done');

  }

  static async rotateCredentials(job: Job) {
    const data: AgendaJobData = job.attrs.data as AgendaJobData;

    L.error(`rotating credentials in ${data.orgName}`);
    const org: Organization = data.org;
    await ContextRunner(org, OrganizationAppsRotateCredentials.doRotateCredentials);

  }
}