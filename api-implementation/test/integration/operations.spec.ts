import "mocha";
import * as chai from "chai";
const expect = chai.expect;
import path = require("path");
import { RequestInit } from "node-fetch";
import { UserRegistry, getMandatoryEnvVarValue, getOptionalEnvVarValue, PlatformRequestHelper, PlatformResponseHelper, LoggingHelper } from "../lib/test.helpers";
import { PlatformManagementHelper } from "../lib/platform-management";

const enableLoggingEnvVar: string = getOptionalEnvVarValue('APIM_INTEGRATION_TEST_ENABLE_LOGGING');
let logging: LoggingHelper = new LoggingHelper(enableLoggingEnvVar != null && enableLoggingEnvVar.toLowerCase() == "true" ? true : false);
// logging.setLogging(true);
const scriptName: string = path.basename(__filename);
logging.logMessage(scriptName, ">>> initializing ...");
const testEnv = {
  SCRIPT_NAME: scriptName,
  PROJECT_HOME: getMandatoryEnvVarValue(scriptName, 'APIM_SOLACE_PLATFORM_API_PROJECT_HOME'),
  WORKING_DIR: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_WORKING_DIR'),
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
  ENABLE_LOGGING: getOptionalEnvVarValue('APIM_INTEGRATION_TEST_ENABLE_LOGGING') != null ? true : false
}
logging.logMessage(scriptName, `testEnv = ${JSON.stringify(testEnv, null, 2)}`);
const userRegistry: UserRegistry = require(testEnv.FILE_USER_REGISTRY);
logging.logMessage(scriptName, `userRegistry = ${JSON.stringify(userRegistry, null, 2)}`);
logging.logMessage(scriptName, ">>> success.");

describe(`${scriptName}`, () => {
  // const testId: string = "platformManagement";
  // before("initializing test", async()=>{
  // });
  // after("teardown test", async()=>{
  //   console.log('>>> teardown ...');
  //   console.log('>>> success.');
  // });

  context("tests operations", () => {
    const platformManagementRequest: PlatformRequestHelper = new PlatformRequestHelper(testEnv.PLATFORM_PROTOCOL, testEnv.PLATFORM_HOST, testEnv.PLATFORM_PORT, testEnv.PLATFORM_ADMIN_USER, testEnv.PLATFORM_ADMIN_PASSWORD);
    const org1Name = "org1";
    const org2Name = "org2";
    const devEnvName = "dev-env";
    const prodEnvName = "prod-env";
    const noMqttEnvName = "no-mqtt-env";
    const platformApiRequestOrg1: PlatformRequestHelper = new PlatformRequestHelper(testEnv.PLATFORM_PROTOCOL, testEnv.PLATFORM_HOST, testEnv.PLATFORM_PORT, "org1_admin_user", userRegistry.org1_admin_user);
    const platformApiRequestOrg2: PlatformRequestHelper = new PlatformRequestHelper(testEnv.PLATFORM_PROTOCOL, testEnv.PLATFORM_HOST, testEnv.PLATFORM_PORT, "org2_admin_user", userRegistry.org2_admin_user);
    const platformManagement: PlatformManagementHelper = new PlatformManagementHelper(platformManagementRequest, logging);
    let request: RequestInit = null;
    let response: PlatformResponseHelper = null;
    let body = null;

    before(async() => {
      let success: boolean = await platformManagement.deleteAllOrgs();
      expect(success, "deleting organizations").to.be.true;
    });

    it("should create two orgs", async() => {
      let success = await platformManagement.createOrg(org1Name);
      expect(success).to.be.true;      
      success = await platformManagement.createOrg(org2Name);
      expect(success).to.be.true; 
      request = {
          method: "GET"
        };
      response = await platformManagementRequest.fetch("organizations", request);
      logging.logResponse(`get all orgs`, response);
      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(2);
    });

    it("should handle invalid or missing token", async() => {
      // missing token
      request = {
        method: "PUT"
      };
      response = await platformApiRequestOrg1.fetch(`${org1Name}/token`, request, PlatformRequestHelper.ContentTypeTextPlain);
      logging.logResponse(`put token ${org1Name}, missing`, response);
      expect(response.status).to.equal(400);
      // empty token
      request = {
        method: "PUT",
        body: ""
      };
      response = await platformApiRequestOrg1.fetch(`${org1Name}/token`, request, PlatformRequestHelper.ContentTypeTextPlain);
      logging.logResponse(`put token ${org1Name}, empty`, response);
      expect(response.status).to.equal(400);
      // invalid token
      request = {
        method: "PUT",
        body: "xxxx"
      };
      response = await platformApiRequestOrg1.fetch(`${org1Name}/token`, request, PlatformRequestHelper.ContentTypeTextPlain);
      logging.logResponse(`put token ${org1Name}, invalid`, response);
      expect(response.status).to.equal(400);
    });


    it("should add token to two orgs", async() => {
      request = {
        method: "PUT",
        body: testEnv.SOLACE_CLOUD_TOKEN
      };

      response = await platformApiRequestOrg1.fetch(`${org1Name}/token`, request, PlatformRequestHelper.ContentTypeTextPlain);
      logging.logResponse(`put token ${org1Name}`, response);
      expect(response.status).to.equal(201);

      response = await platformApiRequestOrg2.fetch(`${org2Name}/token`, request, PlatformRequestHelper.ContentTypeTextPlain);
      logging.logResponse(`put token ${org2Name}`, response);
      expect(response.status).to.equal(201);

    });

    it("should add environments to orgs", async() => {
      let envNames = [ devEnvName, prodEnvName, noMqttEnvName];
      let serviceIds = [ testEnv.DEV_SERVICE_ID, testEnv.PROD_SERVICE_ID, testEnv.NO_MQTT_SERVICE_ID];
      // org1
      for (let i=0; i < envNames.length; i++) {
        let envName = envNames[i];
        let serviceId = serviceIds[i];
        body = {
          name: envName,
          description: `description of ${envName}`,
          serviceId: serviceId
        }
        request = {
          method: "POST",
          body: JSON.stringify(body, null, 2)
        };
        response = await platformApiRequestOrg1.fetch(`${org1Name}/environments`, request, PlatformRequestHelper.ContentTypeApplicationJson);
        logging.logResponse(`add env ${envName} to ${org1Name}`, response);
        expect(response.status).to.equal(201);
        // get the full env
        request = { method: "GET" };
        response = await platformApiRequestOrg1.fetch(`${org1Name}/environments/${envName}`, request, PlatformRequestHelper.ContentTypeApplicationJson);
        logging.logResponse(`env ${envName} for ${org1Name}`, response);
        expect(response.status).to.equal(200);

      }
      // org2
      for (let i=0; i < envNames.length; i++) {
        let envName = envNames[i];
        let serviceId = serviceIds[i];
        body = {
          name: envName,
          description: `description of ${envName}`,
          serviceId: serviceId
        }
        request = {
          method: "POST",
          body: JSON.stringify(body, null, 2)
        };
        response = await platformApiRequestOrg2.fetch(`${org2Name}/environments`, request, PlatformRequestHelper.ContentTypeApplicationJson);
        logging.logResponse(`add env ${envName} to ${org2Name}`, response);
        expect(response.status).to.equal(201);  
        // get the full env
        request = { method: "GET" };
        response = await platformApiRequestOrg2.fetch(`${org2Name}/environments/${envName}`, request, PlatformRequestHelper.ContentTypeApplicationJson);
        logging.logResponse(`env ${envName} for ${org2Name}`, response);
        expect(response.status).to.equal(200);

      }

    });

    it("should get the history", async() => {
        request = { method: "GET" };
        response = await platformApiRequestOrg1.fetch(`${org1Name}/history`, request);
        logging.logResponse(`history for ${org1Name}`, response);
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response = await platformApiRequestOrg2.fetch(`${org1Name}/history`, request);
        logging.logResponse(`history for ${org2Name}`, response);
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

      });

  });

});
