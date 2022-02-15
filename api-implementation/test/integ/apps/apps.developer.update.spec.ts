import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import type { App, AppPatch, AppResponse } from "../../lib/generated/openapi";
import { ApiError, AppStatus, AppsService } from "../../lib/generated/openapi";

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
  const developerName: string = setup.developer1.userName;

  const devctx = {
    organizationName: organizationName,
    developerUsername: developerName,
  }

  const applicationName: string = `${developerName}-app`;

  // HOOKS

  setup.addBeforeHooks(this);

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await AppsService.deleteDeveloperApp({ ...devctx, appName: applicationName });
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
    application = (await AppsService.createDeveloperApp({ ...devctx, requestBody: application })).body;

    const applicationPatch: AppPatch = {
      displayName: "updated display name for app",
    }

    const response = await AppsService.updateDeveloperApp({ ...devctx, appName: applicationName, requestBody: applicationPatch }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    const appResponse: AppResponse = response.body;

    expect(appResponse, "status is not correct").to.have.property('status', AppStatus.APPROVED);
    expect(appResponse, "name is not correct").to.have.property('name', application.name);
    expect(appResponse, "display name is not correct").to.have.property('displayName', applicationPatch.displayName);
    expect(appResponse, "internal name is not set").to.have.property('internalName', application.internalName);

    const secret = application.credentials.secret;

    expect(appResponse, "consumer key is not set").to.have.nested.property('credentials.secret.consumerKey', secret.consumerKey);
    expect(appResponse, "consumer secret is not set").to.have.nested.property('credentials.secret.consumerSecret', secret.consumerSecret);
  });

  it("should update the ACL profile when API products are added", async function () {

    let application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name],
      credentials: { expiresAt: -1 },
    }
    application = (await AppsService.createDeveloperApp({ ...devctx, requestBody: application })).body;

    const applicationPatch: AppPatch = {
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name],
    }

    await AppsService.updateDeveloperApp({ ...devctx, appName: applicationName, requestBody: applicationPatch }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
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
    application = (await AppsService.createDeveloperApp({ ...devctx, requestBody: application })).body;

    const applicationPatch: AppPatch = {
      apiProducts: [setup.apiProduct2.name],
    }

    await AppsService.updateDeveloperApp({ ...devctx, appName: applicationName, requestBody: applicationPatch }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
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
    application = (await AppsService.createDeveloperApp({ ...devctx, requestBody: application })).body;

    const aclProfileName: string = application.internalName;

    const applicationPatch1: AppPatch = {
      attributes: [{ name: "language", value: "EN" }],
    }

    await AppsService.updateDeveloperApp({ ...devctx, appName: applicationName, requestBody: applicationPatch1 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    const aclProfile1: AclProfile = {
      pubTopicExceptions: ["say/hello/EN"],
      subTopicExceptions: ["say/hello/EN"],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, aclProfile1);
    await verifyAclProfile(setup.environment2, aclProfileName, null);

    const applicationPatch2: AppPatch = {
      attributes: [{ name: "language", value: "DE" }],
    }

    await AppsService.updateDeveloperApp({ ...devctx, appName: applicationName, requestBody: applicationPatch2 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
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
    application = (await AppsService.createDeveloperApp({ ...devctx, requestBody: application })).body;

    const queueName: string = application.internalName;
    const restDeliveryPointName: string = application.internalName;

    const applicationPatch: AppPatch = {
      webHooks: [setup.webHook1, setup.webHook2],
    }

    await AppsService.updateDeveloperApp({ ...devctx, appName: applicationName, requestBody: applicationPatch }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
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
    application = (await AppsService.createDeveloperApp({ ...devctx, requestBody: application })).body;

    const queueName: string = application.internalName;
    const restDeliveryPointName: string = application.internalName;

    const applicationPatch: AppPatch = {
      webHooks: [setup.webHook2],
    }

    await AppsService.updateDeveloperApp({ ...devctx, appName: applicationName, requestBody: applicationPatch }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
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
    application = (await AppsService.createDeveloperApp({ ...devctx, requestBody: application })).body;

    const queueName: string = application.internalName;
    const restDeliveryPointName: string = application.internalName;

    const applicationPatch: AppPatch = {
      webHooks: [setup.webHook2],
    }

    await AppsService.updateDeveloperApp({ ...devctx, appName: applicationName, requestBody: applicationPatch }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
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

    await AppsService.createDeveloperApp({ ...devctx, requestBody: application });

    const applicationPatch: AppPatch = {
      displayName: "updated display name for app",
    }

    PlatformAPIClient.setManagementUser();

    await AppsService.updateDeveloperApp({ ...devctx, appName: applicationName, requestBody: applicationPatch }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not update an application if the If-Match header is incorrect", async function () {

    let application: App = {
      name: applicationName,
      displayName: "display name for app",
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    await AppsService.createDeveloperApp({ ...devctx, requestBody: application });

    const applicationPatch = {
      ...devctx,
      appName: applicationName,
      ifMatch: "1234",
      requestBody: {
        displayName: "updated display name for app",
      }
    }

    await AppsService.updateDeveloperApp(applicationPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([412]);
    });
  });

  it("should not update an application if another update is already in progress", async function () {

    let application: App = {
      name: applicationName,
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    const response = await AppsService.createDeveloperApp({ ...devctx, requestBody: application });
    const etag = response.headers['etag'];

    const applicationPatch1 = {
      ...devctx,
      appName: applicationName,
      ifMatch: etag,
      requestBody: {
        displayName: "updated display name for app",
      }
    }

    const applicationPatch2 = {
      ...devctx,
      appName: applicationName,
      ifMatch: etag,
      requestBody: {
        apiProducts: [setup.apiProduct1.name],
      }
    }

    // NOTE: Promise.all() waits for all Promises to be resolved or one of them to be rejected.
    //       To check whether the 1st update was successful and whether the 2nd update failed,
    //       two promises are created that resolve with proper status information.

    const onResponded = () => ({ status: "fulfilled" });
    const onError = (reason: ApiError) => ({ status: "rejected", reason: reason });

    const update1 = AppsService.updateDeveloperApp(applicationPatch1).then(onResponded, onError);
    const update2 = new Promise((resolved, reject) => {
      // execute the second update a tiny bit after the first update (to make sure that 1st wins)
      setTimeout(() => { AppsService.updateDeveloperApp(applicationPatch2).then(resolved, reject); }, 100);
    }).then(onResponded, onError);

    await Promise.all([update1, update2]).then((result) => {
      expect(result[0].status, "1st update request was rejected").to.be.equals("fulfilled");
      expect(result[1].status, "2nd update request was not rejected").to.be.equals("rejected");
      expect(result[1], "status is not correct").to.have.nested.property("reason.status", 412);
    });
  });
});
