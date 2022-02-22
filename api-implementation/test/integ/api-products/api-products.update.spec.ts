import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import {
  ApiError,
  APIProduct,
  APIProductPatch,
  ApiProductsService,
  ClientOptions,
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
    PlatformAPIClient.setApiUser();
    await ApiProductsService.createApiProduct({ ...orgctx, requestBody: apiProduct });
  });

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await ApiProductsService.deleteApiProduct({ ...orgctx, apiProductName: apiProductName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should update the display name", async function () {
    await checkUpdate({ displayName: "updated display name" });
  });

  it("should update the APIs", async function () {
    await checkUpdate({ apis: [setup.apiName2, setup.apiName3] });
  });

  it("should update the environments", async function () {
    await checkUpdate({ environments: [setup.environment1.name, setup.environment2.name] });
  });

  it("should update the protocols", async function () {
    await checkUpdate({ protocols: [{ name: Protocol.name.JMS, version: '1.1' }] });
  });

  it("should update the client options", async function () {

    const clientOptions: ClientOptions = {
      guaranteedMessaging: {
        requireQueue: true,
        accessType: ClientOptionsGuaranteedMessaging.accessType.EXCLUSIVE,
        maxTtl: 3600,
        maxMsgSpoolUsage: 10,
      },
    }

    await checkUpdate({ clientOptions: clientOptions });
  });

  it("should not update an API product if the user is not authorized", async function () {

    const apiProductPatch = {
      ...orgctx,
      apiProductName: apiProductName,
      requestBody: {
        displayName: "updated api product"
      },
    }

    PlatformAPIClient.setManagementUser();
    await ApiProductsService.updateApiProduct(apiProductPatch).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not update an API if an unknown API is referenced", async function () {

    const apiProductPatch = {
      ...orgctx,
      apiProductName: apiProductName,
      requestBody: {
        apis: [setup.apiName2, "unknown"],
      },
    }

    await ApiProductsService.updateApiProduct(apiProductPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  xit("should not update an API if an unknown environment is referenced", async function () {

    const apiProductPatch = {
      ...orgctx,
      apiProductName: apiProductName,
      requestBody: {
        environments: [setup.environment1.name, "unknown", setup.environment2.name],
      },
    }

    await ApiProductsService.updateApiProduct(apiProductPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not update an API if an invalid protocol is referenced", async function () {

    const apiProductPatch = {
      ...orgctx,
      apiProductName: apiProductName,
      requestBody: {
        protocols: [{
          name: Protocol.name.AMQP,
          version: '1.1',
        }, {
          name: Protocol.name.MQTT,
          version: '3.1.1',
        }],
      },
    }

    await ApiProductsService.updateApiProduct(apiProductPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  xit("should not update an API if a referenced protocol becomes invalid", async function () {

    // NOTE: The update wants to change the environment from environment #1 to environment #2
    //       without changing the protocols. However, the configured protocols are not valid
    //       for the updated environment.

    const apiProductPatch = {
      ...orgctx,
      apiProductName: apiProductName,
      requestBody: {
        environments: [setup.environment2.name],
      },
    }

    await ApiProductsService.updateApiProduct(apiProductPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not update an API product that does not exist", async function () {

    const apiProductPatch = {
      ...orgctx,
      apiProductName: "unknown",
      requestBody: {
        displayName: "updated api product"
      },
    }

    await ApiProductsService.updateApiProduct(apiProductPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

  // HELPER

  const checkUpdate = async (apiProductPatch: APIProductPatch): Promise<void> => {

    const request = {
      ...orgctx,
      apiProductName: apiProductName,
      requestBody: apiProductPatch,
    }

    const response = await ApiProductsService.updateApiProduct(request).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update API product; error="${reason.body.message}"`);
    });

    const updatedApiProduct: APIProduct = {
      ...apiProduct,
      ...apiProductPatch,
    }

    expect(response.body, "response is not correct").to.be.eql(updatedApiProduct);
  }

});