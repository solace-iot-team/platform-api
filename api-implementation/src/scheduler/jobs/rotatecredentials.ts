import L from '../../../server/common/logger';

import AppHelper from '../../apphelper';
import AppsService from '../../../server/api/services/apps.service';
import TeamsService from '../../../server/api/services/teams.service';
import DevelopersService from '../../../server/api/services/developers.service';

import App = Components.Schemas.App;
import AppPatch = Components.Schemas.AppPatch;

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


  }

  static async rotateCredentials(job: Job) {
    const data: AgendaJobData = job.attrs.data as AgendaJobData;

    L.info(`rotating credentials in ${data.orgName}`);
    const org: Organization = data.org;
    await ContextRunner(org, OrganizationAppsRotateCredentials.doRotateCredentials);

  }
}