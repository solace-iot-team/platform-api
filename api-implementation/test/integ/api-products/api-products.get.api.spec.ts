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

    verifyApiSpec(response.body, JSON.parse(setup.apiSpec1));
  });

  it("should return the API spec in YAML format", async function () {

    const options = {
      ...apiprodctx,
      apiName: setup.apiName2,
      format: "application/x-yaml" as ApiSpecFormat,
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

    verifyApiSpec(apiSpecFromResponse, JSON.parse(setup.apiSpec2));
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

  // HELPER

  const verifyApiSpec = (apiSpec: any, baseApiSpec: any): void => {

    // Note: When an API spec is used in an API product, it contains more information than the
    //       API spec that was used to create the corresponding API.

    // check 'info' section

    expect(apiSpec.info, `info section is not correct`).to.deep.include(baseApiSpec.info);
    expect(apiSpec.info, `info section is not correct`).to.have.property("x-origin").that.includes({
      "name": "apim-connector",
      "vendor": "solace",
    });

    // check 'channels' section

    for (const topic in baseApiSpec.channels) {

      // The 'channels' section of an API product API spec contains information about protocol
      // bindings and the protocol bindings depend on the list of protocols of the API product.

      const a = apiSpec.channels[topic];
      const e = baseApiSpec.channels[topic];

      if (e.publish) {
        expect(a.publish, `channel section ${topic} is not correct`).to.deep.include(e.publish);
        expect(a.publish, `channel section ${topic} is not correct`).to.have.nested.property(
          "bindings.mqtt"
        ).that.has.all.keys(["qos", "bindingVersion"]);
      } else {
        expect(a.publish, `channel section ${topic} is not correct`).is.undefined;
      }

      if (e.subscribe) {
        expect(a.subscribe, `channel section ${topic} is not correct`).to.deep.include(e.subscribe);
        expect(a.subscribe, `channel section ${topic} is not correct`).to.have.nested.property(
          "bindings.mqtt"
        ).that.has.all.keys(["qos", "bindingVersion"]);
      } else {
        expect(a.subscribe, `channel section ${topic} is not correct`).is.undefined;
      }
    }

    // check 'components' section

    expect(apiSpec.components, `components section is not correct`).to.deep.include(baseApiSpec.components);
  }

});