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
import { before } from 'mocha';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  type ApiProductSortDirection = "asc" | "desc";

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const apiProductName1: string = "apiProduct1";
  const apiProduct1: APIProduct = {
    name: apiProductName1,
    displayName: "API product #1",
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
    displayName: "API product #2",
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
    displayName: "API product #3",
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
      ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProductName1 }).catch(() => { }),
      ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProductName2 }).catch(() => { }),
      ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProductName3 }).catch(() => { }),
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return all API products", async function () {

    const response = await ApiProductsService.listApiProducts({ ...orgctx }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list API products; error="${reason.body.message}"`);
    });

    expect(response.body, "number of APIs is not correct").to.have.lengthOf(3);
    expect(response.body, "response is not correct").to.have.deep.members([apiProduct1, apiProduct2, apiProduct3]);
  });

  it("should return all API products for page #1", async function () {

    const options = {
      ...orgctx,
      pageSize: 2,
      pageNumber: 1,
    }

    const response = await ApiProductsService.listApiProducts(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list API products; error="${reason.body.message}"`);
    });

    expect(response.body, "number of APIs is not correct").to.have.lengthOf(2);
  });

  it("should return all API products for page #2", async function () {

    const options = {
      ...orgctx,
      pageSize: 2,
      pageNumber: 2,
    }

    const response = await ApiProductsService.listApiProducts(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list API products; error="${reason.body.message}"`);
    });

    expect(response.body, "number of APIs is not correct").to.have.lengthOf(1);
  });

  it("should return all API products sorted in ascending order", async function () {

    const options = {
      ...orgctx,
      sortFieldName: "name",
      sortDirection: "asc" as ApiProductSortDirection,
    }

    const response = await ApiProductsService.listApiProducts(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list API products; error="${reason.body.message}"`);
    });

    expect(response.body, "number of APIs is not correct").to.have.lengthOf(3);
    expect(response.body, "response is not correct").to.have.deep.members(
      [apiProduct2, apiProduct1, apiProduct3].sort((a, b) => (a.name > b.name ? 1 : -1))
    );
  });

  it("should return all API products sorted in descending order", async function () {

    const options = {
      ...orgctx,
      sortFieldName: "name",
      sortDirection: "desc" as ApiProductSortDirection,
    }

    const response = await ApiProductsService.listApiProducts(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list API products; error="${reason.body.message}"`);
    });

    expect(response.body, "number of APIs is not correct").to.have.lengthOf(3);
    expect(response.body, "response is not correct").to.have.deep.members(
      [apiProduct2, apiProduct1, apiProduct3].sort((a, b) => (a.name > b.name ? -1 : 1))
    );
  });

  it("should return API products with filter: search for a single word", async function () {

    // Search: API products that reference API #1
    // Result: apiProduct1 and apiProduct3

    await checkApiProductListWithFilter(`${setup.apiName1}`, [apiProduct1.name, apiProduct3.name]);
  });

  it("should return API products with filter: match any terms", async function () {

    // Search: API product #1 and API product #2 by name
    // Result: apiProduct1 and apiProduct2

    const filter = `${apiProduct1.name} ${apiProduct2.name}`;
    await checkApiProductListWithFilter(filter, [apiProduct1.name, apiProduct2.name]);
  });

  it("should return API products with filter: match a phrase", async function () {

    // Search: API products that reference protocol "secure-mqtt"
    // Result: apiProduct2 and apiProduct3

    // Note: The dash is used as delimiter for tokenization. When searching for
    //       something like 'secure-mqtt', the search string must be quoted.

    await checkApiProductListWithFilter(`"secure-mqtt"`, [apiProduct2.name, apiProduct3.name]);
  });

  it("should return API products with filter: exclude results that contain a term", async function () {

    // Search: API products that reference protocol "mqtt" (but not "secure-mqtt"
    // Result: apiProduct1

    // Note: The dash is used as delimiter for tokenization. Thus, "secure-mqtt" is
    //       treated as the two terms "secure" and "mqtt".

    await checkApiProductListWithFilter("mqtt -secure", [apiProduct1.name]);
  });

  it("should return API products with filter: match all terms", async function () {

    // Search: API products that reference API #1, #2 and #3
    // Result: apiProduct3

    // Note: When using a filter with multiple terms in double quotes, the service
    //       does NOT return all applications that contain both terms. Instead,
    //       the service will return all applications that match at least one term
    //       exactly and that match all other terms partially (e.g., the term "api"
    //       or "prod" match the term "apiProduct" partially).
    //       It is NOT possible to search for an exact match of two or more terms!

    const filter = `"${setup.apiName1}" "${setup.apiName2}" "${setup.apiName3}"`;
    await checkApiProductListWithFilter(filter, [apiProduct3.name]);
  });

  it("should not return API products if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ApiProductsService.listApiProducts({ ...orgctx }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  // HELPER

  const checkApiProductListWithFilter = async (filter: string, apiProductNames: Array<string>): Promise<void> => {

    const options = {
      ...orgctx,
      filter: filter,
    }

    const response = await ApiProductsService.listApiProducts(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list API products; error="${reason.body.message}"`);
    });

    const names = response.body.map(apiProduct => apiProduct.name);
    expect(names, "response is not correct").to.have.members(apiProductNames);
  }
});