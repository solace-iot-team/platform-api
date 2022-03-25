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

  it("should return an API product", async function () {

    const apiProduct: APIProduct = { ...apiProductBase };
    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct });

    const response = await ApiProductsService.getApiProduct({ ...orgctx, apiProductName: apiProductName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API product; error="${reason.body.message}"`);
    });

    const b = response.body;
    expect(b.meta.version, "version is not correct").to.be.equal("1.1.0");
    delete b.meta;
    expect(b, "response is not correct").to.be.eql(apiProduct);
  });

  it("should return an API product with optional parameters", async function () {

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

    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct });

    const response = await ApiProductsService.getApiProduct({ ...orgctx, apiProductName: apiProductName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API product; error="${reason.body.message}"`);
    });

    const b = response.body;
    expect(b.meta.version, "version is not correct").to.be.equal("1.1.0");
    delete b.meta;
    expect(b, "response is not correct").to.be.eql(apiProduct);
  });

  it("should not return an API product if the user is not authorized", async function () {

    const apiProduct: APIProduct = { ...apiProductBase };
    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct });

    PlatformAPIClient.setManagementUser();
    await ApiProductsService.getApiProduct({ ...orgctx, apiProductName: apiProductName }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not return an API product that does not exist", async function () {

    await ApiProductsService.getApiProduct({ ...orgctx, apiProductName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});