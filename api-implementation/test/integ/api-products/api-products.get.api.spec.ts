import 'mocha';
import { expect } from 'chai';
import path from 'path';
import yaml from 'js-yaml';
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

  type ApiSpecFormat = "application/json" | "application/x-yaml";

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

  it("should return the API spec in JSON format", async function () {

    const options = {
      ...apiprodctx,
      apiName: setup.apiName1,
      format: "application/json" as ApiSpecFormat,
    }

    const response = await ApiProductsService.getApiProductApiSpecification(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to return APIs; error="${reason.body.message}"`);
    });

    const baseApiSpec = JSON.parse(setup.apiSpec1);
    baseApiSpec.info['x-origin'] = { name: "apim-connector", vendor: "solace" };

    expect(response.body, "response is not correct").to.be.eql(baseApiSpec);
  });

  it("should return the API spec in JSON format", async function () {

    const options = {
      ...apiprodctx,
      apiName: setup.apiName1,
      format: "application/json" as ApiSpecFormat,
    }

    const response = await ApiProductsService.getApiProductApiSpecification(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to return APIs; error="${reason.body.message}"`);
    });

    let apiSpecFromResponse: any;
    try {
      apiSpecFromResponse = yaml.load(response.body);
    } catch (e) {
      expect.fail(`failed to parse API spec from response; error=${e.message}`);
    }

    const baseApiSpec = JSON.parse(setup.apiSpec1);
    baseApiSpec.info['x-origin'] = { name: "apim-connector", vendor: "solace" };

    expect(apiSpecFromResponse, "response is not correct").to.be.eql(baseApiSpec);
  });

  it("should not return the API spec if the user is not authorized", async function () {

    const options = {
      ...apiprodctx,
      apiName: setup.apiName1,
    }

    PlatformAPIClient.setManagementUser();
    await ApiProductsService.getApiProductApiSpecification(options).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not return the API spec if the API is unknown", async function () {

    const options = {
      ...apiprodctx,
      apiName: "unknown",
    }

    await ApiProductsService.getApiProductApiSpecification(options).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});