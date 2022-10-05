import path from 'path';
import s from 'shelljs';
import {
  getBaseUrl,
  getMandatoryEnvVarValue,
  getOptionalEnvVarValue,
  TestContext,
  TestLogger,
} from "../lib/test.helpers";
import { PlatformAPIClient } from '../lib/api.helpers';
import request from 'supertest';
import server from '../../server/index';

const scriptName: string = path.basename(__filename);
const scriptDir: string = path.dirname(__filename);

const enableLoggingEnvVar: string = getOptionalEnvVarValue('PLATFORM_API_TEST_ENABLE_LOGGING');
const enableLogging: boolean = (enableLoggingEnvVar != null && enableLoggingEnvVar.toLowerCase() == "true" ? true : false)

TestLogger.setLogging(enableLogging);

const testEnv = {
  protocol: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_PLATFORM_PROTOCOL'),
  host: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_PLATFORM_HOST'),
  port: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_PLATFORM_PORT'),
  adminUser: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_PLATFORM_ADMIN_USER'),
  adminPassword: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_PLATFORM_ADMIN_PASSWORD'),
  apiUser: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_ORG_ADMIN_USER'),
  apiPassword: getMandatoryEnvVarValue(scriptName, 'PLATFORM_API_TEST_ORG_ADMIN_PASSWORD'),
}

const mongodbDirectory: string = `${scriptDir}/../mongodb`;

export async function mochaGlobalSetup() {

  TestContext.newItId();
  TestLogger.logTestEnv(scriptName, testEnv);

  TestLogger.logMessage(scriptName, "setup Mongo DB and server");
  const code = s.exec(`${mongodbDirectory}/standup.mongo.sh 2>&1`, { silent: false }).code
  if (code != 0) {
    TestLogger.logMessage(scriptName, "setup of Mongo DB failed");
  }

  const base: string = getBaseUrl(testEnv.protocol, testEnv.host, testEnv.port);
  PlatformAPIClient.initialize(base, testEnv.adminUser, testEnv.adminPassword, testEnv.apiUser, testEnv.apiPassword);
  await delay(15000);
  await request(server).get("/index.html").expect(function (res: any) {
    TestLogger.logMessage(scriptName, `res = ${JSON.stringify(res, null, 2)}`);
  }).expect(200);

  TestLogger.logMessage(scriptName, "setup finished");
}

export async function mochaGlobalTeardown() {

  TestLogger.logMessage(scriptName, "teardown Mongo DB and server");
  const code = s.exec(`${mongodbDirectory}/teardown.mongo.sh 2>&1`, { silent: false }).code
  if (code != 0) {
    TestLogger.logMessage(scriptName, "teardown of Mongo DB failed");
  }

  TestLogger.logMessage(scriptName, "teardown finished");
}

function delay(ms: number): Promise<void> {
  const increment = 2000;
 
  return new Promise((resolve) => {
    
    setTimeout(resolve, ms);
  });
}