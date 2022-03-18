import { Suite } from 'mocha';
import path from 'path';
import {
  getMandatoryEnvVarValue,
  AsyncAPIHelper,
  TestContext,
  TestLogger,
} from "../../../lib/test.helpers";
import { PlatformAPIClient } from '../../../lib/api.helpers';
import { SolaceCloudClientFactory } from '../../../lib/broker.helpers';
import type {
  Environment,
  EnvironmentResponse,
  Organization,
  Team,
} from "../../../lib/generated/openapi";
import {
  AdministrationService,
  APIProduct,
  ApiProductsService,
  ApisService,
  ClientOptionsGuaranteedMessaging,
  EnvironmentsService,
  Protocol,
  TeamsService,
  WebHook,
} from "../../../lib/generated/openapi";

const scriptName: string = path.basename(__filename);
const scriptDir: string = path.dirname(__filename);

const env = {
  solaceCloudBaseUrl: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_URL'),
  solaceCloudToken: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_TOKEN'),
  solaceEventPortalBaseUrl: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_EVENT_PORTAL_URL'),
  solaceEventPortalToken: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_EVENT_PORTAL_TOKEN'),
  solaceCloudServiceId1: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_SERVICE_ID_DEV'),
  solaceCloudServiceId2: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_SERVICE_ID_PROD'),
}

/** The resources directory. */
const resourcesDirectory: string = `${scriptDir}/../../../resources`;

/** The name of the test organization. */
export const organizationName: string = "TestOrganization";

/** The test organization. */
export const organization: Organization = {
  name: organizationName,
  'cloud-token': {
    cloud: { baseUrl: env.solaceCloudBaseUrl, token: env.solaceCloudToken },
    eventPortal: { baseUrl: env.solaceEventPortalBaseUrl, token: env.solaceEventPortalToken },
  }
}

/**
 * The 1st test environment.
 * - Protocols: MQTT 3.1.1, HTTP 1.1 and JMS 1.1
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
    },
    {
      name: Protocol.name.JMS,
      version: "1.1"
    }
  ],
}

/**
 * The 2nd test environment.
 * - Protocols: MQTT 3.1.1, HTTP 1.1 and JMS 1.1
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
    },
    {
      name: Protocol.name.JMS,
      version: "1.1"
    }
  ],
}

/** The details for all test environments. */
export let environmentDetails: Map<string, EnvironmentResponse> = new Map<string, EnvironmentResponse>();

/** API name for SayHello API. */
export const apiName1: string = "SayHelloApi";

/** API spec for SayHello API. */
export const apiSpec1: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${resourcesDirectory}/apis/say-hello.yml`);

/**
 * API product for the SayHello API.
 *
 * Operations:
 * - [PUB] `say/hello/{language}`
 * - [SUB] `say/hello/{language}`
 * 
 * Product details:
 * - Environment: {@link environment1}
 * - Protocols: MQTT 3.1.1 and HTTP 1.1
 * - Approval type: auto
 * - Attributes:
 *   + language: EN,DE
 */
export const apiProduct1: APIProduct = {
  name: "ApiProduct1",
  displayName: "API Product 1",
  apis: [apiName1],
  approvalType: APIProduct.approvalType.AUTO,
  attributes: [{ name: "language", value: "EN,DE" }],
  environments: [environment1.name],
  protocols: [{
    name: Protocol.name.MQTT, version: '3.1.1'
  }, {
    name: Protocol.name.HTTP, version: '1.1'
  }],
  pubResources: [],
  subResources: [],
}

/** API name for AccountService API. */
export const apiName2: string = "AccountServiceApi";

/** API spec for AccountService API. */
export const apiSpec2: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${resourcesDirectory}/apis/account-service.yml`);

/**
 * API product for the AccountService API.
 * 
 * Operations:
 * - [SUB] `user/signedup`
 * 
 * Product details:
 * - Environment: {@link environment2}
 * - Protocols: MQTT 3.1.1 and HTTP 1.1
 * - Approval type: auto
 * - Attributes: none
 */
export const apiProduct2: APIProduct = {
  name: "ApiProduct2",
  displayName: "API Product 2",
  apis: [apiName2],
  approvalType: APIProduct.approvalType.AUTO,
  attributes: [],
  environments: [environment2.name],
  protocols: [{ name: Protocol.name.MQTT, version: '3.1.1' }, { name: Protocol.name.HTTP, version: '1.1' }],
  pubResources: [],
  subResources: [],
}

/** API name for EmailService API. */
export const apiName3: string = "EmailServiceApi";

/** API spec for EmailService API. */
export const apiSpec3: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${resourcesDirectory}/apis/email-service.yml`);

/**
 * API product for the EmailService API.
 * 
 * Operations:
 * - [PUB] `user/signedup`
 * 
 * Product details:
 * - Environment: {@link environment2}
 * - Protocols: MQTT 3.1.1 and HTTP 1.1
 * - Approval type: auto
 * - Attributes: none
 */
export const apiProduct3: APIProduct = {
  name: "ApiProduct3",
  displayName: "API Product 3",
  apis: [apiName3],
  approvalType: APIProduct.approvalType.AUTO,
  attributes: [],
  environments: [environment2.name],
  protocols: [{ name: Protocol.name.MQTT, version: '3.1.1' }, { name: Protocol.name.HTTP, version: '1.1' }],
  pubResources: [],
  subResources: [],
}

/**
 * API product for the SayHello API with guaranteed delivery.
 *
 * Operations:
 * - [PUB] `say/hello/{language}`
 * - [SUB] `say/hello/{language}`
 * 
 * Product details:
 * - Environment: {@link environment2}
 * - Protocols: MQTT 3.1.1, HTTP 1.1 and JMS 1.1
 * - Approval type: auto
 * - Attributes:
 *   + language: EN
 * - Client Options:
 *   + Guaranteed Messaging:
 *     - Enabled: true
 *     - Access Type: exclusive
 *     - Max TTL: 10 minutes
 *     - Max Spool Usage: 50 MB
 */
export const apiProduct4: APIProduct = {
  name: "ApiProduct4",
  displayName: "API Product 4",
  apis: [apiName1],
  approvalType: APIProduct.approvalType.AUTO,
  attributes: [{ name: "language", value: "EN" }],
  environments: [environment2.name],
  protocols: [{
    name: Protocol.name.MQTT, version: '3.1.1'
  }, {
    name: Protocol.name.HTTP, version: '1.1'
  }, {
    name: Protocol.name.JMS, version: '1.1'
  }],
  pubResources: [],
  subResources: [],
  clientOptions: {
    guaranteedMessaging: {
      requireQueue: true,
      accessType: ClientOptionsGuaranteedMessaging.accessType.EXCLUSIVE,
      maxTtl: 600,
      maxMsgSpoolUsage: 10,
    },
  },
}

/**
 * API product for the AccountService API with manual approval.
 * 
 * Operations:
 * - [SUB] `user/signedup`
 * 
 * Product details:
 * - Environment: {@link environment2}
 * - Protocols: MQTT 3.1.1 and HTTP 1.1
 * - Approval type: manual
 * - Attributes: none
 */
export const apiProduct5: APIProduct = {
  name: "ApiProduct5",
  displayName: "API Product 5",
  apis: [apiName2],
  approvalType: APIProduct.approvalType.MANUAL,
  attributes: [],
  environments: [environment2.name],
  protocols: [{ name: Protocol.name.MQTT, version: '3.1.1' }, { name: Protocol.name.HTTP, version: '1.1' }],
  pubResources: [],
  subResources: [],
}

/**
 * API product for the EmailService API with manual approval.
 * 
 * Operations:
 * - [PUB] `user/signedup`
 * 
 * Product details:
 * - Environment: {@link environment2}
 * - Protocols: MQTT 3.1.1 and HTTP 1.1
 * - Approval type: auto
 * - Attributes: none
 */
export const apiProduct6: APIProduct = {
  name: "ApiProduct6",
  displayName: "API Product 6",
  apis: [apiName3],
  approvalType: APIProduct.approvalType.MANUAL,
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

/** The 1st team. */
export const team1: Team = {
  name: "team1",
  displayName: "Team1",
}

/** The 2nd team. */
export const team2: Team = {
  name: "team2",
  displayName: "Team2",
}

/**
 * Registers `before()` and `beforeEach()` hooks for a team-application test suite.
 * 
 * The `before()` hook logs a ">>> Start to execute test cases" message and all environment
 * variables that are used, and creates the following resources:
 * 
 * - The organization
 * - The environments 1&2
 * - The API products 1-6
 * - The teams 1&2
 * 
 * The `beforeEach()` hook generates a new identifier for the {@link TestContext} and
 * configures the {@link PlatformAPIClient} to use the API user.
 * 
 * **Important:**
 * 
 * If the title of the parent test suite matches the start of the title of the team-application
 * test suite, the hooks will be registered for the parent test suite instead.
 * 
 * This improves the test execution time when tests from multiple test suites are executed.
 * 
 * @param suite The team-application test suite.
 */
export function addBeforeHooks(suite: Suite) {

  const parent = suite.parent;

  if (parent.title && suite.title.startsWith(parent.title)) {
    if (parent.ctx["BeforeHooks"]) { return; }
    suite = parent;
    parent.ctx["BeforeHooks"] = true;
  }

  suite.beforeAll(async () => {
    TestLogger.logMessage(suite.title, ">>> Start to execute test cases ...");
    TestLogger.logTestEnv(suite.title, env);
    await before();
  });

  suite.beforeEach(beforeEach);
}

/** before hook for a test suite */
async function before() {

  TestContext.newItId();

  PlatformAPIClient.setManagementUser();
  await AdministrationService.createOrganization({ requestBody: organization });

  const orgctx = {
    organizationName: organizationName,
  }

  PlatformAPIClient.setApiUser();

  await Promise.all([
    EnvironmentsService.createEnvironment({ ...orgctx, requestBody: environment1 }),
    EnvironmentsService.createEnvironment({ ...orgctx, requestBody: environment2 }),
  ]);

  let updateEnvDetails = (response: { headers: Record<string, string>; body: EnvironmentResponse; }): void => {
    environmentDetails.set(response.body.name, response.body);
  }

  await Promise.all([
    EnvironmentsService.getEnvironment({ ...orgctx, envName: environment1.name }).then(updateEnvDetails),
    EnvironmentsService.getEnvironment({ ...orgctx, envName: environment2.name }).then(updateEnvDetails),
  ]);

  await Promise.all([
    ApisService.createApi({ ...orgctx, apiName: apiName1, requestBody: apiSpec1 }),
    ApisService.createApi({ ...orgctx, apiName: apiName2, requestBody: apiSpec2 }),
    ApisService.createApi({ ...orgctx, apiName: apiName3, requestBody: apiSpec3 }),
  ]);

  await Promise.all([
    ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct1 }),
    ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct2 }),
    ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct3 }),
    ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct4 }),
    ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct5 }),
    ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct6 }),
  ]);

  await Promise.all([
    TeamsService.createTeam({ ...orgctx, requestBody: team1 }),
    TeamsService.createTeam({ ...orgctx, requestBody: team2 }),
  ]);

  SolaceCloudClientFactory.initialize(env.solaceCloudBaseUrl, env.solaceCloudToken);
}

/** beforeEach hook for a test suite */
function beforeEach() {
  TestContext.newItId();
  PlatformAPIClient.setApiUser();
};

/**
 * Registers an `after()` hook for a team-application test suite.
 * 
 * The `after()` hook deletes the organization (and all resources that are part of it) and logs
 * a ">>> Finished" message.
 * 
 * **Important:**
 * 
 * If the title of the parent test suite matches the start of the title of the team-application
 * test suite, the hooks will be registered for the parent test suite instead.
 * 
 * This improves the test execution time when tests from multiple test suites are executed.
 * 
 * @param suite The team-application test suite.
 */
export function addAfterHooks(suite: Suite) {

  const parent = suite.parent;

  if (parent.title && suite.title.startsWith(parent.title)) {
    if (parent.ctx["AfterHooks"]) { return; }
    suite = parent;
    parent.ctx["AfterHooks"] = true;
  }

  suite.afterAll(async () => {
    await after();
    TestLogger.logMessage(suite.title, ">>> Finished");
  });
}

/** after hook for a test suite */
async function after() {
  PlatformAPIClient.setManagementUser();
  await AdministrationService.deleteOrganization({ organizationName: organizationName }).catch(() => { });
};