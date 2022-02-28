import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import {
  ApiError,
  APIProduct,
  APIProductAccessLevel,
  ApiProductsService,
  ClientOptionsGuaranteedMessaging,
  Protocol,
} from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const apiProductName: string = "apiProduct";
  const apiProductBase: APIProduct = {
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

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProductName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should create an API product", async function () {

    const apiProduct: APIProduct = { ...apiProductBase };

    const response = await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create API; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.eql(apiProduct);
  });

  it("should create an API product with optional parameters", async function () {

    const apiProduct: APIProduct = {
      ...apiProductBase,
      approvalType: APIProduct.approvalType.MANUAL,
      attributes: [{
        name: "language",
        value: "EN,DE",
      }],
      clientOptions: {
        guaranteedMessaging: {
          requireQueue: true,
          accessType: ClientOptionsGuaranteedMessaging.accessType.EXCLUSIVE,
          maxTtl: 6000,
          maxMsgSpoolUsage: 10,
        },
      },
      accessLevel: APIProductAccessLevel.INTERNAL,
    }

    const response = await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create API; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.eql(apiProduct);
  });

  it("should not create an API product if the user is not authorized", async function () {

    const apiProduct: APIProduct = { ...apiProductBase };

    PlatformAPIClient.setManagementUser();
    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not create an API product if the name is already used", async function () {

    const apiProduct: APIProduct = { ...apiProductBase };

    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct });
    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400, 422]);
    });
  });

  it("should not create an API product if an unknown API is referenced", async function () {

    const apiProduct: APIProduct = {
      ...apiProductBase,
      apis: [setup.apiName1, "unknown", setup.apiName2],
    }

    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not create an API product if an unknown environment is referenced", async function () {

    const apiProduct: APIProduct = {
      ...apiProductBase,
      environments: [setup.environment1.name, "unknown", setup.environment2.name],
    }

    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not create an API product if an invalid protocol is referenced", async function () {

    // NOTE: Currently, the protocol name is checked only. The protocol version does not need to
    //       match the version of a protocol in any of the environments.

    const apiProduct: APIProduct = {
      ...apiProductBase,
      protocols: [{
        name: Protocol.name.HTTPS,
        version: "1.1",
      }],
    }

    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not create an API product if an invalid attribute is specified", async function () {

    const apiProduct: APIProduct = {
      ...apiProductBase,
      attributes: [{ name: "", value: "" }],
    }

    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });
});