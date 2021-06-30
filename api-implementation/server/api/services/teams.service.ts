import L from '../../common/logger';
import Team = Components.Schemas.Team;
import App = Components.Schemas.App;
import AppPatch = Components.Schemas.AppPatch;
import AppResponse = Components.Schemas.AppResponse;
import TopicSyntax = Components.Parameters.TopicSyntax.TopicSyntax;
import AppsService from './apps.service';
import BrokerService from './broker.service';

import { PersistenceService } from './persistence.service';
import { ErrorResponseInternal } from '../middlewares/error.handler';

interface TeamApp extends App {
  appType?: string;
  ownerId?: string;
  status?: string;
}

interface TeamAppPatch extends AppPatch {
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
      return app;
    } catch (e) {
      throw new ErrorResponseInternal(500, e);
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
      throw new ErrorResponseInternal(
        404,
        `Entity ${team} does not exist`
      );
    }
    L.info(teamObj);
    const app: TeamApp = {
      ownerId: team,
      appType: 'team',
      name: body.name,
      displayName: body.displayName,
      apiProducts: body.apiProducts,
      credentials: body.credentials,
    };
    if (body.attributes) {
      app.attributes = body.attributes;
    }
    if (body.callbackUrl) {
      app.callbackUrl = body.callbackUrl;
    }
    if (body.webHooks) {
      app.webHooks = body.webHooks;
    }

    L.info(`App create request ${JSON.stringify(app)}`);
    try {
      const newApp: TeamApp = await AppsService.create(
        app.name,
        app,
        teamObj.attributes
      );
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
    let dev = null;
    try {
      dev = await this.persistenceService.byName(team);
    } catch (e) {
      // do nothing
    }
    if (dev === null) {
      throw new ErrorResponseInternal(
        404,
        `Entity ${team} does not exist`
      );
    }
    L.debug(dev);
    const app: TeamAppPatch = {
      ownerId: team,
      appType: 'team',
    };

    if (body.displayName) {
      app.displayName = body.displayName;
    }
    if (body.apiProducts) {
      app.apiProducts = body.apiProducts;
    }
    if (body.attributes) {
      app.attributes = body.attributes;
    }
    if (body.callbackUrl) {
      app.callbackUrl = body.callbackUrl;
    }
    if (body.status) {
      app.status = body.status;
    }
    if (body.webHooks) {
      app.webHooks = body.webHooks;
    }    
    if (body.credentials) {
      app.credentials = body.credentials;
    }
    const appPatch: AppPatch = await AppsService.update(
      team,
      name,
      app,
      dev.attributes
    );
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
