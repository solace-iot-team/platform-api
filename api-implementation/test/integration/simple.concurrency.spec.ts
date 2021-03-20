import "mocha";
import * as chai from "chai";
const expect = chai.expect;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
import path from 'path';
import _ from 'lodash';

import { getBaseUrl, UserRegistry, getMandatoryEnvVarValue, getOptionalEnvVarValue, PlatformRequestHelper, AsyncAPIHelper, Developer, getObjectDifferences, ExpectDiff, getExpectEqualDiff, TestLogger, TestContext, getExpectContainedDiff } from "../lib/test.helpers";
import { PlatformManagementHelper } from "../lib/platform-management";
import { isInstanceOfApiError, PlatformAPIClient, ApiPermissions, createDefaultCredentials } from '../lib/api.helpers';
import { PlatformManagementService } from '../lib/generated/openapi/services/PlatformManagementService';
import type { Organization } from '../lib/generated/openapi/models/Organization';
import type { History } from '../lib/generated/openapi/models/History';
import { APIProduct, APIProductPatch, ApiProductsService, ApisService, App, AppEnvironment, AppListItem, AppPatch, AppResponse, AppsService, AppStatus, Credentials, DevelopersService, Endpoint, Environment, EnvironmentResponse, EnvironmentsService, ManagementService, Protocol, WebHook } from "../lib/generated/openapi";

const enableLoggingEnvVar: string = getOptionalEnvVarValue('APIM_INTEGRATION_TEST_ENABLE_LOGGING');
TestLogger.setLogging(enableLoggingEnvVar != null && enableLoggingEnvVar.toLowerCase() == "true" ? true : false);
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// TestLogger.setLogging(false);
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const scriptName: string = path.basename(__filename);
TestLogger.logMessage(scriptName, ">>> initializing ...");
const testEnv = {
  SCRIPT_NAME: scriptName,
  PROJECT_HOME: getMandatoryEnvVarValue(scriptName, 'APIM_SOLACE_PLATFORM_API_PROJECT_HOME'),
  WORKING_DIR: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_WORKING_DIR'),
  FILE_USER_REGISTRY: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_FILE_USER_REGISTRY'),
  SOLACE_CLOUD_TOKEN: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_TOKEN'),
  DEV_SERVICE_ID: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_DEV_SERVICE_ID'),
  PROD_SERVICE_ID: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_PROD_SERVICE_ID'),
  NO_MQTT_SERVICE_ID: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_NO_MQTT_SERVICE_ID'),
  ORG_NAME: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_ORG_NAME'),
  API_SPEC_MAINTENANCE_FILE: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_UC_ELEVATOR_CO_API_SPEC_MAINTENANCE_FILE'),
  DEVELOPERS_FILE: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_DEVELOPERS_FILE'),  
  IS_BOOTSTRAP_DEMO: getOptionalEnvVarValue('APIM_INTEGRATION_TEST_IS_BOOTSTRAP_DEMO') != null ? true : false
}
TestLogger.logTestEnv(scriptName, testEnv);
const userRegistry: UserRegistry = require(testEnv.FILE_USER_REGISTRY);
TestLogger.logMessage(scriptName, `userRegistry = ${JSON.stringify(userRegistry, null, 2)}`);
TestLogger.logMessage(scriptName, ">>> success.");

describe(`${scriptName}`, () => {

  context(`${scriptName}:simple concurrency`, () => {
    
    const orgName = testEnv.ORG_NAME;
    const apiNameMaintenance: string = "api-maintenance";
    const apiSpecMaintenance: string = AsyncAPIHelper.loadYamlFileAsJsonString(testEnv.API_SPEC_MAINTENANCE_FILE);
    const apiMaintenacePermissions: ApiPermissions = [
      // {resource_region_id}/{equipment_type}/{event_type}/{resource_type}/{resource_id}
      { name: 'resource_region_id', value: 'fr, de, us-east, us-west' }, 
      { name: 'resource_type', value: 'elev-make-1, elev-make-2' },
      { name: 'resource_id', value: '*' }
    ]
    // development 
    const devEnvName = "devEnv";
    const devEnv: Environment = {
      name: `${devEnvName}`,
      description: `description of ${devEnvName}`,
      serviceId: testEnv.DEV_SERVICE_ID
    };
    const apiProductNameMaintenanceDevelopment: string = "elevator-maintenance-development";
    const apiProductMaintenanceDevelopmentApprovalType: APIProduct.approvalType = APIProduct.approvalType.AUTO;
    // production
    const prodEnvName = "prodEnv";
    const prodEnv: Environment = {
      name: `${prodEnvName}`,
      description: `description of ${prodEnvName}`,
      serviceId: testEnv.PROD_SERVICE_ID
    };
    const apiProductNameMaintenanceProduction: string = "elevator-maintenance-production";
    const apiProductMaintenanceProductionApprovalType: APIProduct.approvalType = APIProduct.approvalType.MANUAL;
    // developers
    const _developers: Array<Developer> = require(testEnv.DEVELOPERS_FILE);
    let developers: Array<Developer> = [];
    for(let developer of _developers) {      
      developer.userName = developer.userName + '@' + orgName;
      developers.push(developer);
    }
    const developerAppNameMaintenanceDevelopment: string = "elevator-maintenance-development";
    const developerAppNameMaintenanceProduction: string = "elevator-maintenance-production";

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

    it(`${scriptName}: should create org`, async() => {
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

    it(`${scriptName}: should add token to org`, async() => {
      PlatformAPIClient.setApiUser();
      let response: string;
      let request: string = testEnv.SOLACE_CLOUD_TOKEN;
      try {
        response = await ManagementService.updateToken(orgName, request);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `update token for org=${orgName}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
      expect(response, `${TestLogger.createTestFailMessage("token not equal")}`).to.equal(testEnv.SOLACE_CLOUD_TOKEN);
    });


  });

});
