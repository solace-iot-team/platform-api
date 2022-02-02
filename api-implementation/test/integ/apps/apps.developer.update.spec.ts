import 'mocha';
import { expect } from 'chai';
import path from 'path';
import type { App, AppPatch } from "../../lib/generated/openapi";
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

  setup.setupSuite(this);

  const organizationName: string = setup.organizationName;
  const developerName: string = setup.developer1.userName;

  const applicationName: string = `${developerName}-app`;

  /** Base parameters to create, list, update or delete applications */
  const appctx = {
    organizationName: organizationName,
    developerUsername: developerName,
  }

  it("should update the display name", async function () {

    let application: App = {
      name: applicationName,
      displayName: "display name for app",
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }
    application = await AppsService.createDeveloperApp({ ...appctx, requestBody: application });

    const applicationPatch: AppPatch = {
      displayName: "updated display name for app",
    }

    const response = await AppsService.updateDeveloperApp({ ...appctx, appName: applicationName, requestBody: applicationPatch }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    expect(response, "status is not correct").to.have.property('status', AppStatus.APPROVED);
    expect(response, "name is not correct").to.have.property('name', application.name);
    expect(response, "display name is not correct").to.have.property('displayName', applicationPatch.displayName);
    expect(response, "internal name is not set").to.have.property('internalName', application.internalName);

    const secret = application.credentials.secret;

    expect(response, "consumer key is not set").to.have.nested.property('credentials.secret.consumerKey', secret.consumerKey);
    expect(response, "consumer secret is not set").to.have.nested.property('credentials.secret.consumerSecret', secret.consumerSecret);
  });

  it("should update the ACL profile when API products are added", async function () {

    let application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name],
      credentials: { expiresAt: -1 },
    }
    application = await AppsService.createDeveloperApp({ ...appctx, requestBody: application });

    const applicationPatch: AppPatch = {
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name],
    }

    await AppsService.updateDeveloperApp({ ...appctx, appName: applicationName, requestBody: applicationPatch }).catch((reason) => {
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
    application = await AppsService.createDeveloperApp({ ...appctx, requestBody: application });

    const applicationPatch: AppPatch = {
      apiProducts: [setup.apiProduct2.name],
    }

    await AppsService.updateDeveloperApp({ ...appctx, appName: applicationName, requestBody: applicationPatch }).catch((reason) => {
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
    application = await AppsService.createDeveloperApp({ ...appctx, requestBody: application });

    const aclProfileName: string = application.internalName;

    const applicationPatch1: AppPatch = {
      attributes: [{ name: "language", value: "EN" }],
    }

    await AppsService.updateDeveloperApp({ ...appctx, appName: applicationName, requestBody: applicationPatch1 }).catch((reason) => {
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

    await AppsService.updateDeveloperApp({ ...appctx, appName: applicationName, requestBody: applicationPatch2 }).catch((reason) => {
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
    application = await AppsService.createDeveloperApp({ ...appctx, requestBody: application });

    const queueName: string = application.internalName;
    const restDeliveryPointName: string = application.internalName;

    const applicationPatch: AppPatch = {
      webHooks: [setup.webHook1, setup.webHook2],
    }

    await AppsService.updateDeveloperApp({ ...appctx, appName: applicationName, requestBody: applicationPatch }).catch((reason) => {
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
    application = await AppsService.createDeveloperApp({ ...appctx, requestBody: application });

    const queueName: string = application.internalName;
    const restDeliveryPointName: string = application.internalName;

    const applicationPatch: AppPatch = {
      webHooks: [setup.webHook2],
    }

    await AppsService.updateDeveloperApp({ ...appctx, appName: applicationName, requestBody: applicationPatch }).catch((reason) => {
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
    application = await AppsService.createDeveloperApp({ ...appctx, requestBody: application });

    const queueName: string = application.internalName;
    const restDeliveryPointName: string = application.internalName;

    const applicationPatch: AppPatch = {
      webHooks: [setup.webHook2],
    }

    await AppsService.updateDeveloperApp({ ...appctx, appName: applicationName, requestBody: applicationPatch }).catch((reason) => {
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

  afterEach(async function () {
    await AppsService.deleteDeveloperApp({ ...appctx, appName: applicationName });
  });

});
