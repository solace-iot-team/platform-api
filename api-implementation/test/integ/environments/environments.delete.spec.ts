import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { AsyncAPIHelper } from '../../lib/test.helpers';
import type { APIProduct, Environment } from '../../lib/generated/openapi';
import {
  ApiError,
  ApiProductsService,
  ApisService,
  EnvironmentsService,
  Protocol,
} from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const environmentName: string = "environment";
  const environment: Environment = {
    name: environmentName,
    description: "test environment",
    serviceId: setup.solaceCloudServiceId1,
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

  const apiDirectory = `${setup.resourcesDirectory}/apis`;

  const apiName: string = "SayHelloApi";
  const apiSpec: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${apiDirectory}/say-hello.yml`);

  const apiProduct: APIProduct = {
    name: "ApiProduct",
    displayName: "API product",
    apis: [apiName],
    attributes: [],
    environments: [environmentName],
    protocols: [{ name: Protocol.name.MQTT, version: '3.1.1' }],
    pubResources: [],
    subResources: [],
  }

  // HOOKS

  setup.addBeforeHooks(this);

  beforeEach(async function () {
    PlatformAPIClient.setApiUser();
    await EnvironmentsService.createEnvironment({ ...orgctx, requestBody: environment });
  });

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProduct.name }).catch(() => { });
    await ApisService.deleteApi({ ...orgctx, apiName: apiName }).catch(() => { });
    await EnvironmentsService.deleteEnvironment({ ...orgctx, envName: environmentName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should delete an environment", async function () {

    await EnvironmentsService.deleteEnvironment({ ...orgctx, envName: environmentName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to delete environment; error="${reason.body.message}"`);
    });
  });

  it("should not delete an environment if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await EnvironmentsService.deleteEnvironment({ ...orgctx, envName: environmentName }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not delete an environment if referenced by an api product", async function () {

    await ApisService.createApi({ ...orgctx, apiName: apiName, requestBody: apiSpec });
    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct });

    await EnvironmentsService.deleteEnvironment({ ...orgctx, envName: environmentName }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([409]);
    });
  });

  it("should not delete an environment that does not exist", async function () {

    await EnvironmentsService.deleteEnvironment({ ...orgctx, envName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});
