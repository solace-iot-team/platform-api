import "mocha";
import * as chai from "chai";
const expect = chai.expect;
import path = require("path");
import { RequestInit } from "node-fetch";
import { UserRegistry, getMandatoryEnvVarValue, getOptionalEnvVarValue, PlatformRequestHelper, PlatformResponseHelper, TestLogger } from "../lib/test.helpers";
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
}
TestLogger.logTestEnv(scriptName, testEnv);
const userRegistry: UserRegistry = require(testEnv.FILE_USER_REGISTRY);
TestLogger.logMessage(scriptName, `userRegistry = ${JSON.stringify(userRegistry, null, 2)}`);
TestLogger.logMessage(scriptName, ">>> success.");

describe(`${scriptName}`, () => {

  context(`${scriptName}`, () => {
    const platformManagementRequest: PlatformRequestHelper = new PlatformRequestHelper(testEnv.PLATFORM_PROTOCOL, testEnv.PLATFORM_HOST, testEnv.PLATFORM_PORT, testEnv.PLATFORM_ADMIN_USER, testEnv.PLATFORM_ADMIN_PASSWORD);
    const platformManagement: PlatformManagementHelper = new PlatformManagementHelper(platformManagementRequest);
    const apiPath: string = "organizations";
    let request: RequestInit = null;
    let response: PlatformResponseHelper = null;
    let body = null;
    const orgName = "org-1";

    beforeEach(async() => {
      let success: boolean = await platformManagement.deleteAllOrgs();
      expect(success, "deleting organizations").to.be.true;
    });

    it(`${scriptName}: should create/get/delete/get an org`, async() => {
      // create org
      body = {
        name: orgName
      }
      request = {
        method: "POST",
        body: JSON.stringify(body)
      };
      response = await platformManagementRequest.fetch(apiPath, request);
      TestLogger.logResponse(`create org: ${body.name}`, response);
      expect(response.status, `create org: ${orgName}`).to.equal(201);
      // get org
      request = {
        method: "GET"
      };
      response = await platformManagementRequest.fetch(apiPath + "/" + orgName, request);
      TestLogger.logResponse(`get org: ${orgName}`, response);
      expect(response.status, `get org ${orgName}`).to.equal(200);
      // delete org
      request = {
        method: "DELETE"
      };
      response = await platformManagementRequest.fetch(apiPath + "/" + orgName, request);
      TestLogger.logResponse(`delete org: ${orgName}`, response);
      expect(response.status, `delete org ${orgName}`).to.equal(204);
      // get org
      request = {
        method: "GET"
      };
      response = await platformManagementRequest.fetch(apiPath + "/" + orgName, request);
      TestLogger.logResponse(`get org: ${orgName}`, response);
      expect(response.status, `get org ${orgName}`).to.equal(404);
    });

  });

});
