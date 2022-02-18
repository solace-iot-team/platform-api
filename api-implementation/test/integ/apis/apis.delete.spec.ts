import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { AsyncAPIHelper } from "../../lib/test.helpers";
import type { APIProduct } from '../../lib/generated/openapi';
import {
  ApiError,
  ApiProductsService,
  ApisService,
  Protocol,
} from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const apiName: string = "SayHelloApi";
  const apiSpec: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${setup.resourcesDirectory}/apis/say-hello.yml`);

  const apiProduct: APIProduct = {
    name: "ApiProduct",
    displayName: "API product",
    apis: [apiName],
    attributes: [],
    environments: [setup.environment.name],
    protocols: [{ name: Protocol.name.MQTT, version: '3.1.1' }],
    pubResources: [],
    subResources: [],
  }

  // HOOKS

  setup.addBeforeHooks(this);

  beforeEach(async function () {
    await ApisService.createApi({ ...orgctx, apiName: apiName, requestBody: apiSpec });
  });

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProduct.name }).catch(() => { });
    await ApisService.deleteApi({ ...orgctx, apiName: apiName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should delete an API", async function () {

    await ApisService.deleteApi({ ...orgctx, apiName: apiName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to delete API; error="${reason.body.message}"`);
    });
  });

  it("should not delete an API if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ApisService.deleteApi({ ...orgctx, apiName: apiName }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not delete an API if used by an API product", async function () {

    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct });

    await ApisService.deleteApi({ ...orgctx, apiName: apiName }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([409]);
    });
  });

  it("should not delete an API that does not exist", async function () {

    await ApisService.deleteApi({ ...orgctx, apiName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});