import "mocha";
import * as chai from "chai";
const expect = chai.expect;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
import path from 'path';
import _ from 'lodash';

import { UserRegistry, getMandatoryEnvVarValue, getOptionalEnvVarValue, AsyncAPIHelper, Developer, ExpectDiff, getExpectEqualDiff, TestLogger, TestContext, getExpectContainedDiff } from "../lib/test.helpers";
import { isInstanceOfApiError, PlatformAPIClient, ApiPermissions, createDefaultCredentials } from '../lib/api.helpers';
import { PlatformManagementService } from '../lib/generated/openapi/services/PlatformManagementService';
import type { Organization } from '../lib/generated/openapi/models/Organization';

const enableLoggingEnvVar: string = getOptionalEnvVarValue('APIM_INTEGRATION_TEST_ENABLE_LOGGING');
TestLogger.setLogging(enableLoggingEnvVar != null && enableLoggingEnvVar.toLowerCase() == "true" ? true : false);
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// TestLogger.setLogging(false);
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const scriptName: string = path.basename(__filename);
TestLogger.logMessage(scriptName, ">>> initializing ...");
const testEnv = {
  FILE_USER_REGISTRY: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_FILE_USER_REGISTRY'),
  SOLACE_CLOUD_URL: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_URL'),
  SOLACE_CLOUD_TOKEN: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_TOKEN'),
  SOLACE_EVENT_PORTAL_URL: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_EVENT_PORTAL_URL'),
  SOLACE_EVENT_PORTAL_TOKEN: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_EVENT_PORTAL_TOKEN'),
  DEV_SERVICE_ID: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_DEV_SERVICE_ID'),
  PROD_SERVICE_ID: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_PROD_SERVICE_ID'),
  NO_MQTT_SERVICE_ID: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_NO_MQTT_SERVICE_ID'),
  ORG_NAME: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_ORG_NAME'),
  API_SPEC_MAINTENANCE_FILE: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_UC_ELEVATOR_CO_API_SPEC_MAINTENANCE_FILE'),
  DEVELOPERS_FILE: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_DEVELOPERS_FILE'),  
}
TestLogger.logTestEnv(scriptName, testEnv);
const userRegistry: UserRegistry = require(testEnv.FILE_USER_REGISTRY);
TestLogger.logMessage(scriptName, `userRegistry = ${JSON.stringify(userRegistry, null, 2)}`);
TestLogger.logMessage(scriptName, ">>> success.");

describe(`${scriptName}`, () => {

  context(`${scriptName}`, () => {
    
    const orgName = testEnv.ORG_NAME;

    before(async() => {
      TestContext.newItId();
      try {
        PlatformAPIClient.setManagementUser();
        await PlatformManagementService.deleteOrganization(orgName);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `deleting org=${orgName}`;
        expect(e.status, `${TestLogger.createTestFailMessage(message)}ApiError.status`).to.be.oneOf([201, 404]);
      }
    });

    after(async() => {
      // make sure the broker is de-provisioned again
      TestContext.newItId();
      try {
        PlatformAPIClient.setManagementUser();
        await PlatformManagementService.deleteOrganization(orgName);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `deleting org=${orgName}`;
        expect(e.status, `${TestLogger.createTestFailMessage(message)}ApiError.status`).to.be.oneOf([201, 404]);
      }
    });

    beforeEach(() => {
      TestContext.newItId();
    });

    // not implemented in 0.0.11
    xit(`${scriptName}: should create org with cloud & event portal, same url & token`, async() => {
      PlatformAPIClient.setManagementUser();
      let response: Organization;
      let request: Organization = {
        name: orgName,
        "cloud-token": {
          cloud: {
            baseUrl: testEnv.SOLACE_CLOUD_URL,
            token: testEnv.SOLACE_CLOUD_TOKEN
          },
          eventPortal: {
            baseUrl: testEnv.SOLACE_CLOUD_URL,
            token: testEnv.SOLACE_CLOUD_TOKEN

          }
        }
      }
      try {
        response = await PlatformManagementService.createOrganization(request);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `creating org=${orgName}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
      expect(response.name, `${TestLogger.createTestFailMessage("name not equal")}`).to.equal(orgName);
    });

    it(`${scriptName}: should create org without any token`, async() => {
      PlatformAPIClient.setManagementUser();
      let response: Organization;
      let request: Organization = {
        name: orgName
      }
      try {
        response = await PlatformManagementService.createOrganization(request);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `creating org=${orgName}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
      expect(response.name, `${TestLogger.createTestFailMessage("name not equal")}`).to.equal(orgName);
    });

    it(`${scriptName}: should patch org with cloud & event portal, different url & token`, async() => {
      PlatformAPIClient.setManagementUser();
      let response: Organization;
      let request: Organization = {
        name: orgName,
        "cloud-token": {
          cloud: {
            baseUrl: testEnv.SOLACE_CLOUD_URL,
            token: testEnv.SOLACE_CLOUD_TOKEN
          },
          eventPortal: {
            baseUrl: testEnv.SOLACE_EVENT_PORTAL_URL,
            token: testEnv.SOLACE_EVENT_PORTAL_TOKEN

          }
        }
      }
      try {
        response = await PlatformManagementService.updateOrganization(orgName, request);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `creating org=${orgName}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
      expect(response.name, `${TestLogger.createTestFailMessage("name not equal")}`).to.equal(orgName);
    });

  });

});
