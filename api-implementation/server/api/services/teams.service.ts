import L from '../../common/logger';
import Team = Components.Schemas.Team;
import App = Components.Schemas.App;
import AppPatch = Components.Schemas.AppPatch;
import AppResponse = Components.Schemas.AppResponse;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;
import WebHookNameList = Components.Schemas.WebHookNameList;
import WebHook = Components.Schemas.WebHook;
import AppsService from './apps.service';
import AppFactory, {APP_TYPE_TEAM} from './apps/appfactory';
import WebHookHelpers from './apps/webhookhelpers';

import { PersistenceService } from './persistence.service';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import preconditionCheck from './persistence/preconditionhelper';
import { updateProtectionByObject } from './persistence/preconditionhelper';

export interface TeamApp extends App {
  appType?: string;
  ownerId?: string;
  status?: string;
}

export interface TeamAppPatch extends AppPatch {
  appType?: string;
  ownerId?: string;
}

export class TeamsService {
  private persistenceService: PersistenceService;
  constructor() {
    this.persistenceService = new PersistenceService('teams');

  }

  all(): Promise<Team[]> {
    return this.persistenceService.all();
  }

  async allTeamsApps(name: string, query: any): Promise<App[]> {
    query.ownerId = name;
    query.appType = 'team';
    try {
      const dev: Team = await this.persistenceService.byName(name);
      if (dev === null) {
        return new Promise<App[]>((resolve, reject) => {
          reject(new ErrorResponseInternal(404, `Object ${name} not found`));
        });
      }
    } catch (e) {
      L.error(e);
      throw e;
    }
    const apps = await AppsService.all(query);
    for (const app of apps) {
      await AppFactory.transformToExternalAppRepresentation(app);
    }
    return apps;
  }

  byName(name: string): Promise<Team> {
    return this.persistenceService.byName(name);
  }

  async appByName(
    team: string,
    name: string,
    syntax: TopicSyntax
  ): Promise<AppResponse> {
    try {
      const teamObj: Team = await this.persistenceService.byName(team);
      const app: AppResponse = await AppsService.byNameAndOwnerId(
        name,
        team,
        syntax,
        teamObj.attributes,
      );
      if (!app) {
        throw 404;
      }
      await AppFactory.transformToExternalAppRepresentation(app);

      return app;
    } catch (e) {
      throw e;
    }
  }

  async delete(name: string): Promise<number> {
    if (await this.canDeleteTeam(name)) {
      return this.persistenceService.delete(name);
    } else {
      throw new ErrorResponseInternal(
        409,
        `Can't delete, team is still referenced`
      );
    }
  }

  deleteApp(team: string, name: string): Promise<number> {
    return AppsService.delete(name, team);
  }

  create(body: Team): Promise<Team> {
    return this.persistenceService.create(body.name, body);
  }

  async createApp(team: string, body: App): Promise<App> {
    let teamObj: Team = null;
    try {
      teamObj = await this.persistenceService.byName(team);
    } catch (e) {
      // do nothing
    }
    if (teamObj === null) {
      teamObj = {
        name: team,
        displayName: team,
      };
      L.info(`Auto creating team object ${team}`);
      this.create(teamObj);
    }
    const app: TeamApp = AppFactory.createTeamApp(team, body);

    try {
      let newApp: TeamApp = await AppsService.create(
        app.name,
        app,
        teamObj.attributes
      );

      return await this.appByName(team, app.name, 'smf');
    } catch (e) {
      throw e;
    }
  }

  async update(name: string, body: Team): Promise<Team> {
    await preconditionCheck(this, name);
    return this.persistenceService.update(name, body);
  }

  async updateApp(
    team: string,
    name: string,
    body: AppPatch
  ): Promise<AppPatch> {
    let teamObj = null;
    try {
      teamObj = await this.persistenceService.byName(team);
    } catch (e) {
      // do nothing
    }
    if (teamObj === null) {
      throw new ErrorResponseInternal(
        404,
        `Entity ${teamObj} does not exist`
      );
    }
    L.debug(teamObj);
    try {
      await updateProtectionByObject(await this.appByName(team, name, 'smf'));
    } catch (e) {
      await updateProtectionByObject(await this.appByName(team, name, 'mqtt'));
    }

    return this.updateAppInternal(team, name, body, teamObj);
  }

  private async updateAppInternal(
    team: string,
    name: string,
    body: AppPatch,
    teamObj?: Team
  ): Promise<AppPatch> {
    const app: TeamAppPatch = AppFactory.createTeamAppPatch(team, body);

    if (!teamObj) {
      teamObj = await this.persistenceService.byName(team);
    }
    const appPatch: AppPatch = await AppsService.update(
      team,
      name,
      app,
      teamObj.attributes
    );
    await AppFactory.transformToExternalAppRepresentation(appPatch);
    return appPatch;


  }
  // webhooks
  async allAppWebHooks(
    team: string,
    name: string,
  ): Promise<WebHookNameList> {
    try {
      const teamObj: Team = await this.persistenceService.byName(team);
      const app: AppResponse = await AppsService.byNameAndOwnerId(
        name,
        team,
        'smf',
        teamObj.attributes,
      );
      if (app) {
        return WebHookHelpers.getWebHookListFromApp(app);
      } else {
        throw 404;
      }
    } catch (e) {
      throw e;
    }
  }

  async webHookByName(
    team: string,
    appName: string,
    name: string
  ): Promise<WebHook> {
    try {
      const teamObj: Team = await this.persistenceService.byName(team);
      const app: AppResponse = await AppsService.byNameAndOwnerId(
        appName,
        team,
        'smf',
        teamObj.attributes,
      );
      if (app) {
        return WebHookHelpers.getWebHookByName(name, app);
      } else {
        throw new ErrorResponseInternal(404, `Could not find ${appName} for team ${team}`);
      }
    } catch (e) {
      throw e;
    }
  }


  async createWebHook(
    team: string,
    appName: string,
    body: WebHook
  ): Promise<WebHook> {
    const name: string = body.name ? body.name : body.uri;
    const app: AppResponse = await this.appByName(team, appName, 'smf');
    if (app) {
      let webHook = null;
      try {
        webHook = WebHookHelpers.getWebHookByName(name, app);

      } catch (e) {

        L.debug(`WebHook ${name} does not exist, adding it`);
        if (app.webHooks) {
          app.webHooks.push(body);
        } else {
          app.webHooks = [body];

        }
        await this.updateAppInternal(team, appName, app);
      }
      if (webHook) {
        throw new ErrorResponseInternal(422, `WebHook already exists`);
      }
    } else {
      throw new ErrorResponseInternal(404, `Could not find ${appName} for team ${team}`);
    }
    return body;
  }


  async updateWebHook(
    team: string,
    appName: string,
    name: string,
    body: WebHook
  ): Promise<WebHook> {

    const app: AppResponse = await this.appByName(team, appName, 'smf');
    if (app) {
      await updateProtectionByObject(WebHookHelpers.getWebHookByName(name, app));
      WebHookHelpers.patchAppWebHook(name, app, body);
      await this.updateAppInternal(team, appName, app);
    }
    return WebHookHelpers.getWebHookByName(name, app);
  }

  async deleteWebHook(
    team: string,
    appName: string,
    name: string,
  ): Promise<number> {

    const app: AppResponse = await this.appByName(team, appName, 'smf');
    if (app) {
      WebHookHelpers.deleteAppWebHook(name, app);
      await this.updateAppInternal(team, appName, app);
    }
    return 204;
  }

  /**
* Attributes methods
* 
*/
  async attributeByName(team: string, appName: string, name: string): Promise<string> {
    return AppsService.attributeByName(appName, name, APP_TYPE_TEAM, team);
  }

  async createAttribute(team: string, appName: string, name: string, value: string): Promise<string> {
    return AppsService.createAttribute(appName, name, value, APP_TYPE_TEAM, team);
  }

  async updateAttribute(team: string, appName: string, attributeName: string, attributeValue: string): Promise<string> {
    return AppsService.updateAttribute(appName, attributeName, attributeValue, APP_TYPE_TEAM, team);
  }

  async deleteAttribute(team: string, appName: string, attributeName: string): Promise<number> {
    return AppsService.deleteAttribute(appName, attributeName, APP_TYPE_TEAM, team);
  }

  // private methods
  private async canDeleteTeam(name: string): Promise<boolean> {
    const q = {
      ownerId: {
        $eq: name,
      },
    };
    const teams = await AppsService.all(q);
    if (teams == null || teams.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}

export default new TeamsService();
