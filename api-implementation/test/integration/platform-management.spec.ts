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
  PLATFORM_ADMIN_USER: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_ADMIN_USER'),
  PLATFORM_ADMIN_PASSWORD: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_ADMIN_PASSWORD'),
  FILE_USER_REGISTRY: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_FILE_USER_REGISTRY'),
  SOLACE_CLOUD_TOKEN: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_TOKEN'),
  ENABLE_LOGGING: getOptionalEnvVarValue('APIM_INTEGRATION_TEST_ENABLE_LOGGING') != null ? true : false
}
logging.logMessage(scriptName, `testEnv = ${JSON.stringify(testEnv, null, 2)}`);
const userRegistry: UserRegistry = require(testEnv.FILE_USER_REGISTRY);
logging.logMessage(scriptName, `userRegistry = ${JSON.stringify(userRegistry, null, 2)}`);
logging.logMessage(scriptName, ">>> success.");

describe('platformManagement test', () => {
  // const testId: string = "platformManagement";
  // before("initializing test", async()=>{
  // });
  // after("teardown test", async()=>{
  //   console.log('>>> teardown ...');
  //   console.log('>>> success.');
  // });

  context("tests platformManagement", () => {
    const platformManagementRequest: PlatformRequestHelper = new PlatformRequestHelper(testEnv.PLATFORM_ADMIN_USER, testEnv.PLATFORM_ADMIN_PASSWORD);
    const platformManagement: PlatformManagementHelper = new PlatformManagementHelper(platformManagementRequest, logging);
    let request: RequestInit = null;
    let response: PlatformResponseHelper = null;
    let body = null;
    const orgName = "org-1";


    beforeEach(async() => {
      let success: boolean = await platformManagement.deleteAllOrgs();
      expect(success, "deleting organizations").to.be.true;
    });

    it("should create/get/delete/get an org", async() => {
      const apiPath: string = "organizations";
      let request: RequestInit = null;
      let response: PlatformResponseHelper = null;
      let body = null;
      const orgName = "org-1";
      // create org
      body = {
        name: orgName
      }
      request = {
        method: "POST",
        body: JSON.stringify(body)
      };
      response = await platformManagementRequest.fetch(apiPath, request);
      logging.logResponse(`create org: ${body.name}`, response);
      expect(response.status, `create org: ${orgName}`).to.equal(201);
      // get org
      request = {
        method: "GET"
      };
      response = await platformManagementRequest.fetch(apiPath + "/" + orgName, request);
      logging.logResponse(`get org: ${orgName}`, response);
      expect(response.status, `get org ${orgName}`).to.equal(200);
      // delete org
      request = {
        method: "DELETE"
      };
      response = await platformManagementRequest.fetch(apiPath + "/" + orgName, request);
      logging.logResponse(`delete org: ${orgName}`, response);
      expect(response.status, `delete org ${orgName}`).to.equal(204);
      // get org
      request = {
        method: "GET"
      };
      response = await platformManagementRequest.fetch(apiPath + "/" + orgName, request);
      logging.logResponse(`get org: ${orgName}`, response);
      expect(response.status, `get org ${orgName}`).to.equal(404);
    });
    it("should not patch an org with bad token", async() => {
      let success = await platformManagement.createOrg(orgName);
      expect(success).to.be.true;      
      body = {
        name: orgName,
        token: ""
      }
      request = {
        method: "PATCH",
        body: JSON.stringify(body)
      };
      response = await platformManagementRequest.fetch("organizations/" + orgName, request);
      logging.logResponse(`patch org with empty token`, response);
      expect(response.status, `patch org with empty token`).to.equal(400);

      body = {
        name: orgName,
        token: "xx"
      }
      request = {
        method: "PATCH",
        body: JSON.stringify(body)
      };
      response = await platformManagementRequest.fetch("organizations/" + orgName, request);
      logging.logResponse(`patch org with bad token`, response);
      expect(response.status, `patch org with bad token`).to.equal(400);
    });
    it("should patch an org with good token", async() => {
      let success = await platformManagement.createOrg(orgName);
      expect(success).to.be.true;      
      body = {
        name: orgName,
        token: testEnv.SOLACE_CLOUD_TOKEN
      }
      request = {
        method: "PATCH",
        body: JSON.stringify(body)
      };
      response = await platformManagementRequest.fetch("organizations/" + orgName, request);
      logging.logResponse(`patch org with good token`, response);
      expect(response.status).to.equal(200);
    });

  });

});
