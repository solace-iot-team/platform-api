import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import type { App } from "../../lib/generated/openapi";
import { ApiError, AppsService } from "../../lib/generated/openapi";
import * as setup from './setup';
import {
  verifyAclProfile,
  verifyMessageQueue,
  verifyRestDeliveryPoint
} from './test.helpers';

const scriptName: string = path.basename(__filename);

describe("apps", function () {
  describe(scriptName, function () {

    const developerName: string = setup.developer1.userName;
    const applicationName: string = `${developerName}-app`;

    it("should delete an application", async function () {

      this.slow(2000);

      let application: App = {
        name: applicationName,
        displayName: "display name for app",
        apiProducts: [],
        credentials: { expiresAt: -1 },
      }
      application = await AppsService.createDeveloperApp(setup.organizationName, developerName, application);

      await AppsService.deleteDeveloperApp(setup.organizationName, developerName, applicationName).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect.fail(`failed to delete developer application; error="${reason.body.message}"`);
      });
    });

    it("should delete an application with API products", async function () {

      this.slow(2000);

      let application: App = {
        name: applicationName,
        displayName: "display name for app",
        apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name],
        credentials: { expiresAt: -1 },
      }
      application = await AppsService.createDeveloperApp(setup.organizationName, developerName, application);

      await AppsService.deleteDeveloperApp(setup.organizationName, developerName, applicationName).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect.fail(`failed to delete developer application; error="${reason.body.message}"`);
      });

      const aclProfileName: string = application.internalName;

      await verifyAclProfile(setup.environment1, aclProfileName, null);
      await verifyAclProfile(setup.environment2, aclProfileName, null);
    });


    it("should delete an application with API products and web hooks", async function () {

      this.slow(2000);

      let application: App = {
        name: applicationName,
        displayName: "display name for app",
        apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
        webHooks: [setup.webHook1, setup.webHook2],
        credentials: { expiresAt: -1 },
      }
      application = await AppsService.createDeveloperApp(setup.organizationName, developerName, application);

      await AppsService.deleteDeveloperApp(setup.organizationName, developerName, applicationName).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect.fail(`failed to delete developer application; error="${reason.body.message}"`);
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
      application = await AppsService.createDeveloperApp(setup.organizationName, developerName, application);

      PlatformAPIClient.setManagementUser();

      let isRejected = false;
      await AppsService.deleteDeveloperApp(setup.organizationName, developerName, applicationName).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect(reason.status, `status is not correct`).to.be.oneOf([401]);
        isRejected = true;
      });
      expect(isRejected, "application service must reject the request").to.be.true;
    });

    it("should not delete an application that does not exist", async function () {

      let isRejected = false;
      await AppsService.deleteDeveloperApp(setup.organizationName, developerName, "unknown").catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect(reason.status, `status is not correct`).to.be.oneOf([404]);
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