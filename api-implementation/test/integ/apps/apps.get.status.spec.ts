import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import type { APIProduct, App, AppEnvironmentStatus } from "../../lib/generated/openapi";
import { ApiError, AppsService, WebHook } from "../../lib/generated/openapi";

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const organizationName: string = setup.organizationName;
  const developerName: string = setup.developer.userName;

  const devctx = {
    organizationName: organizationName,
    developerUsername: developerName,
  }

  const applicationName: string = `${developerName}-app`;

  // HOOKS

  setup.addBeforeHooks(this);

  afterEach(async function () {
    await AppsService.deleteDeveloperApp({ ...devctx, appName: applicationName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return the connection status for an application", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name],
      credentials: { expiresAt: -1 },
    }

    await AppsService.createDeveloperApp({ ...devctx, requestBody: application });

    const response = await AppsService.getAppStatus({ organizationName: organizationName, appName: applicationName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get application status; error="${reason.body.message}"`);
    });

    expect(response.body, "connection status is not correct").to.have.deep.include({
      environments: [{ name: setup.environment1.name }],
    });
  });

  it("should return the connection status for an application with web hooks", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name],
      webHooks: [setup.webHook1, setup.webHook2],
      credentials: { expiresAt: -1 },
    }

    await AppsService.createDeveloperApp({ ...devctx, requestBody: application });

    const response = await AppsService.getAppStatus({ organizationName: organizationName, appName: applicationName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get application status; error="${reason.body.message}"`);
    });

    const environments = response.body.environments;
    expect(environments, "number of environments is not correct").to.have.lengthOf(2);

    let environment: AppEnvironmentStatus;

    // check status for environment #1

    environment = environments.find(e => e.name === setup.environment1.name)

    checkWebHookStatus(environment, setup.webHook1);
    checkQueueStatus(environment);

    // check status for environment #2

    environment = environments.find(e => e.name === setup.environment2.name)

    checkWebHookStatus(environment, setup.webHook2);
    checkQueueStatus(environment);
  });

  it("should return the connection status for an application with guaranteed delivery", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct4.name],
      credentials: { expiresAt: -1 },
    }

    await AppsService.createDeveloperApp({ ...devctx, requestBody: application });

    const response = await AppsService.getAppStatus({ organizationName: organizationName, appName: applicationName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get application status; error="${reason.body.message}"`);
    });

    const environments = response.body.environments;
    expect(environments, "number of environments is not correct").to.have.lengthOf(2);

    let environment: AppEnvironmentStatus;

    // check status for environment #1

    environment = environments.find(e => e.name === setup.environment1.name)

    checkWebHookStatus(environment);
    checkQueueStatus(environment, setup.apiProduct4);

    // check status for environment #2

    environment = environments.find(e => e.name === setup.environment2.name)

    checkWebHookStatus(environment);
    checkQueueStatus(environment, setup.apiProduct4);
  });

  it("should not return a connection status if the user is not authorized", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    await AppsService.createDeveloperApp({ ...devctx, requestBody: application });

    PlatformAPIClient.setManagementUser();

    await AppsService.getAppStatus({ organizationName: organizationName, appName: applicationName }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not return a connection status for an unknown application", async function () {

    await AppsService.getAppStatus({ organizationName: organizationName, appName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

  // HELPER

  /**
   * Verifies the application environment status for a web hook.
   * 
   * @param status The application environment status.
   * @param webHook The web hook.
   */
  const checkWebHookStatus = (status: AppEnvironmentStatus, webHook?: WebHook): void => {

    if (webHook === undefined) {
      expect(status.webHooks, `web hook status for ${status.name} is unexpected`).to.be.undefined;
    } else {
      expect(status.webHooks?.length, `web hook status for ${status.name} is not set`).to.be.equals(1);
      expect(status.webHooks[0], `web hook status for ${status.name} is not correct`).to.have.property("up").that.is.a("boolean");
      expect(status.webHooks[0], `web hook status for ${status.name} is not correct`).to.have.property("uri", webHook.uri);
    }
  }

  /**
   * Verifies the application environment status for message queues.
   * 
   * @param status The application environment status.
   * @param apiProducts The list of API products with guaranteed message delivery enabled.
   */
  const checkQueueStatus = (status: AppEnvironmentStatus, ...apiProducts: Array<APIProduct>): void => {

    if (apiProducts.length === 0) {
      expect(status.queues, `queue status for ${status.name} is unexpected`).to.be.undefined;
    } else {
      expect(status.queues?.length, `queue status for ${status.name} is not set`).to.be.equals(apiProducts.length);
      const names = status.queues.map(queue => queue.name.split("-")[1]);
      apiProducts.forEach(apiProduct => {
        expect(names, `queue status for ${apiProduct.name} is missing`).to.include.members([apiProduct.name]);
      });
    }
  }

});
