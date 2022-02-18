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
const apisDirectory = `${setup.resourcesDirectory}/apis`;

describe(scriptName, function () {

  type ApiSortDirection = "asc" | "desc";
  type ApiFormat = "compact" | "summary" | "extended";

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const apiName1: string = "SayHelloApi";
  const apiSpec1: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${apisDirectory}/say-hello.yml`);

  const apiName2: string = "AccountServiceApi";
  const apiSpec2: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${apisDirectory}/account-service.yml`);

  const apiProduct1: APIProduct = {
    name: "ApiProduct1",
    displayName: "API product #1",
    apis: [apiName1],
    attributes: [],
    environments: [setup.environment.name],
    protocols: [{ name: Protocol.name.MQTT, version: '3.1.1' }],
    pubResources: [],
    subResources: [],
  }

  const apiProduct2: APIProduct = {
    name: "ApiProduct2",
    displayName: "API product #2",
    apis: [apiName1],
    attributes: [{ name: "language", value: "EN" }],
    environments: [setup.environment.name],
    protocols: [{ name: Protocol.name.HTTP, version: '1.1' }],
    pubResources: [],
    subResources: [],
  }

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    PlatformAPIClient.setApiUser();
    await Promise.all([
      ApisService.createApi({ ...orgctx, apiName: apiName1, requestBody: apiSpec1 }),
      ApisService.createApi({ ...orgctx, apiName: apiName2, requestBody: apiSpec2 }),
    ]);
    await Promise.all([
      ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct1 }),
      ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct2 }),
    ]);
  });

  after(async function () {
    PlatformAPIClient.setApiUser();
    await Promise.all([
      ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProduct1.name }),
      ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProduct2.name }),
    ]);
    await Promise.all([
      ApisService.deleteApi({ ...orgctx, apiName: apiName1 }).catch(() => { }),
      ApisService.deleteApi({ ...orgctx, apiName: apiName2 }).catch(() => { }),
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return all API products for an API", async function () {

    const options = {
      ...orgctx,
      apiName: apiName1,
    }

    const response = await ApisService.getApiReferencedByApiProducts(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API info; error="${reason.body.message}"`);
    });

    expect(response.body, "number of API products is not correct").to.have.lengthOf(2);

    const apiProducts = [apiProduct1, apiProduct2].map((product) => ({
      name: product.name,
      displayName: product.displayName,
    }));
    expect(response.body, "response is not correct").to.have.deep.members(apiProducts);
  });

  it("should return no API products for an API not used", async function () {

    const options = {
      ...orgctx,
      apiName: apiName2,
    }

    const response = await ApisService.getApiReferencedByApiProducts(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API info; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.eql([]);
  });

  it("should not return any API productss if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ApisService.getApiReferencedByApiProducts({ ...orgctx, apiName: apiName1 }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

});