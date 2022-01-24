import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import type { App } from "../../lib/generated/openapi";
import {
  ApiError,
  AppStatus,
  AppsService,
  WebHook,
} from "../../lib/generated/openapi";
import * as setup from './setup';
import { AclProfile, Queue } from './test.helpers';
import {
  createRestDeliveryPointFromWebHook,
  verifyAclProfile,
  verifyMessageQueue,
  verifyRestDeliveryPoint
} from './test.helpers';

const scriptName: string = path.basename(__filename);

describe("apps", function () {
  describe(scriptName, function () {

    const developerName: string = setup.developer1.userName;
    const applicationName: string = `${developerName}-app`;

    it("should create an application", async function () {

      this.slow(2000);

      const application: App = {
        name: applicationName,
        displayName: "display name for app",
        apiProducts: [],
        credentials: { expiresAt: -1 },
      }

      const response = await AppsService.createDeveloperApp(setup.organizationName, developerName, application).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect.fail(`failed to create developer application; error="${reason.body.message}"`);
      });

      expect(response, "status is not correct").to.have.property('status', AppStatus.APPROVED);
      expect(response, "name is not correct").to.have.property('name', application.name);
      expect(response, "display name is not correct").to.have.property('displayName', application.displayName ?? application.name);
      expect(response, "internal name is not set").to.have.property('internalName');
      expect(response, "consumer key is not set").to.have.nested.property('credentials.secret.consumerKey');
      expect(response, "consumer secret is not set").to.have.nested.property('credentials.secret.consumerSecret');

      const aclProfileName: string = response.internalName;

      await verifyAclProfile(setup.environment1, aclProfileName, null);
      await verifyAclProfile(setup.environment2, aclProfileName, null);

      const queueName: string = response.internalName;

      await verifyMessageQueue(setup.environment1, queueName, null);
      await verifyMessageQueue(setup.environment2, queueName, null);

      const restDeliveryPointName: string = response.internalName;

      await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
      await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, null);
    });

    it("should create an application with credentials", async function () {

      this.slow(2000);

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

      const response = await AppsService.createDeveloperApp(setup.organizationName, developerName, application).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect.fail(`failed to create developer application; error="${reason.body.message}"`);
      });

      expect(response, "status is not correct").to.have.property('status', AppStatus.APPROVED);
      expect(response, "name is not correct").to.have.property('name', application.name);
      expect(response, "display name is not correct").to.have.property('displayName', application.displayName ?? application.name);
      expect(response, "internal name is not set").to.have.property('internalName');
      expect(response, "credentials are not correct").to.have.property('credentials').that.deep.includes(application.credentials);

      const aclProfileName: string = response.internalName;

      await verifyAclProfile(setup.environment1, aclProfileName, null);
      await verifyAclProfile(setup.environment2, aclProfileName, null);

      const queueName: string = response.internalName;

      await verifyMessageQueue(setup.environment1, queueName, null);
      await verifyMessageQueue(setup.environment2, queueName, null);

      const restDeliveryPointName: string = response.internalName;

      await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
      await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, null);
    });

    it("should create an application with API product", async function () {

      this.slow(5000);

      const application: App = {
        name: applicationName,
        apiProducts: [setup.apiProduct1.name],
        attributes: [{ name: "language", value: "DE,EN" }],
        credentials: { expiresAt: -1 },
      }

      const response = await AppsService.createDeveloperApp(setup.organizationName, developerName, application).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect.fail(`failed to create developer application; error="${reason.body.message}"`);
      });

      expect(response, "status is not correct").to.have.property('status', AppStatus.APPROVED);
      expect(response, "name is not correct").to.have.property('name', application.name);
      expect(response, "display name is not correct").to.have.property('displayName', application.displayName ?? application.name);
      expect(response, "internal name is not set").to.have.property('internalName');
      expect(response, "consumer key is not set").to.have.nested.property('credentials.secret.consumerKey');
      expect(response, "consumer secret is not set").to.have.nested.property('credentials.secret.consumerSecret');

      const aclProfileName: string = response.internalName;
      const aclProfile: AclProfile = {
        pubTopicExceptions: ["say/hello/EN", "say/hello/DE"],
        subTopicExceptions: ["say/hello/EN", "say/hello/DE"],
      }

      await verifyAclProfile(setup.environment1, aclProfileName, aclProfile);
      await verifyAclProfile(setup.environment2, aclProfileName, null);

      const queueName: string = response.internalName;

      await verifyMessageQueue(setup.environment1, queueName, null);
      await verifyMessageQueue(setup.environment2, queueName, null);

      const restDeliveryPointName: string = response.internalName;

      await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
      await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, null);
    });

    it("should create an application with multiple API products", async function () {

      this.slow(5000);

      const application: App = {
        name: applicationName,
        apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
        credentials: { expiresAt: -1 },
      }

      const response = await AppsService.createDeveloperApp(setup.organizationName, developerName, application).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect.fail(`failed to create developer application; error="${reason.body.message}"`);
      });

      expect(response, "status is not correct").to.have.property('status', AppStatus.APPROVED);
      expect(response, "name is not correct").to.have.property('name', application.name);
      expect(response, "display name is not correct").to.have.property('displayName', application.displayName ?? application.name);
      expect(response, "internal name is not set").to.have.property('internalName');
      expect(response, "consumer key is not set").to.have.nested.property('credentials.secret.consumerKey');
      expect(response, "consumer secret is not set").to.have.nested.property('credentials.secret.consumerSecret');

      const aclProfileName: string = response.internalName;
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

      const queueName: string = response.internalName;

      await verifyMessageQueue(setup.environment1, queueName, null);
      await verifyMessageQueue(setup.environment2, queueName, null);

      const restDeliveryPointName: string = response.internalName;

      await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, null);
      await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, null);
    });

    it("should create an application with API product and web hook", async function () {

      this.slow(5000);

      const application: App = {
        name: applicationName,
        apiProducts: [setup.apiProduct1.name],
        attributes: [{ name: "language", value: "EN" }],
        webHooks: [setup.webHook1],
        credentials: { expiresAt: -1 },
      }

      const response = await AppsService.createDeveloperApp(setup.organizationName, developerName, application).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect.fail(`failed to create developer application; error="${reason.body.message}"`);
      });

      expect(response, "status is not correct").to.have.property('status', AppStatus.APPROVED);
      expect(response, "name is not correct").to.have.property('name', application.name);
      expect(response, "display name is not correct").to.have.property('displayName', application.displayName ?? application.name);
      expect(response, "internal name is not set").to.have.property('internalName');
      expect(response, "consumer key is not set").to.have.nested.property('credentials.secret.consumerKey');
      expect(response, "consumer secret is not set").to.have.nested.property('credentials.secret.consumerSecret');

      const aclProfileName: string = response.internalName;
      const aclProfile: AclProfile = {
        pubTopicExceptions: ["say/hello/EN"],
        subTopicExceptions: ["say/hello/EN"],
      }

      await verifyAclProfile(setup.environment1, aclProfileName, aclProfile);
      await verifyAclProfile(setup.environment2, aclProfileName, null);

      const queueName: string = response.internalName;
      const queue: Queue = {
        accessType: Queue.accessType.EXCLUSIVE,
        maxTimeToLive: 86400,
      }

      await verifyMessageQueue(setup.environment1, queueName, queue);
      await verifyMessageQueue(setup.environment2, queueName, null);

      const restDeliveryPointName: string = response.internalName;
      const restDeliveryPoint = createRestDeliveryPointFromWebHook(setup.webHook1);

      await verifyRestDeliveryPoint(setup.environment1, restDeliveryPointName, restDeliveryPoint);
      await verifyRestDeliveryPoint(setup.environment2, restDeliveryPointName, null);
    });

    it("should not create an application if the user is not authorized", async function () {

      const application: App = {
        name: applicationName,
        apiProducts: [setup.apiProduct1.name],
        credentials: { expiresAt: -1 },
      }

      PlatformAPIClient.setManagementUser();

      let isRejected = false;
      await AppsService.createDeveloperApp(setup.organizationName, developerName, application).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect(reason.status, `status is not correct`).to.be.oneOf([401]);
        isRejected = true;
      });
      expect(isRejected, "application service must reject the request").to.be.true;
    });

    it("should not create an application if the name is already used", async function () {

      const application: App = {
        name: applicationName,
        apiProducts: [setup.apiProduct1.name],
        credentials: { expiresAt: -1 },
      }

      await AppsService.createDeveloperApp(setup.organizationName, developerName, application);

      let isRejected = false;
      await AppsService.createDeveloperApp(setup.organizationName, developerName, application).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect(reason.status, `status is not correct`).to.be.oneOf([422]);
        isRejected = true;
      });
      expect(isRejected, "application service must reject the request").to.be.true;
    });

    it("should not create an application if the API product is unknown", async function () {

      const application: App = {
        name: applicationName,
        apiProducts: ["unknown"],
        credentials: { expiresAt: -1 },
      }

      let isRejected = false;
      await AppsService.createDeveloperApp(setup.organizationName, developerName, application).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect(reason.status, `status is not correct`).to.be.oneOf([422]);
        isRejected = true;
      });
      expect(isRejected, "application service must reject the request").to.be.true;
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

      let isRejected = false;
      await AppsService.createDeveloperApp(setup.organizationName, developerName, application).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect(reason.status, `status is not correct`).to.be.oneOf([422]);
        isRejected = true;
      });
      expect(isRejected, "application service must reject the request").to.be.true;
    });

    afterEach(async function () {
      PlatformAPIClient.setApiUser();
      await AppsService.deleteDeveloperApp(setup.organizationName, developerName, applicationName).catch(() => { });
    });

  });
});