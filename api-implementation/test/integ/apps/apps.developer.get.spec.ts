import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { TestContext } from "../../lib/test.helpers";
import { App, AppStatus, WebHook } from "../../lib/generated/openapi";
import { ApiError, AppsService } from "../../lib/generated/openapi";

import * as setup from './common/test.setup';
import { PlatformAPIClient } from '../../lib/api.helpers';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  setup.setupSuite(this);

  const organizationName: string = setup.organizationName;
  const developerName: string = setup.developer1.userName;

  const applicationName: string = `${developerName}-app`;

  /** Base parameters to create, list, update or delete applications. */
  const appctx = {
    organizationName: organizationName,
    developerUsername: developerName,
  }

  it("should return an application", async function () {

    this.slow(2000);

    const application: App = {
      name: applicationName,
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    await AppsService.createDeveloperApp({ ...appctx, requestBody: application });

    const response = await AppsService.getDeveloperApp({ ...appctx, appName: application.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get developer application; error="${reason.body.message}"`);
    });

    expect(response, "name is not correct").to.have.property('name', application.name);
    expect(response, "display name is not correct").to.have.property('displayName', application.displayName ?? application.name);
    expect(response, "API products are not correct").to.have.property('apiProducts').that.is.empty;
    expect(response, "consumer key is not set").to.have.nested.property('credentials.secret.consumerKey');
    expect(response, "consumer secret is not set").to.have.nested.property('credentials.secret.consumerSecret');
    expect(response, "internal name is not set").to.have.property('internalName');
    expect(response, "attributes are unexpected").to.not.have.property('attributes');
    expect(response, "web hooks are unexpected").to.not.have.property('webHooks');
    expect(response, "status is not correct").to.have.property('status', AppStatus.APPROVED);
    expect(response, "environments are not correct").to.have.property('environments').that.is.empty;
  });

  it("should return an application with API products", async function () {

    this.slow(5000);

    const application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
      credentials: { expiresAt: -1 },
    }

    await AppsService.createDeveloperApp({ ...appctx, requestBody: application });

    const response = await AppsService.getDeveloperApp({ ...appctx, appName: application.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get developer application; error="${reason.body.message}"`);
    });

    expect(response, "name is not correct").to.have.property('name', application.name);
    expect(response, "display name is not correct").to.have.property('displayName', application.displayName ?? application.name);
    expect(response, "API products are not coorect").to.have.property('apiProducts').to.have.members(application.apiProducts);
    expect(response, "consumer key is not set").to.have.nested.property('credentials.secret.consumerKey');
    expect(response, "consumer secret is not set").to.have.nested.property('credentials.secret.consumerSecret');
    expect(response, "internal name is not set").to.have.property('internalName');
    expect(response, "attributes are unexpected").to.not.have.property('attributes');
    expect(response, "web hooks are unexpected").to.not.have.property('webHooks');
    expect(response, "status is not correct").to.have.property('status', AppStatus.APPROVED)
    expect(response, "environments are not set").to.have.property('environments');

    const environments = response.environments;
    expect(environments.length, "number of environments is not correct").to.be.equals(2);

    let envNames: Array<string> = [];
    environments.forEach(env => envNames.push(env.name));

    expect(envNames, "list of environment names is incorrect").to.have.members([
      setup.environment1.name,
      setup.environment2.name,
    ]);
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

    await AppsService.createDeveloperApp({ ...appctx, requestBody: application });

    const response = await AppsService.getDeveloperApp({ ...appctx, appName: application.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get developer application; error="${reason.body.message}"`);
    });

    expect(response, "name is not correct").to.have.property('name', application.name);
    expect(response, "display name is not correct").to.have.property('displayName', application.displayName ?? application.name);
    expect(response, "API products are not correct").to.have.property('apiProducts').to.have.members(application.apiProducts);
    expect(response, "consumer key is not set").to.have.nested.property('credentials.secret.consumerKey');
    expect(response, "consumer secret is not set").to.have.nested.property('credentials.secret.consumerSecret');
    expect(response, "internal name is not set").to.have.property('internalName');
    expect(response, "attributes are not correct").to.have.property('attributes').to.have.deep.members(application.attributes);
    expect(response, "web hooks are not set").to.have.property('webHooks');
    expect(response, "status is not correct").to.have.property('status', AppStatus.APPROVED)
    expect(response, "environments are not set").to.have.property('environments');

    const environments = response.environments;
    expect(environments.length, "number of environments is not correct").to.be.equals(1);

    let envNames: Array<string> = [];
    environments.forEach(env => envNames.push(env.name));

    expect(envNames, "list of environment names is incorrect").to.have.members([setup.environment1.name]);
  });

  it("should not return an application if the user is not authorized", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    await AppsService.createDeveloperApp({ ...appctx, requestBody: application });

    PlatformAPIClient.setManagementUser();

    await AppsService.getDeveloperApp({ ...appctx, appName: application.name }).then(() => {
      expect.fail("an unauthorized user retrieved an application");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not return an application if the application is unknown", async function () {

    await AppsService.getDeveloperApp({ ...appctx, appName: "unknown" }).then(() => {
      expect.fail("an unknown application was returned");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([404]);
    });
  });

  afterEach(async function () {
    await AppsService.deleteDeveloperApp({ ...appctx, appName: applicationName }).catch(() => { });
  });

});
