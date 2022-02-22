import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import {
  ApiError,
  APIProduct,
  ApiProductsService,
  Protocol,
} from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const apiProductName: string = "apiProduct";
  const apiProduct: APIProduct = {
    name: apiProductName,
    displayName: "API product",
    apis: [setup.apiName1],
    attributes: [],
    environments: [setup.environment1.name],
    protocols: [{
      name: Protocol.name.MQTT,
      version: '3.1.1',
    }, {
      name: Protocol.name.HTTP,
      version: '1.1',
    }],
    pubResources: [],
    subResources: [],
  }

  // HOOKS

  setup.addBeforeHooks(this);

  beforeEach(async function () {
    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct });
  });

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProductName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should delete an API product", async function () {

    await ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProductName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to delete API product; error="${reason.body.message}"`);
    });
  });

  it("should not delete an API product if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProductName }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  xit("should not delete an API product if used by an application", async function () {

    await ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProductName }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([409]);
    });
  });

  it("should not delete an API product that does not exist", async function () {

    await ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: "unknown" }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});