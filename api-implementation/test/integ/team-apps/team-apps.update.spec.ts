import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import type { App, AppPatch } from "../../lib/generated/openapi";
import { ApiError, AppStatus, TeamsService } from "../../lib/generated/openapi";

import * as setup from './common/test.setup';
import { AclProfile, Queue } from './common/test.helpers';
import {
  createRestDeliveryPointFromWebHook,
  verifyAclProfile,
  verifyMessageQueue,
  verifyRestDeliveryPoint,
} from './common/test.helpers';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const organizationName: string = setup.organizationName;
  const teamName: string = setup.team1.name;

  const teamctx = {
    organizationName: organizationName,
    teamName: teamName,
  }

  const applicationName: string = "test-app";

  // HOOKS

  setup.addBeforeHooks(this);

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await TeamsService.deleteTeamApp({ ...teamctx, appName: applicationName });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should update the display name", async function () {

    let application: App = {
      name: applicationName,
      displayName: "display name for app",
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    const r = await TeamsService.createTeamApp({ ...teamctx, requestBody: application });
    application = r.body;

    const applicationPatch = {
      ...teamctx,
      appName: applicationName,
      requestBody: {
        displayName: "updated display name for app",
      },
    }

    const response = await TeamsService.updateTeamApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update team application; error="${reason.body.message}"`);
    });

    // Note: The updateTeamApp() function returns a AppPatch body. An AppPatch object contains
    //       less information than a App or AppResponse object.

    expect(response.body, "response is not correct").to.deep.include({
      displayName: applicationPatch.requestBody.displayName,
      apiProducts: application.apiProducts,
      credentials: application.credentials,
      internalName: application.internalName,
      status: AppStatus.APPROVED,
    });
  });

  it("should update the ACL profile when API products are added", async function () {

    let application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name],
      credentials: { expiresAt: -1 },
    }

    const r = await TeamsService.createTeamApp({ ...teamctx, requestBody: application });
    application = r.body;

    const applicationPatch = {
      ...teamctx,
      appName: applicationName,
      requestBody: {
        apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name],
      },
    }

    await TeamsService.updateTeamApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update team application; error="${reason.body.message}"`);
    });

    const aclProfileName: string = application.internalName;
    const aclProfile1: AclProfile = {
      pubTopicExceptions: ["say/hello/EN", "say/hello/DE"],
      subTopicExceptions: ["say/hello/EN", "say/hello/DE"],
    }
    const aclProfile2: AclProfile = {
      pubTopicExceptions: ["user/signedup"],
      subTopicExceptions: [],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, aclProfile1);
    await verifyAclProfile(setup.environment2, aclProfileName, aclProfile2);
  });

  it("should update the ACL profile when API products are removed", async function () {

    let application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
      credentials: { expiresAt: -1 },
    }

    const r = await TeamsService.createTeamApp({ ...teamctx, requestBody: application });
    application = r.body;

    const applicationPatch = {
      ...teamctx,
      appName: applicationName,
      requestBody: {
        apiProducts: [setup.apiProduct2.name],
      },
    }

    await TeamsService.updateTeamApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update team application; error="${reason.body.message}"`);
    });

    const aclProfileName: string = application.internalName;
    const aclProfile: AclProfile = {
      pubTopicExceptions: ["user/signedup"],
      subTopicExceptions: [],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, null);
    await verifyAclProfile(setup.environment2, aclProfileName, aclProfile);
  });

  it("should update the ACL profile when attributes are changed", async function () {

    let application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name],
      credentials: { expiresAt: -1 },
    }

    const r = await TeamsService.createTeamApp({ ...teamctx, requestBody: application });
    application = r.body;

    const aclProfileName: string = application.internalName;

    const applicationPatch1 = {
      ...teamctx,
      appName: applicationName,
      requestBody: {
        attributes: [{ name: "language", value: "EN" }],
      },
    }

    const applicationPatch2 = {
      ...teamctx,
      appName: applicationName,
      requestBody: {
        attributes: [{ name: "language", value: "DE" }],
      },
    }

    await TeamsService.updateTeamApp(applicationPatch1).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update team application; error="${reason.body.message}"`);
    });

    const aclProfile1: AclProfile = {
      pubTopicExceptions: ["say/hello/EN"],
      subTopicExceptions: ["say/hello/EN"],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, aclProfile1);
    await verifyAclProfile(setup.environment2, aclProfileName, null);

    await TeamsService.updateTeamApp(applicationPatch2).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update team application; error="${reason.body.message}"`);
    });

    const aclProfile2: AclProfile = {
      pubTopicExceptions: ["say/hello/DE"],
      subTopicExceptions: ["say/hello/DE"],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, aclProfile2);
    await verifyAclProfile(setup.environment2, aclProfileName, null);
  });

  it("should update the REST delivery point when web hooks are added", async function () {

    let application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
      webHooks: [setup.webHook1],
      credentials: { expiresAt: -1 },
    }

    const r = await TeamsService.createTeamApp({ ...teamctx, requestBody: application });
    application = r.body;

    const queueName: string = application.internalName;
    const restDeliveryPointName: string = application.internalName;

    const applicationPatch = {
      ...teamctx,
      appName: applicationName,
      requestBody: {
        webHooks: [setup.webHook1, setup.webHook2],
      },
    }

    await TeamsService.updateTeamApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update team application; error="${reason.body.message}"`);
    });

    const queue: Queue = {
      accessType: Queue.accessType.EXCLUSIVE,
      maxTimeToLive: 86400,
    }

    await verifyMessageQueue(setup.environment1, queueName, queue);
    await verifyMessageQueue(setup.environment2, queueName, queue);

    const restDeliveryPoint1 = createRestDeliveryPointFromWebHook(setup.webHook1);
    const restDeliveryPoint2 = createRestDeliveryPointFromWebHook(setup.webHook2);

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, restDeliveryPoint1);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, restDeliveryPoint2);
  });

  it("should update the REST delivery point when web hooks are removed", async function () {

    let application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
      webHooks: [setup.webHook1, setup.webHook2],
      credentials: { expiresAt: -1 },
    }

    const r = await TeamsService.createTeamApp({ ...teamctx, requestBody: application });
    application = r.body;

    const queueName: string = application.internalName;
    const restDeliveryPointName: string = application.internalName;

    const applicationPatch = {
      ...teamctx,
      appName: applicationName,
      requestBody: {
        webHooks: [setup.webHook2],
      },
    }

    await TeamsService.updateTeamApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update team application; error="${reason.body.message}"`);
    });

    const queue: Queue = {
      accessType: Queue.accessType.EXCLUSIVE,
      maxTimeToLive: 86400,
    }

    await verifyMessageQueue(setup.environment1, queueName, null);
    await verifyMessageQueue(setup.environment2, queueName, queue);

    const restDeliveryPoint = createRestDeliveryPointFromWebHook(setup.webHook2);

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, restDeliveryPoint);
  });

  it("should update the REST delivery point when web hooks are added and removed", async function () {

    let application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
      webHooks: [setup.webHook1],
      credentials: { expiresAt: -1 },
    }

    const r = await TeamsService.createTeamApp({ ...teamctx, requestBody: application });
    application = r.body;

    const queueName: string = application.internalName;
    const restDeliveryPointName: string = application.internalName;

    const applicationPatch = {
      ...teamctx,
      appName: applicationName,
      requestBody: {
        webHooks: [setup.webHook2],
      },
    }

    await TeamsService.updateTeamApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update team application; error="${reason.body.message}"`);
    });

    const queue: Queue = {
      accessType: Queue.accessType.EXCLUSIVE,
      maxTimeToLive: 86400,
    }

    await verifyMessageQueue(setup.environment1, queueName, null);
    await verifyMessageQueue(setup.environment2, queueName, queue);

    const restDeliveryPoint = createRestDeliveryPointFromWebHook(setup.webHook2);

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, restDeliveryPoint);
  });

  it("should not update an application if the user is not authorized", async function () {

    let application: App = {
      name: applicationName,
      displayName: "display name for app",
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    await TeamsService.createTeamApp({ ...teamctx, requestBody: application });

    const applicationPatch = {
      ...teamctx,
      appName: applicationName,
      requestBody: {
        displayName: "updated display name for app",
      },
    }

    PlatformAPIClient.setManagementUser();
    await TeamsService.updateTeamApp(applicationPatch).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not update an application if the If-Match header is invalid", async function () {

    let application: App = {
      name: applicationName,
      displayName: "display name for app",
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    await TeamsService.createTeamApp({ ...teamctx, requestBody: application });

    const applicationPatch = {
      ...teamctx,
      appName: applicationName,
      ifMatch: "1234",
      requestBody: {
        displayName: "updated display name for app",
      },
    }

    await TeamsService.updateTeamApp(applicationPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([412]);
    });
  });

  it("should not update an application if the application has changed", async function () {

    let application: App = {
      name: applicationName,
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    const response = await TeamsService.createTeamApp({ ...teamctx, requestBody: application });
    const etag = response.headers['etag'];

    const applicationPatch1 = {
      ...teamctx,
      appName: applicationName,
      ifMatch: etag,
      requestBody: {
        displayName: "updated display name for app",
      },
    }

    const applicationPatch2 = {
      ...teamctx,
      appName: applicationName,
      ifMatch: etag,
      requestBody: {
        apiProducts: [setup.apiProduct1.name],
      },
    }

    // NOTE: The 2nd update must be submitted AFTER the 1st update has been processed, or
    //       otherwise, both updates will get processed. This is because the ETag is
    //       calculated based on the data in the database and as long as the data hasn't
    //       been updated, the "old" ETag will still be valid.

    await TeamsService.updateTeamApp(applicationPatch1);
    await TeamsService.updateTeamApp(applicationPatch2).then(() => {
      expect.fail("concurrent update request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([412]);
    });
  });

});
