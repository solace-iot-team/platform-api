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
  const environment: Environment = {
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

  before(async function () {
    PlatformAPIClient.setApiUser();
    await EnvironmentsService.createEnvironment({ ...orgctx, requestBody: environment });
  });

  after(async function () {
    PlatformAPIClient.setApiUser();
    await EnvironmentsService.deleteEnvironment({ ...orgctx, envName: environmentName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return an environment", async function () {

    const options = {
      ...orgctx,
      envName: environmentName,
    }

    const response = await EnvironmentsService.getEnvironment(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to delete environment; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.deep.include(environment);

    // check messaging protocols in response

    expect(response.body, "response is not correct").to.have.property("messagingProtocols");

    environment.exposedProtocols.forEach((protocol) => {
      const p = response.body.messagingProtocols.find(p => p.protocol.name == protocol.name);
      expect(p, `protocol ${protocol.name} is missing`).to.be.not.undefined;
      expect(p, `protocol ${protocol.name} is not correct`).to.have.property("uri").that.is.not.empty;
    });

    // check that serviceId, serviceName and msgVpnName have a value

    expect(response.body, "response is not correct").to.have.property("serviceId").that.is.not.empty;
    expect(response.body, "response is not correct").to.have.property("serviceName").that.is.not.empty;
    expect(response.body, "response is not correct").to.have.property("msgVpnName").that.is.not.empty;
  });

  it("should not return an environment if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await EnvironmentsService.getEnvironment({ ...orgctx, envName: environmentName }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not return an environment that does not exist", async function () {

    await EnvironmentsService.getEnvironment({ ...orgctx, envName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});
