import L from '../../common/logger';
import Team = Components.Schemas.Team;
import App = Components.Schemas.App;
import AppPatch = Components.Schemas.AppPatch;
import AppResponse = Components.Schemas.AppResponse;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;
import AppsService from './apps.service';
import BrokerService from './broker.service';
import AppFactory from './apps/appfactory';

import { PersistenceService } from './persistence.service';
import { ErrorResponseInternal } from '../middlewares/error.handler';

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
    return AppsService.all(query);
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
      if (app) {
        const endpoints = await BrokerService.getMessagingProtocols(app);
        app.environments = endpoints;
        for (const appEnv of app.environments) {
          const permissions = await BrokerService.getPermissions(
            app,
            teamObj.attributes,
            appEnv.name,
            syntax
          );
          appEnv.permissions = permissions;
        }
      } else {
        throw 404;
      }
      AppFactory.transformToExternalAppRepresentation(app);

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
      this.create(teamObj);
    }
    L.debug(teamObj);
    const app: TeamApp = AppFactory.createTeamApp(team, body);

    L.debug(`App create request ${JSON.stringify(app)}`);
    try {
      const newApp: TeamApp = await AppsService.create(
        app.name,
        app,
        teamObj.attributes
      );
      AppFactory.transformToExternalAppRepresentation(newApp);

      return newApp;
    } catch (e) {
      L.error(e);
      throw e;
    }
  }

  update(name: string, body: Team): Promise<Team> {
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
    const app: TeamAppPatch = AppFactory.createTeamAppPatch(team, body);

    const appPatch: AppPatch = await AppsService.update(
      team,
      name,
      app,
      teamObj.attributes
    );
    AppFactory.transformToExternalAppRepresentation(appPatch);
    return appPatch;
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
