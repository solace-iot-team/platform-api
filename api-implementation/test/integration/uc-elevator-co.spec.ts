import "mocha";
import * as chai from "chai";
const expect = chai.expect;
import path from 'path';
import { isEqual } from 'lodash';
import { getBaseUrl, UserRegistry, getMandatoryEnvVarValue, getOptionalEnvVarValue, PlatformRequestHelper, LoggingHelper, AsyncAPIHelper, Developer, getObjectDifferences } from "../lib/test.helpers";
import { PlatformManagementHelper } from "../lib/platform-management";
import { isInstanceOfApiError, PlatformAPIClient } from '../lib/api.helpers';
import { PlatformManagementService } from '../lib/generated/openapi/services/PlatformManagementService';
import type { Organization } from '../lib/generated/openapi/models/Organization';
import type { History } from '../lib/generated/openapi/models/History';
import { APIProduct, ApiProductsService, ApisService, App, AppsService, Credentials, DevelopersService, Environment, EnvironmentResponse, EnvironmentsService, ManagementService, Protocol } from "../lib/generated/openapi";


const enableLoggingEnvVar: string = getOptionalEnvVarValue('APIM_INTEGRATION_TEST_ENABLE_LOGGING');
let logging: LoggingHelper = new LoggingHelper(enableLoggingEnvVar != null && enableLoggingEnvVar.toLowerCase() == "true" ? true : false);
logging.setLogging(true);
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
  // ENABLE_LOGGING: getOptionalEnvVarValue('APIM_INTEGRATION_TEST_ENABLE_LOGGING') != null ? true : false,
  DEV_SERVICE_ID: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_SOLACE_CLOUD_DEV_SERVICE_ID'),
  ORG_NAME: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_ORG_NAME'),
  ORG_API_USR: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_ORG_API_USR'),
  ORG_API_PWD: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_ORG_API_PWD'),
  API_SPEC_MAINTENANCE_FILE: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_API_SPEC_MAINTENANCE_FILE'),
  DEVELOPERS_FILE: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_DEVELOPERS_FILE'),  
  IS_BOOTSTRAP_DEMO: getOptionalEnvVarValue('APIM_INTEGRATION_TEST_IS_BOOTSTRAP_DEMO') != null ? true : false
}
logging.logMessage(scriptName, `testEnv = ${JSON.stringify(testEnv, null, 2)}`);
const userRegistry: UserRegistry = require(testEnv.FILE_USER_REGISTRY);
logging.logMessage(scriptName, `userRegistry = ${JSON.stringify(userRegistry, null, 2)}`);
logging.logMessage(scriptName, ">>> success.");

describe('uc-elevator-co test', () => {
  const testId: string = "uc-elevator-co";

  context("tests uc-elevator-co", () => {
    
    const base: string = getBaseUrl(testEnv.PLATFORM_PROTOCOL, testEnv.PLATFORM_HOST, testEnv.PLATFORM_PORT);
    const platformApiClient: PlatformAPIClient = new PlatformAPIClient(base, testEnv.PLATFORM_ADMIN_USER, testEnv.PLATFORM_ADMIN_PASSWORD, testEnv.ORG_API_USR, testEnv.ORG_API_PWD);
    
    const platformManagementRequest: PlatformRequestHelper = new PlatformRequestHelper(testEnv.PLATFORM_PROTOCOL, testEnv.PLATFORM_HOST, testEnv.PLATFORM_PORT, testEnv.PLATFORM_ADMIN_USER, testEnv.PLATFORM_ADMIN_PASSWORD);
    const platformManagement: PlatformManagementHelper = new PlatformManagementHelper(platformManagementRequest, logging);

    const orgName = testEnv.ORG_NAME;
    const devEnvName = "development";
    const devEnv: Environment = {
      name: `${devEnvName}`,
      description: `description of development`,
      serviceId: testEnv.DEV_SERVICE_ID
    };
    const apiNameMaintenance: string = "api-maintenance";
    const apiSpecMaintenance: string = AsyncAPIHelper.loadYamlFileAsJsonString(testEnv.API_SPEC_MAINTENANCE_FILE);
    const apiProductNameMaintenanceDevelopment: string = "elevator-maintenance-development";
    const apiProductMaintenanceDevelopmentApprovalType: string = APIProduct.approvalType.AUTO;
    const developers: Array<Developer> = require(testEnv.DEVELOPERS_FILE);
    const developerAppNameMaintenance: string = "elevator-maintenance";

    before(async() => {
      // ensure we start clean every time
      logging.logMessage(testId, `before: delete org`);
      let success: boolean = await platformManagement.deleteOrg(orgName);
      expect(success, `deleting org = ${orgName}`).to.be.true;
    });

    after(async() => {
      if(testEnv.IS_BOOTSTRAP_DEMO) return;
      // make sure the broker is de-provisioned again
      logging.logMessage(testId, `after: delete org`);
      let success: boolean = await platformManagement.deleteOrg(orgName);
      expect(success, `deleting org = ${orgName}`).to.be.true;
    });

    it("should create org", async() => {
      let org: Organization = {
        name: orgName
        // test ApiError:
        // name: ""
      }
      platformApiClient.useManagementUser();
      try {
        let response: Organization = await PlatformManagementService.createOrganization(org);
        logging.logMessage(testId, `response = ${JSON.stringify(response, null, 2)}`);
        expect(response.name).to.equal(orgName);
      } catch (e) {
        expect(isInstanceOfApiError(e), `error is not an instance of ApiError, err=${e.message}`).to.be.true;
        expect(false, `creating org='${org.name}', err=${JSON.stringify(e, null, 2)}'`).to.be.true;
      }
    });

    it("should add token to org", async() => {
      platformApiClient.useApiUser();
      try {
        let response: string = await ManagementService.updateToken(orgName, testEnv.SOLACE_CLOUD_TOKEN);
        logging.logMessage(testId, `response = ${JSON.stringify(response, null, 2)}`);
        expect(response).to.equal(testEnv.SOLACE_CLOUD_TOKEN);
      } catch (e) {
        expect(isInstanceOfApiError(e), `error is not an instance of ApiError, err=${e.message}`).to.be.true;
        expect(false, `updating token for org='${orgName}', err=${JSON.stringify(e, null, 2)}`).to.be.true;
      }
    });

    it("should register dev service with org", async() => {
      platformApiClient.useApiUser();
      try {
        let response: Environment = await EnvironmentsService.createEnvironment(orgName, devEnv);
        logging.logMessage(testId, `response = ${JSON.stringify(response, null, 2)}`);
        expect(isEqual(devEnv, response)).to.be.true;
      } catch (e) {
        expect(isInstanceOfApiError(e), `error is not an instance of ApiError, err=${e.message}`).to.be.true;
        expect(false, `register dev service with org='${orgName}', err=${JSON.stringify(e, null, 2)}`).to.be.true;
      }
    });

    it("should get environments", async() => {
      platformApiClient.useApiUser();
      try {
        let response: Array<Environment> = await EnvironmentsService.listEnvironments(orgName);
        logging.logMessage(testId, `response = ${JSON.stringify(response, null, 2)}`);
        expect(response.length).to.equal(1);
        expect(isEqual(devEnv, response[0])).to.be.true;
      } catch (e) {
        expect(isInstanceOfApiError(e), `error is not an instance of ApiError, err=${e.message}`).to.be.true;
        expect(false, `get envs for org='${orgName}', err=${JSON.stringify(e, null, 2)}`).to.be.true;
      }
    });

    it("should get audit history", async() => {
      platformApiClient.useApiUser();
      try {
        let response: Array<History> = await ManagementService.listHistory(orgName);
        logging.logMessage(testId, `response = ${JSON.stringify(response, null, 2)}`);

        // expecting to see more history ...


      } catch (e) {
        expect(isInstanceOfApiError(e), `error is not an instance of ApiError, err=${e.message}`).to.be.true;
        expect(false, `get dev env='${devEnv}', err=${JSON.stringify(e, null, 2)}`).to.be.true;
      }
    });

    it("should get dev environment", async() => {
      platformApiClient.useApiUser();
      try {
        let response: EnvironmentResponse = await EnvironmentsService.getEnvironment(orgName, devEnv.name);
        logging.logMessage(testId, `response = ${JSON.stringify(response, null, 2)}`);
        // could check if all mqtt endpoints have the correct name?
        // expect(isEqual(devEnv, response[0])).to.be.true;
      } catch (e) {
        expect(isInstanceOfApiError(e), `error is not an instance of ApiError, err=${e.message}`).to.be.true;
        expect(false, `get dev env='${devEnv}', err=${JSON.stringify(e, null, 2)}`).to.be.true;
      }
    });

    it("should create api maintenance", async() => {
      platformApiClient.useApiUser();
      let response: any;
      try {
        response = await ApisService.createApi(orgName, apiNameMaintenance, apiSpecMaintenance);
      } catch (e) {
        expect(isInstanceOfApiError(e), `error is not an instance of ApiError, err=${e.message}`).to.be.true;
        expect(false, `create api='${apiNameMaintenance}', err=${JSON.stringify(e, null, 2)}`).to.be.true;
      }
      // response is actually an object, test if it is
      let responseVerified: string = JSON.parse(JSON.stringify(response));
      logging.logMessage(testId, `response = ${JSON.stringify(response, null, 2)}`);
      expect(response, "response is not type object").to.be.an('object');
      expect(isEqual(JSON.parse(apiSpecMaintenance), responseVerified), 'response not equal to api spec').to.be.true;
    });

    it("should create api product maintenance-development", async() => {
      platformApiClient.useApiUser();
      let apiProduct: APIProduct = {
        name: `${apiProductNameMaintenanceDevelopment}`,
        displayName: `${apiProductNameMaintenanceDevelopment}`,
        description: `description for ${apiProductNameMaintenanceDevelopment}`,
        apis: [ apiNameMaintenance ],
        approvalType: APIProduct.approvalType.AUTO,
        attributes: [
          { name: 'resource_region_id', value: 'fr, de, us-east, us-west' }, 
          { name: 'resource_type', value: 'elev-make-1, elev-make-2' }
          // test: use an attribute that doesn't exist: name, value
        ],
        environments: [ `${devEnvName}` ],
        protocols: [ { name: Protocol.name.MQTT, version: '3.1.1' } ],
        pubResources: [],
        subResources: []
      };
      logging.logMessage(testId, `creating apiProduct = ${JSON.stringify(apiProduct, null, 2)}`);
      let response: APIProduct;
      try {
        response = await ApiProductsService.createApiProduct(orgName, apiProduct);
      } catch (e) {
        expect(isInstanceOfApiError(e), `error is not an instance of ApiError, err=${e.message}`).to.be.true;
        expect(false, `create apiProduct='${apiProductNameMaintenanceDevelopment}', err=${JSON.stringify(e, null, 2)}`).to.be.true;
      }
      logging.logMessage(testId, `response = ${JSON.stringify(response, null, 2)}`);
      expect(isEqual(apiProduct, response), 'response not equal to apiProduct').to.be.true;
    });
    
    it("should create all developers", async() => {
      platformApiClient.useApiUser();
      let response: Developer;
      for(let developer of developers) {
        try {
          response = await DevelopersService.createDeveloper(orgName, developer);
        } catch (e) {
          expect(isInstanceOfApiError(e), `error is not an instance of ApiError, err=${e.message}`).to.be.true;
          expect(false, `create developer='${JSON.stringify(developer, null, 2)}', err=${JSON.stringify(e, null, 2)}`).to.be.true;
        }
        logging.logMessage(testId, `response = ${JSON.stringify(response, null, 2)}`);
        expect(isEqual(developer, response), 'response not equal to developer').to.be.true;  
      }
    });

    it("should create the app for all developers", async() => {
      platformApiClient.useApiUser();
      let response: App;
      let app: App = {
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
        let credentials: Credentials = {
          expiresAt: -1,
          secret: {
            consumerKey: `consumerKey-${developer.userName}`,
            consumerSecret: `consumerSecret-${developer.userName}`
          }
        };
        app.credentials= credentials;
        app.name = `${developerAppNameMaintenance}-${developer.userName}`
        try {
          // change after regenerating openapi
          response = await AppsService.createDeveloperApp(orgName, developer.userName, undefined, app); 
        } catch (e) {
          expect(isInstanceOfApiError(e), `error is not an instance of ApiError, err=${e.message}`).to.be.true;
          expect(false, `create app=${JSON.stringify(app, null, 2)} for developer='${JSON.stringify(developer, null, 2)}', err=${JSON.stringify(e, null, 2)}`).to.be.true;
        }
        logging.logMessage(testId, `response = ${JSON.stringify(response, null, 2)}`);
        let areEqual: boolean = isEqual(app, response);
        let diff: any;
        if(!areEqual) diff = getObjectDifferences(response, app);
        expect(!areEqual, `response not equal to app, diff=${JSON.stringify(diff, null, 2)}`).to.be.true;  
      }
    });

    xit("should get app details for all developer apps", async() => {
      // platformApiClient.useApiUser();
      // let response: App;
      // let app: App = {
      //   name: 'x',
      //   apiProducts: [ `${apiProductNameMaintenanceDevelopment}` ],
      //   credentials: {
      //     expiresAt: -1,
      //     secret: {
      //       consumerKey: 'x',
      //       consumerSecret: 'x'
      //     }
      //   }
      // };
      // for(let developer of developers) {
      //   let credentials: Credentials = {
      //     expiresAt: -1,
      //     secret: {
      //       consumerKey: `consumerKey-${developer.userName}`,
      //       consumerSecret: `consumerSecret-${developer.userName}`
      //     }
      //   };
      //   app.credentials= credentials;
      //   app.name = `${developerAppNameMaintenance}-${developer.userName}`
      //   try {
      //     // change after regenerating openapi
      //     response = await AppsService.createDeveloperApp(orgName, developer.userName, undefined, app); 
      //   } catch (e) {
      //     expect(isInstanceOfApiError(e), `error is not an instance of ApiError, err=${e.message}`).to.be.true;
      //     expect(false, `create app=${JSON.stringify(app, null, 2)} for developer='${JSON.stringify(developer, null, 2)}', err=${JSON.stringify(e, null, 2)}`).to.be.true;
      //   }
      //   logging.logMessage(testId, `response = ${JSON.stringify(response, null, 2)}`);
      //   let areEqual: boolean = isEqual(app, response);
      //   let diff: any;
      //   if(!areEqual) diff = getObjectDifferences(response, app);
      //   expect(!areEqual, `response not equal to app, diff=${JSON.stringify(diff, null, 2)}`).to.be.true;  
      // }
    });

  });

});
