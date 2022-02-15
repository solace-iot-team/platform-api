import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import type {
  App,
  AppEnvironment,
  AppResponse,
  CommonName,
  Endpoint
} from "../../lib/generated/openapi";
import {
  ApiError,
  AppStatus,
  AppsService,
  Protocol
} from "../../lib/generated/openapi";

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const organizationName: string = setup.organizationName;
  const developerName: string = setup.developer1.userName;

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

  it("should return an application", async function () {

    this.slow(2000);

    const application: App = {
      name: applicationName,
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    await AppsService.createDeveloperApp({ ...devctx, requestBody: application });

    const response = await AppsService.getApp({ ...devctx, appName: application.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get developer application; error="${reason.body.message}"`);
    });

    const appResponse: AppResponse = response.body;

    expect(appResponse, "name is not correct").to.have.property('name', application.name);
    expect(appResponse, "display name is not correct").to.have.property('displayName', application.displayName ?? application.name);
    expect(appResponse, "API products are not correct").to.have.property('apiProducts').that.is.empty;
    expect(appResponse, "consumer key is not set").to.have.nested.property('credentials.secret.consumerKey');
    expect(appResponse, "consumer secret is not set").to.have.nested.property('credentials.secret.consumerSecret');
    expect(appResponse, "internal name is not set").to.have.property('internalName');
    expect(appResponse, "attributes are unexpected").to.not.have.property('attributes');
    expect(appResponse, "web hooks are unexpected").to.not.have.property('webHooks');
    expect(appResponse, "status is not correct").to.have.property('status', AppStatus.APPROVED);
    expect(appResponse, "environments are not correct").to.have.property('environments').that.is.empty;
  });

  it("should return an application with API products", async function () {

    this.slow(5000);

    const application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name],
      credentials: { expiresAt: -1 },
    }

    await AppsService.createDeveloperApp({ ...devctx, requestBody: application });

    const response = await AppsService.getApp({ ...devctx, appName: application.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get developer application; error="${reason.body.message}"`);
    });

    const appResponse: AppResponse = response.body;

    expect(appResponse, "name is not correct").to.have.property('name', application.name);
    expect(appResponse, "display name is not correct").to.have.property('displayName', application.displayName ?? application.name);
    expect(appResponse, "API products are not coorect").to.have.property('apiProducts').to.have.members(application.apiProducts);
    expect(appResponse, "consumer key is not set").to.have.nested.property('credentials.secret.consumerKey');
    expect(appResponse, "consumer secret is not set").to.have.nested.property('credentials.secret.consumerSecret');
    expect(appResponse, "internal name is not set").to.have.property('internalName');
    expect(appResponse, "attributes are unexpected").to.not.have.property('attributes');
    expect(appResponse, "web hooks are unexpected").to.not.have.property('webHooks');
    expect(appResponse, "status is not correct").to.have.property('status', AppStatus.APPROVED)
    expect(appResponse, "environments are not set").to.have.property('environments');

    const environments = appResponse.environments;
    expect(environments.length, "number of environments is not correct").to.be.equals(2);

    let envNames: Array<string> = environments.map(env => env.name);
    expect(envNames, "list of environment names is incorrect").to.have.members([
      setup.environment1.name,
      setup.environment2.name,
    ]);

    let environment: AppEnvironment;

    // Check messaging protocols and permissions for environment #1

    environment = environments[envNames.indexOf(setup.environment1.name)];
    expect(environment.messagingProtocols, `protocols are not correct for ${environment.name}`).to.have.deep.members([
      getMessagingProtocol(environment.name, Protocol.name.MQTT, "3.1.1"),
      getMessagingProtocol(environment.name, Protocol.name.HTTP, "1.1"),
    ]);
    expect(environment.permissions, `permissions are not correct for ${environment.name}`).to.deep.include({
      subscribe: [{
        "say/hello/{language}": {
          isChannel: true,
          permissions: ["say/hello/EN", "say/hello/DE"],
        }
      }],
      publish: [{
        "say/hello/{language}": {
          isChannel: true,
          permissions: ["say/hello/EN", "say/hello/DE"],
        }
      }],
    });

    // Check messaging protocols and permissions for environment #2

    environment = environments[envNames.indexOf(setup.environment2.name)];
    expect(environment.messagingProtocols, `protocols are not correct for ${environment.name}`).to.have.deep.members([
      getMessagingProtocol(environment.name, Protocol.name.MQTT, "3.1.1"),
      getMessagingProtocol(environment.name, Protocol.name.HTTP, "1.1"),
    ]);
    expect(environment.permissions, `permissions are not correct for ${environment.name}`).to.deep.include({
      subscribe: [{
        "user/signedup": {
          isChannel: true,
          permissions: ["user/signedup"],
        }
      }],
      publish: [],
    });

  });

  it("should return an application with API product and web hook", async function () {

    this.slow(5000);

    const application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name],
      attributes: [{ name: "language", value: "EN" }],
      webHooks: [setup.webHook1],
      credentials: { expiresAt: -1 },
    }

    await AppsService.createDeveloperApp({ ...devctx, requestBody: application });

    const response = await AppsService.getApp({ ...devctx, appName: application.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get developer application; error="${reason.body.message}"`);
    });

    const appResponse: AppResponse = response.body;

    expect(appResponse, "name is not correct").to.have.property('name', application.name);
    expect(appResponse, "display name is not correct").to.have.property('displayName', application.displayName ?? application.name);
    expect(appResponse, "API products are not correct").to.have.property('apiProducts').to.have.members(application.apiProducts);
    expect(appResponse, "consumer key is not set").to.have.nested.property('credentials.secret.consumerKey');
    expect(appResponse, "consumer secret is not set").to.have.nested.property('credentials.secret.consumerSecret');
    expect(appResponse, "internal name is not set").to.have.property('internalName');
    expect(appResponse, "attributes are not correct").to.have.property('attributes').to.have.deep.members(application.attributes);
    expect(appResponse, "web hooks are not set").to.have.property('webHooks');
    expect(appResponse, "status is not correct").to.have.property('status', AppStatus.APPROVED)
    expect(appResponse, "environments are not set").to.have.property('environments');

    const environments = appResponse.environments;
    expect(environments, "number of environments is not correct").to.have.lengthOf(1);

    let envNames: Array<string> = environments.map(env => env.name);
    expect(envNames, "list of environment names is incorrect").to.have.members([setup.environment1.name]);

    let environment: AppEnvironment;

    // Check messaging protocols and permissions for environment #1

    environment = environments[envNames.indexOf(setup.environment1.name)];
    expect(environment.messagingProtocols, `protocols are not correct for ${environment.name}`).to.have.deep.members([
      getMessagingProtocol(environment.name, Protocol.name.MQTT, "3.1.1"),
      getMessagingProtocol(environment.name, Protocol.name.HTTP, "1.1"),
    ]);
    expect(environment.permissions, `permissions are not correct for ${environment.name}`).to.deep.include({
      subscribe: [{
        "say/hello/{language}": {
          isChannel: true,
          permissions: ["say/hello/EN"],
        }
      }],
      publish: [{
        "say/hello/{language}": {
          isChannel: true,
          permissions: ["say/hello/EN"],
        }
      }],
    });

  });

  it("should not return an application if the user is not authorized", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    await AppsService.createDeveloperApp({ ...devctx, requestBody: application });

    PlatformAPIClient.setManagementUser();

    await AppsService.getApp({ ...devctx, appName: application.name }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not return an application if the application is unknown", async function () {

    await AppsService.getApp({ ...devctx, appName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([404]);
    });
  });

  // HELPER

  const getMessagingProtocol = (environmentName: string, name: Protocol.name, version: CommonName): Endpoint => {

    const details = setup.environmentDetails.get(environmentName);
    return details?.messagingProtocols.find(ep => {
      return ep.protocol.name === name && ep.protocol.version === version
    });
  }

});
