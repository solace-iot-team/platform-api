import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import type { App, AppResponse } from "../../lib/generated/openapi";
import {
  ApiError,
  AppStatus,
  DevelopersService,
  WebHook,
} from "../../lib/generated/openapi";

import * as setup from './common/test.setup';
import { AclProfile, Queue } from './common/test.helpers';
import {
  createRestDeliveryPointFromWebHook,
  verifyAclProfile,
  verifyMessageQueue,
  verifyRestDeliveryPoint
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
    await DevelopersService.deleteDeveloperApp({ ...devctx, appName: applicationName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should create an application", async function () {

    const application: App = {
      name: applicationName,
      displayName: "display name for app",
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    const response = await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create developer application; error="${reason.body.message}"`);
    });

    const appResponse: AppResponse = response.body;
    const internalName: string = appResponse.internalName;

    expect(appResponse, "status is not correct").to.have.property('status', AppStatus.PENDING);
    expect(appResponse, "name is not correct").to.have.property('name', application.name);
    expect(appResponse, "display name is not correct").to.have.property('displayName', application.displayName ?? application.name);
    expect(appResponse, "internal name is not set").to.have.property('internalName');
    expect(appResponse, "consumer key is not set").to.have.nested.property('credentials.secret.consumerKey');
    expect(appResponse, "consumer secret is not set").to.have.nested.property('credentials.secret.consumerSecret');

    const aclProfileName: string = internalName;

    await verifyAclProfile(setup.environment1, aclProfileName, null);
    await verifyAclProfile(setup.environment2, aclProfileName, null);

    const queueName: string = internalName;

    await verifyMessageQueue(setup.environment1, queueName, null);
    await verifyMessageQueue(setup.environment2, queueName, null);

    const restDeliveryPointName: string = internalName;

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, null);
  });

  it("should create an application with credentials", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [],
      credentials: {
        expiresAt: new Date().getTime() + 3600,
        issuedAt: new Date().getTime(),
        secret: {
          consumerKey: "consumer-key",
          consumerSecret: "consumer-secret",
        }
      },
    }

    const response = await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create developer application; error="${reason.body.message}"`);
    });

    const appResponse: AppResponse = response.body;
    const internalName: string = appResponse.internalName;

    expect(appResponse, "status is not correct").to.have.property('status', AppStatus.PENDING);
    expect(appResponse, "name is not correct").to.have.property('name', application.name);
    expect(appResponse, "display name is not correct").to.have.property('displayName', application.displayName ?? application.name);
    expect(appResponse, "internal name is not set").to.have.property('internalName');
    expect(appResponse, "credentials are not correct").to.have.property('credentials').that.deep.includes(application.credentials);

    const aclProfileName: string = internalName;

    await verifyAclProfile(setup.environment1, aclProfileName, null);
    await verifyAclProfile(setup.environment2, aclProfileName, null);

    const queueName: string = internalName;

    await verifyMessageQueue(setup.environment1, queueName, null);
    await verifyMessageQueue(setup.environment2, queueName, null);

    const restDeliveryPointName: string = internalName;

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, null);
  });

  it("should create an application with API product", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name],
      attributes: [{ name: "language", value: "DE,EN" }],
      credentials: { expiresAt: -1 },
    }

    const response = await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create developer application; error="${reason.body.message}"`);
    });

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.APPROVED);
    expect(response.body, "internal name is not set").to.have.property('internalName');

    const internalName: string = response.body.internalName;

    const aclProfileName: string = internalName;
    const aclProfile: AclProfile = {
      pubTopicExceptions: ["say/hello/EN", "say/hello/DE"],
      subTopicExceptions: ["say/hello/EN", "say/hello/DE"],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, aclProfile);
    await verifyAclProfile(setup.environment2, aclProfileName, null);

    const queueName: string = internalName;

    await verifyMessageQueue(setup.environment1, queueName, null);
    await verifyMessageQueue(setup.environment2, queueName, null);

    const restDeliveryPointName: string = internalName;

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, null);
  });

  it("should create an application with multiple API products", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
      credentials: { expiresAt: -1 },
    }

    const response = await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create developer application; error="${reason.body.message}"`);
    });

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.APPROVED);
    expect(response.body, "internal name is not set").to.have.property('internalName');

    const internalName: string = response.body.internalName;

    const aclProfileName: string = internalName;
    const aclProfile1: AclProfile = {
      pubTopicExceptions: ["say/hello/DE", "say/hello/EN"],
      subTopicExceptions: ["say/hello/DE", "say/hello/EN"],
    }
    const aclProfile2: AclProfile = {
      pubTopicExceptions: ["user/signedup"],
      subTopicExceptions: ["user/signedup"],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, aclProfile1);
    await verifyAclProfile(setup.environment2, aclProfileName, aclProfile2);

    const queueName: string = internalName;

    await verifyMessageQueue(setup.environment1, queueName, null);
    await verifyMessageQueue(setup.environment2, queueName, null);

    const restDeliveryPointName: string = internalName;

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, null);
  });

  it("should create an application with API product and web hook", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name],
      attributes: [{ name: "language", value: "EN" }],
      webHooks: [setup.webHook1],
      credentials: { expiresAt: -1 },
    }

    const response = await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create developer application; error="${reason.body.message}"`);
    });

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.APPROVED);
    expect(response.body, "internal name is not set").to.have.property('internalName');

    const internalName: string = response.body.internalName;

    const aclProfileName: string = internalName;
    const aclProfile: AclProfile = {
      pubTopicExceptions: ["say/hello/EN"],
      subTopicExceptions: ["say/hello/EN"],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, aclProfile);
    await verifyAclProfile(setup.environment2, aclProfileName, null);

    const queueName: string = internalName;
    const queue: Queue = {
      accessType: Queue.accessType.EXCLUSIVE,
      maxTimeToLive: 86400,
    }

    await verifyMessageQueue(setup.environment1, queueName, queue);
    await verifyMessageQueue(setup.environment2, queueName, null);

    const restDeliveryPointName: string = internalName;
    const restDeliveryPoint = createRestDeliveryPointFromWebHook(setup.webHook1);

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, restDeliveryPoint);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, null);
  });

  it("should create an application with API products with guaranteed delivery", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct4.name],
      credentials: { expiresAt: -1 },
    }

    const response = await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create developer application; error="${reason.body.message}"`);
    });

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.APPROVED);
    expect(response.body, "internal name is not set").to.have.property('internalName');

    const internalName: string = response.body.internalName;

    const aclProfileName: string = internalName;
    const aclProfile: AclProfile = {
      pubTopicExceptions: ["say/hello/EN"],
      subTopicExceptions: ["say/hello/EN"],
    }

    await verifyAclProfile(setup.environment1, aclProfileName, null);
    await verifyAclProfile(setup.environment2, aclProfileName, aclProfile);

    const queueName: string = `${internalName}-${setup.apiProduct4.name}`;
    const queue: Queue = {
      accessType: Queue.accessType.EXCLUSIVE,
      maxTimeToLive: 86400,
    }

    await verifyMessageQueue(setup.environment1, queueName, null);
    await verifyMessageQueue(setup.environment2, queueName, queue);

    const restDeliveryPointName: string = internalName;

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, null);
  });

  it("should create an application with API products that require approval", async function () {

    // When an application is created, the list of API products must contain the name of an API product or
    // an (apiproduct, status) object, with the status being optional. When the name is specified, the API
    // product will be considered being approved. When an (apiproduct, status) object is used, the status
    // of the API product depends on the status value.

    const application: App = {
      name: applicationName,
      apiProducts: [{
        apiproduct: setup.apiProduct5.name,
      }, {
        apiproduct: setup.apiProduct6.name,
      }],
      credentials: { expiresAt: -1 },
    }

    const response = await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create developer application; error="${reason.body.message}"`);
    });

    // The application status depends on the approval type of all API products and will be "pending" if one
    // or more API products have an approval type of "manual". The application status is independent of the
    // actual API product status.

    expect(response.body, "status is not correct").to.have.property('status', AppStatus.PENDING);
    expect(response.body, "internal name is not set").to.have.property('internalName');

    const internalName: string = response.body.internalName;

    const aclProfileName: string = internalName;

    await verifyAclProfile(setup.environment1, aclProfileName, null);
    await verifyAclProfile(setup.environment2, aclProfileName, null);

    const queueName: string = internalName;

    await verifyMessageQueue(setup.environment1, queueName, null);
    await verifyMessageQueue(setup.environment2, queueName, null);

    const restDeliveryPointName: string = internalName;

    await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
    await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, null);
  });

  it("should not create an application if the user is not authorized", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name],
      credentials: { expiresAt: -1 },
    }

    PlatformAPIClient.setManagementUser();

    await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not create an application if the name is already used", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name],
      credentials: { expiresAt: -1 },
    }

    await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application });

    await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not create an application if the API product is unknown", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: ["unknown"],
      credentials: { expiresAt: -1 },
    }

    await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not create an application if the web hook environment is incorrect", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [setup.apiProduct1.name],
      credentials: { expiresAt: -1 },
      webHooks: [
        {
          uri: "http://somewhere.net",
          environments: ["unknown"],
          method: WebHook.method.POST,
          mode: WebHook.mode.SERIAL,
        }
      ],
    }

    await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  xit("should not create an application if a status is specified for an API product", async function () {

    const application: App = {
      name: applicationName,
      apiProducts: [{
        apiproduct: setup.apiProduct5.name,
        status: AppStatus.APPROVED,
      }, {
        apiproduct: setup.apiProduct6.name,
      }],
      credentials: { expiresAt: -1 },
    }

    await DevelopersService.createDeveloperApp({ ...devctx, requestBody: application }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

});
