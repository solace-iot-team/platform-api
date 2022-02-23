import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import type { Environment } from '../../lib/generated/openapi';
import {
  ApiError,
  EnvironmentsService,
  Protocol,
} from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const environmentName: string = "environment";
  const environmentBase: Environment = {
    name: environmentName,
    description: "test environment",
    serviceId: setup.solaceCloudServiceId1,
    exposedProtocols: [
      {
        name: Protocol.name.MQTT,
        version: "3.1.1"
      },
      {
        name: Protocol.name.HTTP,
        version: "1.1"
      }
    ],
  }

  // HOOKS

  setup.addBeforeHooks(this);

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await EnvironmentsService.deleteEnvironment({ ...orgctx, envName: environmentName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should create an environment", async function () {

    const request = {
      ...orgctx,
      requestBody: { ...environmentBase },
    }

    const response = await EnvironmentsService.createEnvironment(request).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create environment; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.eql(request.requestBody);
  });

  it("should not create an environment if the user is not authorized", async function () {

    const request = {
      ...orgctx,
      requestBody: { ...environmentBase },
    }

    PlatformAPIClient.setManagementUser();
    await EnvironmentsService.createEnvironment(request).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not create an environment if the name is invalid", async function () {

    const request = {
      ...orgctx,
      requestBody: {
        ...environmentBase,
        name: "",
      },
    }

    await EnvironmentsService.createEnvironment(request).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  xit("should not create an environment if the display name is invalid", async function () {

    const request = {
      ...orgctx,
      requestBody: {
        ...environmentBase,
        displayName: "$$ env $$",
      },
    }

    await EnvironmentsService.createEnvironment(request).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not create an environment if the name is already used", async function () {

    const request = {
      ...orgctx,
      requestBody: { ...environmentBase },
    }

    await EnvironmentsService.createEnvironment(request);
    await EnvironmentsService.createEnvironment(request).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not create an environment if the service ID is unknown", async function () {

    const request = {
      ...orgctx,
      requestBody: {
        ...environmentBase,
        serviceId: "unknown",
      },
    }

    await EnvironmentsService.createEnvironment(request).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not create an environment if the service ID is already used", async function () {

    const request1 = {
      ...orgctx,
      requestBody: { ...environmentBase },
    }

    const request2 = {
      ...orgctx,
      requestBody: {
        ...environmentBase,
        name: "anotherEnvironment",
      },
    }

    await EnvironmentsService.createEnvironment(request1);
    await EnvironmentsService.createEnvironment(request2).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not create an environment if no protocols are exposed", async function () {

    const request = {
      ...orgctx,
      requestBody: {
        ...environmentBase,
        exposedProtocols: [],
      },
    }

    await EnvironmentsService.createEnvironment(request).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not create an environment if an exposed protocol is invalid", async function () {

    const request = {
      ...orgctx,
      requestBody: {
        ...environmentBase,
        exposedProtocols: [{
          name: Protocol.name.MQTT,
          version: "v5",
        }],
      },
    }

    await EnvironmentsService.createEnvironment(request).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

});
