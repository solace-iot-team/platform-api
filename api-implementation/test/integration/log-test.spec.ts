import "mocha";
import * as chai from "chai";
const expect = chai.expect;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
import path from 'path';

import { UserRegistry, getMandatoryEnvVarValue, getOptionalEnvVarValue, TestLogger, TestContext } from "../lib/test.helpers";
import { isInstanceOfApiError, PlatformAPIClient } from '../lib/api.helpers';
import { AdministrationService } from '../lib/generated/openapi/services/AdministrationService';
import type { Organization } from '../lib/generated/openapi/models/Organization';


const enableLoggingEnvVar: string = getOptionalEnvVarValue('APIM_INTEGRATION_TEST_ENABLE_LOGGING');
TestLogger.setLogging(enableLoggingEnvVar != null && enableLoggingEnvVar.toLowerCase() == "true" ? true : false);
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// TestLogger.setLogging(false);
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const scriptName: string = path.basename(__filename);
TestLogger.logMessage(scriptName, ">>> initializing ...");
const testEnv = {
  ORG_NAME: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_ORG_NAME'),
}
TestLogger.logTestEnv(scriptName, testEnv);
TestLogger.logMessage(scriptName, ">>> success.");

describe(`${scriptName}`, () => {

  context(`${scriptName}`, () => {
    
    const orgName = testEnv.ORG_NAME;

    before(async() => {
      TestContext.newItId();
      try {
        PlatformAPIClient.setManagementUser();
        await AdministrationService.deleteOrganization({ organizationName: orgName });
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `deleting org=${orgName}`;
        expect(e.status, `${TestLogger.createTestFailMessage(message)}ApiError.status`).to.be.oneOf([201, 404]);
      }
    });

    after(async() => {
      TestContext.newItId();
      try {
        PlatformAPIClient.setManagementUser();
        await AdministrationService.deleteOrganization({ organizationName: orgName });
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `deleting org=${orgName}`;
        expect(e.status, `${TestLogger.createTestFailMessage(message)}ApiError.status`).to.be.oneOf([201, 404]);
      }
    });

    beforeEach(() => {
      TestContext.newItId();
    });

    it(`${scriptName}: should create org`, async() => {
      let response: Organization;
      let request: Organization = {
        name: orgName
      }
      try {
        PlatformAPIClient.setManagementUser();
        response = await AdministrationService.createOrganization({ requestBody: request });
        expect(response.name).to.equal(orgName);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `creating org=${orgName}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
      let message = `testing fail message for org=${orgName}`;
      expect(true, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
    });

    it(`${scriptName}: should handle create org with empty name error`, async() => {
      let response: Organization;
      let request: Organization = {
        name: "" // to force ApiError
      }
      try {
        PlatformAPIClient.setManagementUser();
        response = await AdministrationService.createOrganization({ requestBody: request });
        expect(response.name).to.equal(orgName);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `creating org with empty name error, org=${orgName}`;
        let expectMessage = `${TestLogger.createTestFailMessage(message)}`; 
        expect(e.status, `${expectMessage}ApiError.status`).to.be.oneOf([400]);
        expect(e.body, `${expectMessage}ApiError.body does not exist`).to.exist;
        expect(e.body.errors, `${expectMessage}ApiError.body does not exist`).to.exist;
        let errorsString = JSON.stringify(e.body.errors);
        expect(errorsString, `${expectMessage}ApiError.body.errors incorrect`).to.contain("body.name");
      }
      let message = `testing fail message for org=${orgName}`;
      expect(true, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
    });

  });

});
