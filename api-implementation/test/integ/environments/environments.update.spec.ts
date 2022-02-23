import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import type { Environment, EnvironmentPatch } from '../../lib/generated/openapi';
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

  const environmentName1: string = "environment1";
  const environment1: Environment = {
    name: environmentName1,
    description: "test environment #1",
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

  const environmentName2: string = "environment2";
  const environment2: Environment = {
    name: environmentName2,
    description: "test environment #2",
    serviceId: setup.solaceCloudServiceId2,
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

  before(async function () {
    PlatformAPIClient.setApiUser();
    await EnvironmentsService.createEnvironment({ ...orgctx, requestBody: environment1 });
  });

  beforeEach(async function () {
    PlatformAPIClient.setApiUser();
    await EnvironmentsService.createEnvironment({ ...orgctx, requestBody: environment2 });
  });

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await EnvironmentsService.deleteEnvironment({ ...orgctx, envName: environmentName2 }).catch(() => { });
  });

  after(async function () {
    await EnvironmentsService.deleteEnvironment({ ...orgctx, envName: environmentName1 }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should update the display name", async function () {
    await checkUpdate({ displayName: "updated display name" });
  });

  it("should update the description", async function () {
    await checkUpdate({ description: "updated description" });
  });

  it("should update the service ID", async function () {
    await checkUpdate({ serviceId: setup.solaceCloudServiceId2 });
  });

  it("should update the exposed protocols", async function () {

    const exposedProtocols = [{
      name: Protocol.name.SECURE_MQTT,
      version: "3.1.1"
    },
    {
      name: Protocol.name.HTTPS,
      version: "1.1"
    }];

    await checkUpdate({ exposedProtocols: exposedProtocols });
  });

  it("should update an environment when If-Match header is used", async function () {

    const response = await EnvironmentsService.getEnvironment({ ...orgctx, envName: environmentName2 });
    const etag = response.headers['etag'];

    const environmentPatch = {
      ...orgctx,
      envName: environmentName2,
      ifMatch: etag,
      requestBody: {
        displayName: "updated environment",
      },
    }

    await EnvironmentsService.updateEnvironment(environmentPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update environment; error="${reason.body.message}"`);
    });
  });

  it("should not update an environment if the user is not authorized", async function () {

    const environmentPatch = {
      ...orgctx,
      envName: environmentName2,
      requestBody: {
        displayName: "updated environment",
      },
    }

    PlatformAPIClient.setManagementUser();
    await EnvironmentsService.updateEnvironment(environmentPatch).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not update an environment if the If-Match header is invalid", async function () {

    const environmentPatch = {
      ...orgctx,
      envName: environmentName2,
      ifMatch: "0815",
      requestBody: {
        displayName: "updated environment",
      },
    }

    await EnvironmentsService.updateEnvironment(environmentPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([412]);
    });
  });

  it("should not update an environment if the display name is invalid", async function () {

    const environmentPatch = {
      ...orgctx,
      envName: environmentName2,
      requestBody: {
        displayName: "",
      },
    }

    await EnvironmentsService.updateEnvironment(environmentPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not update an environment if the service ID is unknown", async function () {

    const environmentPatch = {
      ...orgctx,
      envName: environmentName2,
      requestBody: {
        serviceId: "unknown",
      },
    }

    await EnvironmentsService.updateEnvironment(environmentPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not update an environment if the service ID is already used", async function () {

    const environmentPatch = {
      ...orgctx,
      envName: environmentName2,
      requestBody: {
        serviceId: setup.solaceCloudServiceId1, // used by environment1
      },
    }

    await EnvironmentsService.updateEnvironment(environmentPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not update an environment if no protocols are exposed", async function () {

    const environmentPatch = {
      ...orgctx,
      envName: environmentName2,
      requestBody: {
        exposedProtocols: [],
      },
    }

    await EnvironmentsService.updateEnvironment(environmentPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not update an environment if an exposed protocol is invalid", async function () {

    const environmentPatch = {
      ...orgctx,
      envName: environmentName2,
      requestBody: {
        exposedProtocols: [{
          name: Protocol.name.MQTT,
          version: "v5",
        }],
      },
    }

    await EnvironmentsService.updateEnvironment(environmentPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not update an environment if the environment has changed", async function () {

    const response = await EnvironmentsService.getEnvironment({ ...orgctx, envName: environmentName2 });
    const etag = response.headers['etag'];

    const environmentPatch1 = {
      ...orgctx,
      envName: environmentName2,
      ifMatch: etag,
      requestBody: {
        displayName: "updated environment",
      },
    }

    const environmentPatch2 = {
      ...orgctx,
      envName: environmentName2,
      ifMatch: etag,
      requestBody: {
        description: "updated description",
      },
    }

    // NOTE: The 2nd update must be submitted AFTER the 1st update has been processed, or
    //       otherwise, both updates will get processed. This is because the ETag is
    //       calculated based on the data in the database and as long as the data hasn't
    //       been updated, the "old" ETag will still be valid.

    await EnvironmentsService.updateEnvironment(environmentPatch1);
    await EnvironmentsService.updateEnvironment(environmentPatch2).then(() => {
      expect.fail("concurrent update request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([412]);
    });
  });

  it("should not update an environment that does not exist", async function () {

    const environmentPatch = {
      ...orgctx,
      envName: "unknown",
      requestBody: {
        displayName: "updated environment"
      },
    }

    await EnvironmentsService.updateEnvironment(environmentPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });

  });

  // HELPER

  const checkUpdate = async (environmentPatch: EnvironmentPatch): Promise<void> => {

    const request = {
      ...orgctx,
      envName: environmentName2,
      requestBody: environmentPatch,
    }

    const response = await EnvironmentsService.updateEnvironment(request).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update environment; error="${reason.body.message}"`);
    });

    const updatedEnvironment: Environment = {
      ...environment2,
      ...request.requestBody,
    }

    expect(response.body, "response is not correct").to.be.eql(updatedEnvironment);
  }

});
