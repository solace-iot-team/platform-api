import AppPatch = Components.Schemas.AppPatch;
import App = Components.Schemas.App;
import { DeveloperAppPatch, DeveloperApp } from '../developers.service';
import { TeamAppPatch, TeamApp } from '../teams.service';
import passwordGenerator from 'generate-password';

const APP_TYPE_DEVELOPER: string = 'developer';
const APP_TYPE_TEAM: string = 'team';


class AppFactory {
  
  transformToExternalAppRepresentation(app){
    delete app['ownerId'];
    delete app['appType'];
  }
  
  createDeveloperAppBatch(body: AppPatch, developer: string): DeveloperAppPatch {
    const app: DeveloperAppPatch = {
      ownerId: developer,
      appType: APP_TYPE_DEVELOPER,
    };

    this.mapPatch(body, app);
    return app;
  }

  createDeveloperApp(body: App, developer: string): DeveloperApp {
    const app: DeveloperApp = {
      ownerId: developer,
      appType: APP_TYPE_DEVELOPER,
      name: body.name,
      displayName: body.displayName,
      apiProducts: body.apiProducts,
      credentials: body.credentials,
    };
    this.mapNewApp(body, app);
    return app;
  }

  createTeamAppPatch(team: string, body: AppPatch): TeamAppPatch {
    const app: TeamAppPatch = {
      ownerId: team,
      appType: APP_TYPE_TEAM,
    };
    this.mapPatch(body, app);
    return app;
  }

  createTeamApp(team: string, body: App): TeamApp {
    const app: TeamApp = {
      ownerId: team,
      appType: APP_TYPE_TEAM,
      name: body.name,
      displayName: body.displayName,
      apiProducts: body.apiProducts,
      credentials: body.credentials,
    };
    this.mapNewApp(body, app);

    return app;
  }

  private map(source, target) {
    if (source.attributes) {
      target.attributes = source.attributes;
    }
    if (source.callbackUrl) {
      target.callbackUrl = source.callbackUrl;
    }
    if (source.webHooks) {
      target.webHooks = source.webHooks;
    }
    if (source.clientOptions) {
      target.clientOptions = source.clientOptions;
    }
  }

  private mapPatch(source: AppPatch, target: AppPatch) {
    if (source.displayName) {
      target.displayName = source.displayName;
    }
    if (source.apiProducts) {
      target.apiProducts = source.apiProducts;
    }
    if (source.status) {
      target.status = source.status;
    }
    if (source.credentials) {
      target.credentials = source.credentials;
    }
    this.map(source, target);
  }

  private mapNewApp(source: App, target: App) {
    this.mapInternalName(source, target);
    this.map(source, target);
  }
  private mapInternalName(source: App, target: App){
    if (source.internalName){
      target.internalName = source.internalName;
    } else  {
      target.internalName = passwordGenerator.generate({
            length: 32,
            numbers: true,
            strict: true,
          })
    }
  }
}

export default new AppFactory();