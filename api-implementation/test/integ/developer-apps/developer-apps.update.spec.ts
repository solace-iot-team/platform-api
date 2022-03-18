import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import type { App } from "../../lib/generated/openapi";
import {
  ApiError,
  AppStatus,
  DevelopersService
} from "../../lib/generated/openapi";

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

  const applicationName: string = "test-app";

  // HOOKS

  setup.addBeforeHooks(this);

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await DevelopersService.deleteDeveloperApp({ ...devctx, appName: applicationName });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should update the display name", async function () {

    const application: App = await createApplication({
      name: applicationName,
      displayName: "display name for app",
      apiProducts: [],
      credentials: { expiresAt: -1 },
    });

    const applicationPatch = {
      ...devctx,
      appName: applicationName,
      requestBody: {
        displayName: "updated display name for app",
      },
    }

    const response = await DevelopersService.updateDeveloperApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    // Note: The response for an PATCH app request contains an AppPatch body (instead of an
    //       AppResponse body). This is most-likely a bug in the OpenAPI specification.

    expect(response.body, "response is not correct").to.deep.include({
      displayName: applicationPatch.requestBody.displayName,
      internalName: application.internalName,
      apiProducts: application.apiProducts,
      credentials: application.credentials,
      status: AppStatus.PENDING,
    });
  });

  it("should update the PubSub+ broker when attributes are changed", async function () {

    const application: App = await createApplication({
      name: applicationName,
      apiProducts: [setup.apiProduct1.name],
      attributes: [{ name: "language", value: "EN" }],
      credentials: { expiresAt: -1 },
    });

    const applicationPatch = {
      ...devctx,
      appName: applicationName,
      requestBody: {
        attributes: [{ name: "language", value: "DE" }],
      },
    }

    const response = await DevelopersService.updateDeveloperApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.APPROVED);

    const aclProfileName = application.internalName;
    const aclProfile: AclProfile = {
      pubTopicExceptions: ["say/hello/DE"],
      subTopicExceptions: ["say/hello/DE"],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, aclProfile);
    await verifyAclProfile(setup.environment2, aclProfileName, null);
  });

  it("should update the PubSub+ broker when API products are added", async function () {

    const application: App = await createApplication({
      name: applicationName,
      apiProducts: [setup.apiProduct1.name],
      credentials: { expiresAt: -1 },
    });

    const applicationPatch = {
      ...devctx,
      appName: applicationName,
      requestBody: {
        apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
      }
    }

    const response = await DevelopersService.updateDeveloperApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.APPROVED);

    const aclProfileName: string = application.internalName;
    const aclProfile1: AclProfile = {
      pubTopicExceptions: ["say/hello/EN", "say/hello/DE"],
      subTopicExceptions: ["say/hello/EN", "say/hello/DE"],
    }
    const aclProfile2: AclProfile = {
      pubTopicExceptions: ["user/signedup"],
      subTopicExceptions: ["user/signedup"],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, aclProfile1);
    await verifyAclProfile(setup.environment2, aclProfileName, aclProfile2);
  });

  it("should update the PubSub+ broker when API products are removed", async function () {

    const application: App = await createApplication({
      name: applicationName,
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
      credentials: { expiresAt: -1 },
    });

    const applicationPatch = {
      ...devctx,
      appName: applicationName,
      requestBody: {
        apiProducts: [setup.apiProduct2.name],
      },
    }

    const response = await DevelopersService.updateDeveloperApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.APPROVED);

    const aclProfileName: string = application.internalName;
    const aclProfile: AclProfile = {
      pubTopicExceptions: ["user/signedup"],
      subTopicExceptions: [],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, null);
    await verifyAclProfile(setup.environment2, aclProfileName, aclProfile);
  });

  it("should update the PubSub+ broker when web hooks are added", async function () {

    const application: App = await createApplication({
      name: applicationName,
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
      webHooks: [setup.webHook1],
      credentials: { expiresAt: -1 },
    });

    const applicationPatch = {
      ...devctx,
      appName: applicationName,
      requestBody: {
        webHooks: [setup.webHook1, setup.webHook2],
      },
    }

    const response = await DevelopersService.updateDeveloperApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.APPROVED);

    const queueName: string = application.internalName;
    const queue: Queue = {
      accessType: Queue.accessType.EXCLUSIVE,
      maxTimeToLive: 86400,
    }

    await verifyMessageQueue(setup.environment1, queueName, queue);
    await verifyMessageQueue(setup.environment2, queueName, queue);

    const restDeliveryPointName: string = application.internalName;
    const restDeliveryPoint1 = createRestDeliveryPointFromWebHook(setup.webHook1);
    const restDeliveryPoint2 = createRestDeliveryPointFromWebHook(setup.webHook2);

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, restDeliveryPoint1);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, restDeliveryPoint2);
  });

  it("should update the PubSub+ broker when web hooks are removed", async function () {

    const application: App = await createApplication({
      name: applicationName,
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
      webHooks: [setup.webHook1, setup.webHook2],
      credentials: { expiresAt: -1 },
    });

    const applicationPatch = {
      ...devctx,
      appName: applicationName,
      requestBody: {
        webHooks: [setup.webHook2],
      },
    }

    const response = await DevelopersService.updateDeveloperApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.APPROVED);

    const queueName: string = application.internalName;
    const queue: Queue = {
      accessType: Queue.accessType.EXCLUSIVE,
      maxTimeToLive: 86400,
    }

    await verifyMessageQueue(setup.environment1, queueName, null);
    await verifyMessageQueue(setup.environment2, queueName, queue);

    const restDeliveryPointName: string = application.internalName;
    const restDeliveryPoint = createRestDeliveryPointFromWebHook(setup.webHook2);

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, restDeliveryPoint);
  });

  it("should update the PubSub+ broker when web hooks are added and removed", async function () {

    const application: App = await createApplication({
      name: applicationName,
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
      webHooks: [setup.webHook1],
      credentials: { expiresAt: -1 },
    });

    const applicationPatch = {
      ...devctx,
      appName: applicationName,
      requestBody: {
        webHooks: [setup.webHook2],
      },
    }

    const response = await DevelopersService.updateDeveloperApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.APPROVED);

    const queueName: string = application.internalName;
    const queue: Queue = {
      accessType: Queue.accessType.EXCLUSIVE,
      maxTimeToLive: 86400,
    }

    await verifyMessageQueue(setup.environment1, queueName, null);
    await verifyMessageQueue(setup.environment2, queueName, queue);

    const restDeliveryPointName: string = application.internalName;
    const restDeliveryPoint = createRestDeliveryPointFromWebHook(setup.webHook2);

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, restDeliveryPoint);
  });

  it("should update the PubSub+ broker when an application is approved", async function () {

    const application: App = await createApplication({
      name: applicationName,
      apiProducts: [setup.apiProduct5.name, setup.apiProduct6.name],
      credentials: { expiresAt: -1 },
    });

    const applicationPatch = {
      ...devctx,
      appName: applicationName,
      requestBody: {
        status: AppStatus.APPROVED,
      },
    }

    const response = await DevelopersService.updateDeveloperApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.APPROVED);

    const aclProfileName: string = application.internalName;
    const aclProfile: AclProfile = {
      pubTopicExceptions: ["user/signedup"],
      subTopicExceptions: ["user/signedup"],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, null);
    await verifyAclProfile(setup.environment2, aclProfileName, aclProfile);
  });

  it("should update the PubSub+ broker when an API product is approved", async function () {

    const application: App = await createApplication({
      name: applicationName,
      apiProducts: [{
        apiproduct: setup.apiProduct5.name,
      }, {
        apiproduct: setup.apiProduct6.name,
      }],
      credentials: { expiresAt: -1 },
    });

    // When an application is created with one or more API products that require approval, the
    // application status will be "pending" and the status must be updated to "approved".

    const approveApplication = {
      ...devctx,
      appName: applicationName,
      requestBody: {
        status: AppStatus.APPROVED,
      },
    }

    await DevelopersService.updateDeveloperApp(approveApplication).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    // An API product is approved by updating the status of the API product to "approved".

    const applicationPatch = {
      ...devctx,
      appName: applicationName,
      requestBody: {
        apiProducts: [{
          apiproduct: setup.apiProduct5.name,
          status: AppStatus.APPROVED,
        }, {
          apiproduct: setup.apiProduct6.name,
          status: AppStatus.PENDING,
        }],
      },
    }

    const response = await DevelopersService.updateDeveloperApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.APPROVED);

    // API products with a status other than "approved" will be ignored when the configuration of
    // the PubSub+ broker is updated.

    const aclProfileName: string = application.internalName;
    const aclProfile: AclProfile = {
      pubTopicExceptions: ["user/signedup"],
      subTopicExceptions: [],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, null);
    await verifyAclProfile(setup.environment2, aclProfileName, aclProfile);
  });

  it("should update the PubSub+ broker when an API product is revoked", async function () {

    const application: App = await createApplication({
      name: applicationName,
      apiProducts: [{
        apiproduct: setup.apiProduct5.name,
      }, {
        apiproduct: setup.apiProduct6.name,
      }],
      credentials: { expiresAt: -1 },
    });

    // When an application is created with one or more API products that require approval, the
    // application status will be "pending" and the status must be updated to "approved".

    const approveApplicationAndProducts = {
      ...devctx,
      appName: applicationName,
      requestBody: {
        apiProducts: [{
          apiproduct: setup.apiProduct5.name,
          status: AppStatus.APPROVED,
        }, {
          apiproduct: setup.apiProduct6.name,
          status: AppStatus.APPROVED,
        }],
        status: AppStatus.APPROVED,
      },
    }

    await DevelopersService.updateDeveloperApp(approveApplicationAndProducts).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    // An API product is revoked by updating the status of the API product to "revoked".

    const applicationPatch = {
      ...devctx,
      appName: applicationName,
      requestBody: {
        apiProducts: [{
          apiproduct: setup.apiProduct5.name,
          status: AppStatus.REVOKED,
        }, {
          apiproduct: setup.apiProduct6.name,
          status: AppStatus.APPROVED,
        }],
      },
    }

    const response = await DevelopersService.updateDeveloperApp(applicationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer application; error="${reason.body.message}"`);
    });

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.APPROVED);

    // API products with a status other than "approved" will be ignored when the configuration of
    // the PubSub+ broker is updated.

    const aclProfileName: string = application.internalName;
    const aclProfile: AclProfile = {
      pubTopicExceptions: [],
      subTopicExceptions: ["user/signedup"],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, null);
    await verifyAclProfile(setup.environment2, aclProfileName, aclProfile);
  });

  it("should not update an application if the user is not authorized", async function () {

    await createApplication({
      name: applicationName,
      displayName: "display name for app",
      apiProducts: [],
      credentials: { expiresAt: -1 },
    });

    const applicationPatch = {
      ...devctx,
      appName: applicationName,
      requestBody: {
        displayName: "updated display name for app",
      },
    }

    PlatformAPIClient.setManagementUser();

    await DevelopersService.updateDeveloperApp(applicationPatch).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not update an application if the If-Match header is invalid", async function () {

    await createApplication({
      name: applicationName,
      displayName: "display name for app",
      apiProducts: [],
      credentials: { expiresAt: -1 },
    });

    const applicationPatch = {
      ...devctx,
      appName: applicationName,
      ifMatch: "1234",
      requestBody: {
        displayName: "updated display name for app",
      }
    }

    await DevelopersService.updateDeveloperApp(applicationPatch).then(() => {
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

    const response = await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application });
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

    // NOTE: The 2nd update must be submitted AFTER the 1st update has been processed, or
    //       otherwise, both updates will get processed. This is because the ETag is
    //       calculated based on the data in the database and as long as the data hasn't
    //       been updated, the "old" ETag will still be valid.

    await DevelopersService.updateDeveloperApp(applicationPatch1);
    await DevelopersService.updateDeveloperApp(applicationPatch2).then(() => {
      expect.fail("concurrent update request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([412]);
    });
  });

  // HELPER

  /**
   * Creates a developer application.
   * 
   * @param application
   *              The application to create.
   * 
   * @returns The created application.
   */
  const createApplication = async (application: App): Promise<App> => {

    const response = await DevelopersService.createDeveloperApp({
      ...devctx,
      requestBody: application
    });

    return response.body as App;
  }

});
