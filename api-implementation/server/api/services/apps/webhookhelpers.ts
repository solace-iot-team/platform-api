import WebHookNameList = Components.Schemas.WebHookNameList;
import WebHookNames = Components.Schemas.WebHookNames;
import WebHook = Components.Schemas.WebHook;
import AppResponse = Components.Schemas.AppResponse;
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import L from '../../../common/logger';
import _ from 'lodash';

export class WebHookHelpers {

  public getWebHookListFromApp(app: AppResponse): WebHookNameList {
    const hooks: WebHookNameList = [];
    if (app.webHooks) {
      for (const w of app.webHooks) {
        const hook: WebHookNames = {
          name: w.name ? encodeURIComponent(w.name) : encodeURIComponent(w.uri),
          uri: w.uri
        }
        hooks.push(hook);
      }
    }
    return hooks;
  }

  public getWebHookByName(name: string, app: AppResponse): WebHook {
    const decodedName = decodeURIComponent(name);

    let webHook: WebHook = null;
    if (app.webHooks) {
      webHook = app.webHooks.find(w => w.name == decodedName);
      // if can't find by name try by URI
      if (!webHook) {
        webHook = app.webHooks.find(w => w.uri == decodedName);
      }
    }
    if (webHook) {
      return webHook;
    } else {
      throw new ErrorResponseInternal(404, `WebHook ${decodedName} not found`);
    }
  }

  public getWebHookByExample(name: string, newWebHook: WebHook, app: AppResponse): WebHook {
    try {
      return this.getWebHookByName(name, app);
    } catch (e) {
      if (app.webHooks) {
        for (const wh of app.webHooks) {
          if (_.intersection(newWebHook.environments, wh.environments).length > 0) {
            return wh;

          }
        }
      }

    }
    throw new ErrorResponseInternal(404, `WebHook ${decodeURIComponent(newWebHook.name)} not found`);
  }

  public patchAppWebHook(name: string, app: AppResponse, webHook: WebHook) {
    const appWebHook = this.getWebHookByName(name, app);
    Object.assign(appWebHook, webHook);
  }

  public deleteAppWebHook(name: string, app: AppResponse) {
    const webHook = this.getWebHookByName(name, app);
    if (webHook && app.webHooks) {
      const webHooks: WebHook[] = app.webHooks.filter(w =>
        (w.uri != webHook.uri && !w.name && !webHook.name) ||
        (w.name != webHook.name)
      );
      app.webHooks = webHooks;
    }
  }

}

export default new WebHookHelpers();