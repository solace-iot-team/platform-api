import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
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

  // Note: This test suite tests an API that is implemented in the ApisService (not the ApiProductsService).
  //       However, the tested functionality is related to API products and therefore the tests are part of
  //       an API product test suite.

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const apiProductName1: string = "apiProduct1";
  const apiProduct1: APIProduct = {
    name: apiProductName1,
    displayName: "API product 1",
    apis: [setup.apiName1],
    attributes: [{ name: "language", value: "DE,EN" }],
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

  const apiProductName2: string = "apiProduct2";
  const apiProduct2: APIProduct = {
    name: apiProductName2,
    displayName: "API product 2",
    apis: [setup.apiName2, setup.apiName3],
    attributes: [],
    environments: [setup.environment2.name],
    protocols: [{
      name: Protocol.name.SECURE_MQTT,
      version: '3.1.1',
    }, {
      name: Protocol.name.HTTPS,
      version: '1.1',
    }],
    pubResources: [],
    subResources: [],
  }

  const apiProductName3: string = "apiProduct3";
  const apiProduct3: APIProduct = {
    name: apiProductName3,
    displayName: "API product 3",
    apis: [setup.apiName1, setup.apiName2, setup.apiName3],
    attributes: [{ name: "language", value: "EN" }],
    environments: [setup.environment1.name, setup.environment2.name],
    protocols: [{
      name: Protocol.name.MQTT,
      version: '3.1.1',
    }, {
      name: Protocol.name.SECURE_MQTT,
      version: '3.1.1',
    }, {
      name: Protocol.name.HTTP,
      version: '1.1',
    }, {
      name: Protocol.name.HTTPS,
      version: '1.1',
    }],
    pubResources: [],
    subResources: [],
  }

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    PlatformAPIClient.setApiUser();
    await Promise.all([
      ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct1 }),
      ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct2 }),
      ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct3 }),
    ]);
  });

  after(async function () {
    PlatformAPIClient.setApiUser();
    await Promise.all([
      ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProduct1.name }),
      ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProduct2.name }),
      ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProduct3.name }),
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return all API products for an API", async function () {

    const options = {
      ...orgctx,
      apiName: setup.apiName1,
    }

    const response = await ApisService.getApiReferencedByApiProducts(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list API products; error="${reason.body.message}"`);
    });

    expect(response.body, "number of API products is not correct").to.have.lengthOf(2);

    const apiProducts = [apiProduct1, apiProduct3].map((product) => ({
      name: product.name,
      displayName: product.displayName,
    }));
    expect(response.body, "response is not correct").to.have.deep.members(apiProducts);
  });

  it("should return no API products for an unsed API", async function () {

    const options = {
      ...orgctx,
      apiName: "unused",
    }

    const response = await ApisService.getApiReferencedByApiProducts(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list API products; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.an('array').that.is.empty;
  });

  it("should not return any API products if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ApisService.getApiReferencedByApiProducts({ ...orgctx, apiName: setup.apiName1 }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

});