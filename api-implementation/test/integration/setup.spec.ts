import path from 'path';
import { getBaseUrl, getMandatoryEnvVarValue, getOptionalEnvVarValue, TestLogger } from "../lib/test.helpers";
import { PlatformAPIClient } from '../lib/api.helpers';

const enableLoggingEnvVar: string = getOptionalEnvVarValue('APIM_INTEGRATION_TEST_ENABLE_LOGGING');
TestLogger.setLogging(enableLoggingEnvVar != null && enableLoggingEnvVar.toLowerCase() == "true" ? true : false);
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// TestLogger.setLogging(false);
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const scriptName: string = path.basename(__filename);
TestLogger.logMessage(scriptName, ">>> initializing ...");
const testEnv = {
  PLATFORM_PROTOCOL: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_PROTOCOL'),
  PLATFORM_HOST: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_HOST'),
  PLATFORM_PORT: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_PORT'),
  PLATFORM_ADMIN_USER: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_ADMIN_USER'),
  PLATFORM_ADMIN_PASSWORD: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_ADMIN_PASSWORD'),
  ORG_API_USR: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_ORG_API_USR'),
  ORG_API_PWD: getMandatoryEnvVarValue(scriptName, 'APIM_INTEGRATION_TEST_ORG_API_PWD'),
}
TestLogger.logMessage(scriptName, `testEnv = ${JSON.stringify(testEnv, null, 2)}`);
TestLogger.logMessage(scriptName, ">>> success.");


before(async() => {
  const base: string = getBaseUrl(testEnv.PLATFORM_PROTOCOL, testEnv.PLATFORM_HOST, testEnv.PLATFORM_PORT);
  PlatformAPIClient.initialize(base, testEnv.PLATFORM_ADMIN_USER, testEnv.PLATFORM_ADMIN_PASSWORD, testEnv.ORG_API_USR, testEnv.ORG_API_PWD);
});


