import { parentPort, workerData } from 'node:worker_threads';
import { ContextConstants } from '../../../server/common/constants';
import L from '../../../server/common/logger';
import { databaseaccess } from '../../databaseaccess';
import AppHelper from '../../apphelper';
import AppsService from '../../../server/api/services/apps.service';
import TeamsService from '../../../server/api/services/teams.service';
import DevelopersService from '../../../server/api/services/developers.service';

import { ns } from '../../../server/api/middlewares/context.handler';
import App = Components.Schemas.App;
import AppPatch = Components.Schemas.AppPatch;
import Organization = Components.Schemas.Organization;
//export const ns = new AsyncLocalStorage();


(async () => {
  L.info(`Init rotate  credentials ${workerData.job.worker.workerData}`);
  const dbURL = process.env.DB_URL || `mongodb://@localhost:27017/solace-platform?retryWrites=true&w=majority`;
  let isConnected = false;
  while (!isConnected) {
    try {
      await databaseaccess.connect(dbURL);
      L.info(`Connected to Mongo!`);
      isConnected = true;
    } catch (err) {
      L.error(err, `Unable to connect to Mongo, err=${JSON.stringify(err)}. Continue retrying`);

    }
  }
})();
(async () => {
  const start: number = Date.now();
  ns.run(new Map(), async () => {
    const org: Organization = workerData.job.worker.workerData as Organization;
    L.info(`Rotate credentials ${workerData.job.worker.workerData}`);
    ns.getStore().set(ContextConstants.ORG_NAME, org.name);
    ns.getStore().set(ContextConstants.ORG_OBJECT, org);
    ns.getStore().set(ContextConstants.CLOUD_TOKEN, org[ContextConstants.CLOUD_TOKEN]);
    ns.getStore().set(ContextConstants.AUTHENTICATED_USER, `rotate-credentials-${org.name}`);
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
    const end: number = Date.now();
    L.error(`Duration: ${(end - start)} ms`);
    parentPort?.postMessage('done');


  });

})();