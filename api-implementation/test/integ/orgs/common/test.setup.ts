import { Suite } from 'mocha';
import path from 'path';
import { PlatformAPIClient } from '../../../lib/api.helpers';
import {
  getMandatoryEnvVarValue,
  TestContext,
  TestLogger,
} from "../../../lib/test.helpers";

const scriptName: string = path.basename(__filename);

const env = {
  solaceCloudBaseUrl: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_URL'),
  solaceCloudToken: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_TOKEN'),
  solaceEventPortalBaseUrl: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_EVENT_PORTAL_URL'),
  solaceEventPortalToken: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_EVENT_PORTAL_TOKEN'),
  solaceCloudServiceId1: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_SERVICE_ID_DEV'),
  solaceCloudServiceId2: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_SERVICE_ID_PROD'),
}

/** The base URL for the Solace Cloud API. */
export const solaceCloudBaseUrl: string = env.solaceCloudBaseUrl;

/** The token for the Solace Cloud API. */
export const solaceCloudToken: string = env.solaceCloudToken;

/** The base URL for the Solace Cloud Event Portal API. */
export const solaceEventPortalBaseUrl: string = env.solaceEventPortalBaseUrl;

/** The token for the Solace Cloud Event Portal API. */
export const solaceEventPortalToken: string = env.solaceEventPortalToken;

/** The service ID of a Solace Cloud service instance. */
export const solaceCloudServiceId1: string = env.solaceCloudServiceId1;

/** The service ID of a Solace Cloud service instance. */
export const solaceCloudServiceId2: string = env.solaceCloudServiceId2;

/**
 * Registers `before()` and `beforeEach()` hooks for an administration service test suite.
 * 
 * The `before()` hook logs a ">>> Start to execute test cases" message and all environment
 * variables that are used.
 * 
 * The `beforeEach()` hook generates a new identifier for the {@link TestContext} and
 * configures the {@link PlatformAPIClient} to use the API user.
 * 
 * **Important:**
 * 
 * If the title of the parent test suite matches the start of the title of the administration
 * service test suite, the hooks will be registered for the parent test suite instead.
 * 
 * This improves the test execution time when administration service tests from multiple test
 * suites are executed.
 * 
 * @param suite The administration service test suite.
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
  });

  suite.beforeEach(beforeEach);
}

/** beforeEach hook for a test suite */
function beforeEach() {
  TestContext.newItId();
  PlatformAPIClient.setManagementUser();
};

/**
 * Registers `afterEach()` and `after()` hooks for an application service test suite.
 * 
 * The `afterEach()` hook configures the {@link PlatformAPIClient} to use the API user.
 * 
 * The `after()` hook logs a ">>> Finished" message.
 * 
 * **Important:**
 * 
 * If the title of the parent test suite matches the start of the title of the application
 * service test suite, the hooks will be registered for the parent test suite instead.
 * 
 * This improves the test execution time when application service tests from multiple test
 * suites are executed.
 * 
 * @param suite The application service test suite.
 */
 export function addAfterHooks(suite: Suite) {

  const parent = suite.parent;

  if (parent.title && suite.title.startsWith(parent.title)) {
    if (parent.ctx["AfterHooks"]) { return; }
    suite = parent;
    parent.ctx["AfterHooks"] = true;
  }

  suite.afterEach(afterEach);

  suite.afterAll(async () => {
    TestLogger.logMessage(suite.title, ">>> Finished");
  });
}

/** afterEach hook for a test suite */
function afterEach() {
  PlatformAPIClient.setManagementUser();
};
