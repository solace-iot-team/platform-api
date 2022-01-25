import 'mocha';
import path from 'path';
import {
  getMandatoryEnvVarValue,
  AsyncAPIHelper,
  TestContext,
  TestLogger,
} from "../../lib/test.helpers";
import { PlatformAPIClient } from '../../lib/api.helpers';
import { SolaceCloudClientFactory } from '../../lib/broker.helpers';
import {
  Developer,
  DevelopersService,
  Environment,
  EnvironmentResponse,
  Organization,
} from "../../lib/generated/openapi";
import {
  AdministrationService,
  APIProduct,
  ApiProductsService,
  ApisService,
  EnvironmentsService,
  Protocol,
  WebHook,
} from "../../lib/generated/openapi";

const scriptName: string = path.basename(__filename);
const scriptDir: string = path.dirname(__filename);

export const env = {
  solaceCloudBaseUrl: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_URL'),
  solaceCloudToken: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_TOKEN'),
  solaceEventPortalBaseUrl: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_EVENT_PORTAL_URL'),
  solaceEventPortalToken: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_EVENT_PORTAL_TOKEN'),
  solaceCloudServiceId1: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_SERVICE_ID_DEV'),
  solaceCloudServiceId2: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_SERVICE_ID_PROD'),
}

/**
 * The name of the organization.
 */
export const organizationName: string = "TestOrganization";

/**
 * The organization.
 */
export const organization: Organization = {
  name: organizationName,
  'cloud-token': {
    cloud: { baseUrl: env.solaceCloudBaseUrl, token: env.solaceCloudToken },
    eventPortal: { baseUrl: env.solaceEventPortalBaseUrl, token: env.solaceEventPortalToken },
  }
}

/**
 * The 1st developer.
 */
 export const developer1: Developer = {
  email: "developer1@mycompany.com",
  firstName: "firstName1",
  lastName: "lastname1",
  userName: `developer1@${organizationName}`,
}

/**
 * The 2nd developer.
 */
export const developer2: Developer = {
  email: "developer2@mycompany.com",
  firstName: "firstName2",
  lastName: "lastname2",
  userName: `developer2@${organizationName}`,
}

/**
 * The 1st environment.
 * - Protocols: MQTT 3.1.1 and HTTP 1.1
 */
export const environment1: Environment = {
  name: "TestEnvironment1",
  description: "test environment #1",
  serviceId: env.solaceCloudServiceId1,
  exposedProtocols: [
    {
      name: Protocol.name.MQTT,
      version: "3.1.1"
    },
    {
      name: Protocol.name.HTTP,
      version: "1.1"
    }
  ],
}

/**
 * The 2nd environment.
 * - Protocols: MQTT 3.1.1 and HTTP 1.1
 */
export const environment2: Environment = {
  name: "TestEnvironment2",
  description: "test environment #1",
  serviceId: env.solaceCloudServiceId2,
  exposedProtocols: [
    {
      name: Protocol.name.MQTT,
      version: "3.1.1"
    },
    {
      name: Protocol.name.HTTP,
      version: "1.1"
    }
  ],
}

// The SayHello API can be used to consume or publish SayHello events 

const apiName1: string = "SayHelloApi";
const apiSpec1: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${scriptDir}/../resources/apis/say-hello.yml`);

/**
 * API product for the SayHello API.
 * - Environment: {@link environment1}
 * - Protocols: MQTT 3.1.1 and HTTP 1.1
 * - Approval type: auto
 * - Attributes: (language: EN,DE)
 */
export const apiProduct1: APIProduct = {
  name: "ApiProduct1",
  displayName: "api product #1",
  apis: [apiName1],
  approvalType: APIProduct.approvalType.AUTO,
  attributes: [{ name: "language", value: "EN,DE" }],
  environments: [environment1.name],
  protocols: [{ name: Protocol.name.MQTT, version: '3.1.1' }, { name: Protocol.name.HTTP, version: '1.1' }],
  pubResources: [],
  subResources: [],
}

// The Account service API can be used to consume UserSignedUp events

const apiName2: string = "AccountServiceApi";
const apiSpec2: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${scriptDir}/../resources/apis/account-service.yml`);

/**
 * API product for the AccountService API.
 * - Environment: {@link environment2}
 * - Protocols: MQTT 3.1.1 and HTTP 1.1
 * - Approval type: auto
 * - Attributes: none
 */
export const apiProduct2: APIProduct = {
  name: "ApiProduct2",
  displayName: "api product #2",
  apis: [apiName2],
  approvalType: APIProduct.approvalType.AUTO,
  attributes: [],
  environments: [environment2.name],
  protocols: [{ name: Protocol.name.MQTT, version: '3.1.1' }, { name: Protocol.name.HTTP, version: '1.1' }],
  pubResources: [],
  subResources: [],
}

// The Email service API can be used to publish UserSignedUp events

const apiName3: string = "EmailServiceApi";
const apiSpec3: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${scriptDir}/../resources/apis/email-service.yml`);

/**
 * API product for the EmailService API.
 * - Environment: {@link environment2}
 * - Protocols: MQTT 3.1.1 and HTTP 1.1
 * - Approval type: auto
 * - Attributes: none
 */
export const apiProduct3: APIProduct = {
  name: "ApiProduct3",
  displayName: "api product #3",
  apis: [apiName3],
  approvalType: APIProduct.approvalType.AUTO,
  attributes: [],
  environments: [environment2.name],
  protocols: [{ name: Protocol.name.MQTT, version: '3.1.1' }, { name: Protocol.name.HTTP, version: '1.1' }],
  pubResources: [],
  subResources: [],
}

/**
 * Web hook for {@link environment1}.
 * - Host: postman-echo.com
 * - Port: 80
 * - Resource: /post
 * - Method: POST
 */
export const webHook1: WebHook = {
  uri: "http://postman-echo.com/post",
  environments: [environment1.name],
  method: WebHook.method.POST,
  mode: WebHook.mode.SERIAL,
}

/**
 * Web hook for {@link environment2}.
 * - Host: postman-echo.com
 * - Port: 80
 * - Resource: /put
 * - Method: PUT
 */
export const webHook2: WebHook = {
  uri: "http://postman-echo.com/put",
  environments: [environment2.name],
  method: WebHook.method.PUT,
  mode: WebHook.mode.SERIAL,
}

/**
 * The msgVpnName for each environment.
 */
export let msgVpnNamePerEnvironment: Map<string, string> = new Map<string, string>();

// Mocha hooks to setup and teardown the test environment for all application service tests
//

before(async function () {

  TestContext.newItId();

  TestLogger.logMessage(scriptName, ">>> Start to execute test cases ...");
  TestLogger.logTestEnv(scriptName, env);

  PlatformAPIClient.setManagementUser();
  await AdministrationService.createOrganization(organization);

  PlatformAPIClient.setApiUser();

  await Promise.all([
    DevelopersService.createDeveloper(organizationName, developer1),
    DevelopersService.createDeveloper(organizationName, developer2),
  ]);

  await Promise.all([
    EnvironmentsService.createEnvironment(organizationName, environment1),
    EnvironmentsService.createEnvironment(organizationName, environment2),
  ]);

  let updateMsgVpnNamePerEnv = (response: EnvironmentResponse): void => {
    msgVpnNamePerEnvironment.set(response.name, response.msgVpnName)
  }

  await Promise.all([
    EnvironmentsService.getEnvironment(organizationName, environment1.name).then(updateMsgVpnNamePerEnv),
    EnvironmentsService.getEnvironment(organizationName, environment2.name).then(updateMsgVpnNamePerEnv),
  ]);

  await Promise.all([
    ApisService.createApi(organizationName, apiName1, apiSpec1),
    ApisService.createApi(organizationName, apiName2, apiSpec2),
    ApisService.createApi(organizationName, apiName3, apiSpec3),
  ]);

  await Promise.all([
    ApiProductsService.createApiProduct(organizationName, apiProduct1),
    ApiProductsService.createApiProduct(organizationName, apiProduct2),
    ApiProductsService.createApiProduct(organizationName, apiProduct3),
  ]);

  SolaceCloudClientFactory.initialize(env.solaceCloudBaseUrl, env.solaceCloudToken);
});

beforeEach(function () {
  TestContext.newItId();
});

after(async function () {
  PlatformAPIClient.setManagementUser();
  await AdministrationService.deleteOrganization(organizationName).catch(() => {
    // ignore
  });
  TestLogger.logMessage(scriptName, ">>> Finished");
});