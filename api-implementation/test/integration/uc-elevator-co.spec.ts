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
TestLogger.logMessage(scriptName, `testEnv = ${JSON.stringify(testEnv, null, 2)}`);
const userRegistry: UserRegistry = require(testEnv.FILE_USER_REGISTRY);
TestLogger.logMessage(scriptName, `userRegistry = ${JSON.stringify(userRegistry, null, 2)}`);
TestLogger.logMessage(scriptName, ">>> success.");

describe(`${scriptName}`, () => {

  context(`${scriptName}`, () => {
    
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
      if(testEnv.IS_BOOTSTRAP_DEMO) return;
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

    it(`${scriptName}: should register dev service with org`, async() => {
      let response: Environment;
      let request: Environment = devEnv;
      try {
        response= await EnvironmentsService.createEnvironment(orgName, request);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `register dev service=${devEnvName} with org=${orgName}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
      expect(_.isEqual(devEnv, response), `${TestLogger.createTestFailMessage("response not equal")}`).to.be.true;
    });

    it(`${scriptName}: should register prod service with org`, async() => {
      let response: Environment;
      let request: Environment = prodEnv;
      try {
        response = await EnvironmentsService.createEnvironment(orgName, request);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `register prod service=${prodEnvName} with org=${orgName}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
      expect(_.isEqual(prodEnv, response), `${TestLogger.createTestFailMessage("response not equal")}`).to.be.true;
    });

    it(`${scriptName}: should get environments`, async() => {
      let response: Array<Environment>;
      try {
        response = await EnvironmentsService.listEnvironments(orgName);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `get envs for org='${orgName}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
      expect(response.length, `${TestLogger.createTestFailMessage("expected exactly 2 environments")}`).to.equal(2);
      expect(_.isEqual(devEnv, response[0]), `${TestLogger.createTestFailMessage("devEnv not equal")}`).to.be.true;
      expect(_.isEqual(prodEnv, response[1]), `${TestLogger.createTestFailMessage("prodEnv not equal")}`).to.be.true;
  });

    it(`${scriptName}: should get audit history`, async() => {
      let response: Array<History>;
      try {
        response = await ManagementService.listHistory(orgName);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `get audit history for org='${orgName}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }

        // TODO: expecting to see more history ...

      });

    it(`${scriptName}: should get dev environment`, async() => {
      let response: EnvironmentResponse;
      try {
        response = await EnvironmentsService.getEnvironment(orgName, devEnv.name);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `get dev env='${devEnv}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
        // TODO: could check if all mqtt endpoints have the correct name?
      });

    it(`${scriptName}: should get prod environment`, async() => {
      let response: EnvironmentResponse;
      try {
        response = await EnvironmentsService.getEnvironment(orgName, prodEnv.name);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `get prod env='${prodEnv}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
        // TODO: could check if all mqtt endpoints have the correct name?
      });

    it(`${scriptName}: should create api`, async() => {
      let response: string;
      try {
        response = await ApisService.createApi(orgName, apiNameMaintenance, apiSpecMaintenance);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `create api='${apiNameMaintenance}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
      expect(response, `${TestLogger.createTestFailMessage("response is not type object")}`).to.be.an('object');
      let parsedResponse: string = JSON.parse(JSON.stringify(response));
      expect(_.isEqual(JSON.parse(apiSpecMaintenance), parsedResponse), `${TestLogger.createTestFailMessage("response not equal to api spec")}`).to.be.true;
    });

    it(`${scriptName}: should create api product maintenance-development`, async() => {
      let response: APIProduct;
      let request: APIProduct = {
        name: `${apiProductNameMaintenanceDevelopment}`,
        displayName: `display name for ${apiProductNameMaintenanceDevelopment}`,
        description: `description for ${apiProductNameMaintenanceDevelopment}`,
        apis: [ apiNameMaintenance ],
        approvalType: apiProductMaintenanceDevelopmentApprovalType,
        attributes: apiMaintenacePermissions,
        environments: [ `${devEnvName}` ],
        protocols: [ { name: Protocol.name.MQTT, version: '3.1.1' } ],
        pubResources: [],
        subResources: []
      };
      try {
        response = await ApiProductsService.createApiProduct(orgName, request);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `org=${orgName}, create apiProduct='${apiProductNameMaintenanceDevelopment}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
      expect(_.isEqual(request, response), `${TestLogger.createTestFailMessage('response not equal to request')}`).to.be.true;
    });
    
    it(`${scriptName}: should add http protocol to api product maintenance-development`, async() => {
      // get current APIProduct
      let responseGet: APIProduct;
      try {
        responseGet = await ApiProductsService.getApiProduct(orgName, apiProductNameMaintenanceDevelopment);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `get apiProduct=${apiProductNameMaintenanceDevelopment}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
      let responsePatch: APIProduct;
      let requestPatch: APIProductPatch = {
        protocols: [ { name: Protocol.name.MQTT, version: '3.1.1' }, { name: Protocol.name.HTTP, version: '1.1'} ],
      }
      let expectedResponsePatch: APIProduct = _.merge({}, responseGet, requestPatch);
      try {
        responsePatch = await ApiProductsService.updateApiProduct(orgName, apiProductNameMaintenanceDevelopment, requestPatch);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `update apiProduct=${apiProductNameMaintenanceDevelopment}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
      let expectDiff: ExpectDiff = getExpectEqualDiff(expectedResponsePatch, responsePatch);
      let message = expectDiff.message;
      expect(expectDiff.diff, `${TestLogger.createTestFailMessage(message)}`).to.be.empty;
    });

    it(`${scriptName}: should create api product maintenance-production`, async() => {
      let response: APIProduct;
      let request: APIProduct = {
        name: `${apiProductNameMaintenanceProduction}`,
        displayName: `display name for ${apiProductNameMaintenanceProduction}`,
        description: `description for ${apiProductNameMaintenanceProduction}`,
        apis: [ apiNameMaintenance ],
        approvalType: apiProductMaintenanceProductionApprovalType,
        attributes: apiMaintenacePermissions,
        environments: [ `${prodEnvName}` ],
        protocols: [ { name: Protocol.name.MQTT, version: '3.1.1' } ],
        pubResources: [],
        subResources: []
      };
      try {
        response = await ApiProductsService.createApiProduct(orgName, request);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `create apiProduct='${apiProductNameMaintenanceProduction}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
      }
      expect(_.isEqual(request, response), `${TestLogger.createTestFailMessage('response not equal to request')}`).to.be.true;
    });

    it(`${scriptName}: should create all developers`, async() => {
      let response: Developer;
      for(let developer of developers) {
        let request = developer;
        try {
          response = await DevelopersService.createDeveloper(orgName, request);
        } catch (e) {
          expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
          let message = `create developer`;
          expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
          }
          expect(_.isEqual(request, response), `${TestLogger.createTestFailMessage('response not equal to request')}`).to.be.true;
      }
    });

    it(`${scriptName}: should create the development app for all developers`, async() => {
      let response: App;
      let request: App = {
        name: 'x',
        apiProducts: [ `${apiProductNameMaintenanceDevelopment}` ],
        credentials: {
          expiresAt: -1,
          secret: {
            consumerKey: 'x',
            consumerSecret: 'x'
          }
        }
      }; 
      for(let developer of developers) {
        request.credentials= createDefaultCredentials();
        request.name = `${developerAppNameMaintenanceDevelopment}-${developer.userName}`
        try {
          response = await AppsService.createDeveloperApp(orgName, developer.userName, request); 
        } catch (e) {
          expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
          let message = `create developer app`;
          expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;
        }
        let expectDiff: ExpectDiff = getExpectContainedDiff(request, response);
        let message = expectDiff.message;
        expect(expectDiff.diff, `${TestLogger.createTestFailMessage(message)}`).to.be.empty;
      }
    });

    xit(`${scriptName}: developer app should only have mqtt in protocols`, async() => {
      // TODO: discuss
      // api spec only specifies http binding type=request
      // so, only webhook supported
      // but no http in-bound
      for(let developer of developers) {
        let appName = `${developerAppNameMaintenanceDevelopment}-${developer.userName}`
        let responseGet: AppResponse;
        try {
          responseGet = await AppsService.getDeveloperApp(orgName, developer.userName, appName);
        } catch (e) {
          expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
          let message = `getDeveloperApp=${appName}`;
          expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;        
        }
        let environments: Array<AppEnvironment> = responseGet.environments;
        expect(environments.length, `${TestLogger.createTestFailMessage("wrong number of environments")}`).to.equal(1);
        for(let environment of environments) {
          let endpoints: Array<Endpoint> = environment.messagingProtocols;
          // check only mqtt is listed
          for(let endpoint of endpoints) {
            expect(endpoint.protocol.name, `${TestLogger.createTestFailMessage("wrong protocol")}`).to.equal("mqtt");
          }
        }
      }
    });

    xit(`${scriptName}: should add webhook to development app for all developers`, async() => {
      // TODO: CHECK
      // the patch response does not contain the full get response
      // is it supposed to?

      for(let developer of developers) {
        let appName = `${developerAppNameMaintenanceDevelopment}-${developer.userName}`
        // get current DeveloperApp
        let responseGet: AppResponse;
        try {
          responseGet = await AppsService.getDeveloperApp(orgName, developer.userName, appName);
        } catch (e) {
          expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
          let message = `getDeveloperApp=${appName}`;
          expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;        
        }
        // update app
        let responsePatch: AppResponse;
        let requestPatch: AppPatch = {
        };
        let webHook: WebHook = {
          uri: `http://api.${developer.userName}.com/${developer.userName}/elevator/maintenance`,
          method: WebHook.method.POST,
          mode: WebHook.mode.SERIAL
        };
        requestPatch.webHooks = [ webHook ];
        // warning: overrides arrays
        let expectedResponsePatch: AppResponse = _.merge({}, responseGet, requestPatch);
        try {
          responsePatch = await AppsService.updateDeveloperApp(orgName, developer.userName, appName, requestPatch);
        } catch (e) {
          expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
          let message = `updateDeveloperApp=${appName}`;
          expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;        
        }
        let expectDiff: ExpectDiff = getExpectContainedDiff(expectedResponsePatch, responsePatch);
        let message = expectDiff.message;
        expect(expectDiff.diff, `${TestLogger.createTestFailMessage(message)}`).to.be.empty;
      }
    });

    it(`${scriptName}: should create the production app for all developers`, async() => {
      if(testEnv.IS_BOOTSTRAP_DEMO) return;
      let response: App;
      let appName: string;
      let request: App = {
        name: 'x',
        apiProducts: [ `${apiProductNameMaintenanceProduction}` ],
        credentials: {
          expiresAt: -1,
          secret: {
            consumerKey: 'x',
            consumerSecret: 'x'
          }
        }
      }; 
      for(let developer of developers) {
        appName = `${developerAppNameMaintenanceProduction}-${developer.userName}`;
        request.credentials= createDefaultCredentials();
        request.name = appName;
        try {
          response = await AppsService.createDeveloperApp(orgName, developer.userName, request); 
        } catch (e) {
          expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
          let message = `create app=${appName}`;
          expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;        
        }
        let expectDiff: ExpectDiff = getExpectContainedDiff(request, response);
        let message = expectDiff.message;
        expect(expectDiff.diff, `${TestLogger.createTestFailMessage(message)}`).to.be.empty;
      }
    });

    xit(`${scriptName}: should handle adding webhook without http protocol enabled`, async() => {
      // TODO implement me
    });

    it(`${scriptName}: should approve all apps that require approval`, async() => {
      // get a list of all apps that require approval
      let responseList: Array<AppListItem>;
      try {
        responseList = await AppsService.listApps(orgName, AppStatus.PENDING, 100, 1);
      } catch (e) {
        expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
        let message = `get all pending apps for org=${orgName}`;
        expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;        
      }
      let message: string;
      for(let app of responseList) {
        // check if status is actually pending
        message = `expecting status == pending for app=${app.name}`;
        expect(app.status, `${TestLogger.createTestFailMessage(message)}`).to.equal(AppStatus.PENDING);
        // approve them all
        let responsePatch: AppResponse;
        let requestPatch: AppPatch = {
          status: AppStatus.APPROVED
        };
        try {
          responsePatch = await AppsService.updateDeveloperApp(orgName, app.ownerId, app.name, requestPatch);
        } catch (e) {
          expect(isInstanceOfApiError(e), `${TestLogger.createNotApiErrorMesssage(e.message)}`).to.be.true;
          message = `update (approve) app=${app.name}`;
          expect(false, `${TestLogger.createTestFailMessage(message)}`).to.be.true;        
        }
      }
    });

    xit(`${scriptName}: should check app details for all developer apps`, async() => {
      // TODO
      // get the developer app 
      // check all is good
      // including mqtt format for permissions
      return;
    });

    xit(`${scriptName}: should check broker config for all developer apps`, async() => {
      // TODO
      // get the developer app 
      // check all the expected broker configs ...
      return;
    });

  });

});
