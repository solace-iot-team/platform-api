import "mocha";
import * as chai from "chai";
const expect = chai.expect;
import path = require("path");
import { RequestInit } from "node-fetch";
import { UserRegistry, getMandatoryEnvVarValue, getOptionalEnvVarValue, PlatformRequestHelper, PlatformResponseHelper, TestLogger, TestContext } from "../lib/test.helpers";
import { PlatformManagementHelper } from "../lib/platform-management";

const enableLoggingEnvVar: string = getOptionalEnvVarValue('APIM_INTEGRATION_TEST_ENABLE_LOGGING');
TestLogger.setLogging(enableLoggingEnvVar != null && enableLoggingEnvVar.toLowerCase() == "true" ? true : false);
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// TestLogger.setLogging(false);
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const scriptName: string = path.basename(__filename);
TestLogger.logMessage(scriptName, ">>> initializing ...");
const testEnv = {
  PLATFORM_PROTOCOL: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_PROTOCOL'),
  PLATFORM_HOST: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_HOST'),
  PLATFORM_PORT: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_PORT'),
  PLATFORM_ADMIN_USER: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_ADMIN_USER'),
  PLATFORM_ADMIN_PASSWORD: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_ADMIN_PASSWORD'),
  FILE_USER_REGISTRY: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_FILE_USER_REGISTRY'),
  SOLACE_CLOUD_TOKEN: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_TOKEN'),
  DEV_SERVICE_ID: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_DEV_SERVICE_ID'),
  PROD_SERVICE_ID: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_PROD_SERVICE_ID'),
  NO_MQTT_SERVICE_ID: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_NO_MQTT_SERVICE_ID'),
}
TestLogger.logTestEnv(scriptName, testEnv);
const userRegistry: UserRegistry = require(testEnv.FILE_USER_REGISTRY);
TestLogger.logMessage(scriptName, `userRegistry = ${JSON.stringify(userRegistry, null, 2)}`);
TestLogger.logMessage(scriptName, ">>> success.");

describe(`${scriptName}`, () => {

  context(`${scriptName}`, () => {
    const platformManagementRequest: PlatformRequestHelper = new PlatformRequestHelper(testEnv.PLATFORM_PROTOCOL, testEnv.PLATFORM_HOST, testEnv.PLATFORM_PORT, testEnv.PLATFORM_ADMIN_USER, testEnv.PLATFORM_ADMIN_PASSWORD);
    const org1Name = "org1";
    const org2Name = "org2";
    const devEnvName = "dev-env";
    const prodEnvName = "prod-env";
    const noMqttEnvName = "no-mqtt-env";
    const platformApiRequestOrg1: PlatformRequestHelper = new PlatformRequestHelper(testEnv.PLATFORM_PROTOCOL, testEnv.PLATFORM_HOST, testEnv.PLATFORM_PORT, "org1_admin_user", userRegistry.org1_admin_user);
    const platformApiRequestOrg2: PlatformRequestHelper = new PlatformRequestHelper(testEnv.PLATFORM_PROTOCOL, testEnv.PLATFORM_HOST, testEnv.PLATFORM_PORT, "org2_admin_user", userRegistry.org2_admin_user);
    const platformManagement: PlatformManagementHelper = new PlatformManagementHelper(platformManagementRequest);
    let request: RequestInit = null;
    let response: PlatformResponseHelper = null;
    let body = null;

    before(async () => {
      let success: boolean = await platformManagement.deleteAllOrgs();
      expect(success, "deleting organizations").to.be.true;
    });

    beforeEach(() => {
      TestContext.newItId();
    });

    it(`${scriptName}: should create two orgs`, async () => {
      let success = await platformManagement.createOrg(org1Name);
      expect(success).to.be.true;
      success = await platformManagement.createOrg(org2Name);
      expect(success).to.be.true;
      request = {
        method: "GET"
      };
      response = await platformManagementRequest.fetch("organizations", request);
      TestLogger.logResponse(`get all orgs`, response);
      expect(response.status).to.equal(200);
      expect(response.body.length, 'number of all orgs').to.equal(2);
    });

    it(`${scriptName}: should handle invalid or missing token`, async () => {
      // missing token
      request = {
        method: "PUT"
      };
      response = await platformApiRequestOrg1.fetch(`${org1Name}/token`, request, PlatformRequestHelper.ContentTypeTextPlain);
      TestLogger.logResponse(`put token ${org1Name}, missing`, response);
      expect(response.status).to.equal(400);
      // empty token
      request = {
        method: "PUT",
        body: ""
      };
      response = await platformApiRequestOrg1.fetch(`${org1Name}/token`, request, PlatformRequestHelper.ContentTypeTextPlain);
      TestLogger.logResponse(`put token ${org1Name}, empty`, response);
      expect(response.status).to.equal(400);
      // invalid token
      request = {
        method: "PUT",
        body: "xxxx"
      };
      response = await platformApiRequestOrg1.fetch(`${org1Name}/token`, request, PlatformRequestHelper.ContentTypeTextPlain);
      TestLogger.logResponse(`put token ${org1Name}, invalid`, response);
      expect(response.status).to.equal(400);
    });

    it(`${scriptName}: should add token to two orgs`, async () => {
      request = {
        method: "PUT",
        body: testEnv.SOLACE_CLOUD_TOKEN
      };

      response = await platformApiRequestOrg1.fetch(`${org1Name}/token`, request, PlatformRequestHelper.ContentTypeTextPlain);
      TestLogger.logResponse(`put token ${org1Name}`, response);
      expect(response.status).to.equal(201);

      response = await platformApiRequestOrg2.fetch(`${org2Name}/token`, request, PlatformRequestHelper.ContentTypeTextPlain);
      TestLogger.logResponse(`put token ${org2Name}`, response);
      expect(response.status).to.equal(201);

    });

    it(`${scriptName}: should add environments to orgs`, async () => {
      // let envNames = [ devEnvName, prodEnvName, noMqttEnvName];
      let envNames = [devEnvName, prodEnvName];
      let serviceIds = [testEnv.DEV_SERVICE_ID, testEnv.PROD_SERVICE_ID, testEnv.NO_MQTT_SERVICE_ID];
      // org1
      for (let i = 0; i < envNames.length; i++) {
        let envName = envNames[i];
        let serviceId = serviceIds[i];
        body = {
          name: envName,
          description: `description of ${envName}`,
          serviceId: serviceId,
          exposedProtocols: [
            {
              name: "mqtt",
              version: "3.1.1"
            },
            {
              name: "http",
              version: "1.1"
            }
          ]
        }
        request = {
          method: "POST",
          body: JSON.stringify(body, null, 2)
        };
        response = await platformApiRequestOrg1.fetch(`${org1Name}/environments`, request, PlatformRequestHelper.ContentTypeApplicationJson);
        TestLogger.logResponse(`add env ${envName} to ${org1Name}`, response);
        expect(response.status).to.equal(201);
        // get the full env
        request = { method: "GET" };
        response = await platformApiRequestOrg1.fetch(`${org1Name}/environments/${envName}`, request, PlatformRequestHelper.ContentTypeApplicationJson);
        TestLogger.logResponse(`env ${envName} for ${org1Name}`, response);
        expect(response.status).to.equal(200);

      }
      // org2
      for (let i = 0; i < envNames.length; i++) {
        let envName = envNames[i];
        let serviceId = serviceIds[i];
        body = {
          name: envName,
          description: `description of ${envName}`,
          serviceId: serviceId,
          exposedProtocols: [
            {
              name: "mqtt",
              version: "3.1.1"
            },
            {
              name: "http",
              version: "1.1"
            }
          ]
        }
        request = {
          method: "POST",
          body: JSON.stringify(body, null, 2)
        };
        response = await platformApiRequestOrg2.fetch(`${org2Name}/environments`, request, PlatformRequestHelper.ContentTypeApplicationJson);
        TestLogger.logResponse(`add env ${envName} to ${org2Name}`, response);
        expect(response.status).to.equal(201);
        // get the full env
        request = { method: "GET" };
        response = await platformApiRequestOrg2.fetch(`${org2Name}/environments/${envName}`, request, PlatformRequestHelper.ContentTypeApplicationJson);
        TestLogger.logResponse(`env ${envName} for ${org2Name}`, response);
        expect(response.status).to.equal(200);

      }

    });

    it(`${scriptName}: should get the history`, async () => {
      request = { method: "GET" };
      response = await platformApiRequestOrg1.fetch(`${org1Name}/history`, request);
      TestLogger.logResponse(`history for ${org1Name}`, response);
      expect(response.status).to.equal(200);
      // expect(response.body.length).to.equal(3);
      expect(response.body.length).to.equal(2);

      response = await platformApiRequestOrg2.fetch(`${org1Name}/history`, request);
      TestLogger.logResponse(`history for ${org2Name}`, response);
      expect(response.status).to.equal(200);
      // expect(response.body.length).to.equal(3);
      expect(response.body.length).to.equal(2);
    });

  });

});
