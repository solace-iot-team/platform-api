import { Suite } from 'mocha';
import path from 'path';
import { PlatformAPIClient } from '../../../lib/api.helpers';
import {
  getMandatoryEnvVarValue,
  TestContext,
} from "../../../lib/test.helpers";

const scriptName: string = path.basename(__filename);

const env = {
  solaceCloudBaseUrl: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_URL'),
  solaceCloudToken: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_CLOUD_TOKEN'),
  solaceEventPortalBaseUrl: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_EVENT_PORTAL_URL'),
  solaceEventPortalToken: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_SOLACE_EVENT_PORTAL_TOKEN'),
}

/** The base URL for the Solace Cloud API. */
export const solaceCloudBaseUrl: string = env.solaceCloudBaseUrl;

/** The token for the Solace Cloud API. */
export const solaceCloudToken: string = env.solaceCloudToken;

/** The base URL for the Solace Cloud Event Portal API. */
export const solaceEventPortalBaseUrl: string = env.solaceEventPortalBaseUrl;

/** The token for the Solace Cloud Event Portal API. */
export const solaceEventPortalToken: string = env.solaceEventPortalToken;

/**
 * Setup a test suite for administration service tests.
 * 
 * This method adds `beforeEach()` and `afterEach()` hooks.
 * 
 * The `beforeEach()` hook generates a new identifier for the {@link TestContext} and
 * configures the {@link PlatformAPIClient} to use the management user.
 * 
 * The `afterEach()` hook configures the {@link PlatformAPIClient} to use the management user.
 * 
 * @param suite The test suite.
 */
 export function setupSuite(suite: Suite) {
  suite.beforeEach(beforeEach);
  suite.afterEach(afterEach);
}

/** beforeEach hook for a test suite */
function beforeEach() {
  TestContext.newItId();
  PlatformAPIClient.setManagementUser();
};

/** afterEach hook for a test suite */
function afterEach() {
  PlatformAPIClient.setManagementUser();
};
