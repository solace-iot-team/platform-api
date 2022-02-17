import { Suite } from 'mocha';
import path from 'path';
import {
  getMandatoryEnvVarValue,
  TestContext,
  TestLogger,
} from "../../../lib/test.helpers";
import { PlatformAPIClient } from '../../../lib/api.helpers';
import type { Organization } from "../../../lib/generated/openapi";
import { AdministrationService } from "../../../lib/generated/openapi";

const scriptName: string = path.basename(__filename);

const env = {
  solaceCloudBaseUrl: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_URL'),
  solaceCloudToken: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_TOKEN'),
  solaceEventPortalBaseUrl: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_EVENT_PORTAL_URL'),
  solaceEventPortalToken: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_EVENT_PORTAL_TOKEN'),
  solaceCloudServiceId1: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_SERVICE_ID_DEV'),
  solaceCloudServiceId2: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_SERVICE_ID_PROD'),
}

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
 * Registers `before()` and `beforeEach()` hooks for a developer service test suite.
 * 
 * The `before()` hook logs a ">>> Start to execute test cases" message and all environment
 * variables that are used, and creates the {@link organization}.
 * 
 * The `beforeEach()` hook generates a new identifier for the {@link TestContext} and
 * configures the {@link PlatformAPIClient} to use the API user.
 * 
 * **Important:**
 * 
 * If the title of the parent test suite matches the start of the title of the developer
 * service test suite, the hooks will be registered for the parent test suite instead.
 * 
 * This improves the test execution time when developer service tests from multiple test
 * suites are executed.
 * 
 * @param suite The developer service test suite.
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
}

/** beforeEach hook for a test suite */
function beforeEach() {
  TestContext.newItId();
  PlatformAPIClient.setApiUser();
}

/**
 * Registers an `after()` hook for a developer service test suite.
 * 
 * The `after()` hook deletes the {@link organization} (and all resources that are part of
 * it) and logs a ">>> Finished" message.
 * 
 * **Important:**
 * 
 * If the title of the parent test suite matches the start of the title of the developer
 * service test suite, the hooks will be registered for the parent test suite instead.
 * 
 * This improves the test execution time when developer service tests from multiple test
 * suites are executed.
 * 
 * @param suite The developer service test suite.
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
  TestContext.newItId();
  PlatformAPIClient.setManagementUser();
  await AdministrationService.deleteOrganization({ organizationName: organizationName }).catch(() => {
    // ignore
  });
}