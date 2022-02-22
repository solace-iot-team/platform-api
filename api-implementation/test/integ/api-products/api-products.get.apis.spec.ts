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
    apis: [setup.apiName1, setup.apiName2, setup.apiName3],
    attributes: [],
    environments: [setup.environment1.name, setup.environment2.name],
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

  const apiprodctx = {
    ...orgctx,
    apiProductName: apiProductName,
  }

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    PlatformAPIClient.setApiUser();
    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct });
  });

  after(async function () {
    PlatformAPIClient.setApiUser();
    await ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProductName });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return all API names", async function () {

    const response = await ApiProductsService.listApiProductApis({ ...apiprodctx }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to return APIs; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.have.members(apiProduct.apis);
  });

  it("should not return APIs if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ApiProductsService.listApiProductApis({ ...apiprodctx }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not return APIs for an API product that does not exist", async function () {

    await ApiProductsService.listApiProductApis({ ...orgctx, apiProductName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});