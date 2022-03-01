import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import type { App } from "../../lib/generated/openapi";
import { ApiError, TeamsService } from "../../lib/generated/openapi";

import * as setup from './common/test.setup';
import {
  verifyAclProfile,
  verifyMessageQueue,
  verifyRestDeliveryPoint
} from './common/test.helpers';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const organizationName: string = setup.organizationName;
  const teamName: string = setup.team1.name;

  const teamctx = {
    organizationName: organizationName,
    teamName: teamName,
  }

  const applicationName: string = `${teamName}-app`;

  // HOOKS

  setup.addBeforeHooks(this);

  afterEach(async function () {
    await TeamsService.deleteTeamApp({ ...teamctx, appName: applicationName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should delete an application", async function () {

    let application: App = {
      name: applicationName,
      displayName: "display name for app",
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }
    application = (await TeamsService.createTeamApp({ ...teamctx, requestBody: application })).body;

    await TeamsService.deleteTeamApp({ ...teamctx, appName: applicationName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to delete team application; error="${reason.body.message}"`);
    });
  });

  it("should delete an application with API products", async function () {

    let application: App = {
      name: applicationName,
      displayName: "display name for app",
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name],
      credentials: { expiresAt: -1 },
    }

    application = (await TeamsService.createTeamApp({ ...teamctx, requestBody: application })).body;

    await TeamsService.deleteTeamApp({ ...teamctx, appName: applicationName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to delete team application; error="${reason.body.message}"`);
    });

    const aclProfileName: string = application.internalName;

    await verifyAclProfile(setup.environment1, aclProfileName, null);
    await verifyAclProfile(setup.environment2, aclProfileName, null);
  });

  it("should delete an application with API products and web hooks", async function () {

    let application: App = {
      name: applicationName,
      displayName: "display name for app",
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
      webHooks: [setup.webHook1, setup.webHook2],
      credentials: { expiresAt: -1 },
    }
    application = (await TeamsService.createTeamApp({ ...teamctx, requestBody: application })).body;

    await TeamsService.deleteTeamApp({ ...teamctx, appName: applicationName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to delete team application; error="${reason.body.message}"`);
    });

    const aclProfileName: string = application.internalName;

    await verifyAclProfile(setup.environment1, aclProfileName, null);
    await verifyAclProfile(setup.environment2, aclProfileName, null);

    const queueName: string = application.internalName;

    await verifyMessageQueue(setup.environment1, queueName, null);
    await verifyMessageQueue(setup.environment2, queueName, null);

    const restDeliveryPointName: string = application.internalName;

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, null);
  });

  it("should not delete an application if the user is not authorized", async function () {

    let application: App = {
      name: applicationName,
      displayName: "display name for app",
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }
    application = (await TeamsService.createTeamApp({ ...teamctx, requestBody: application })).body;

    PlatformAPIClient.setManagementUser();
    await TeamsService.deleteTeamApp({ ...teamctx, appName: applicationName }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not delete an application that does not exist", async function () {

    await TeamsService.deleteTeamApp({ ...teamctx, appName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});
