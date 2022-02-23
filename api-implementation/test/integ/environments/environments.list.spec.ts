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

  type SortDirection = "asc" | "desc";
  type ListFormat = "summary" | "full";

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const environmentName1: string = "environment1";
  const environment1: Environment = {
    name: environmentName1,
    description: "test environment 1",
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
    description: "test environment 2",
    serviceId: setup.solaceCloudServiceId2,
    exposedProtocols: [
      {
        name: Protocol.name.SECURE_MQTT,
        version: "3.1.1"
      },
      {
        name: Protocol.name.HTTPS,
        version: "1.1"
      },
    ],
  }

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    PlatformAPIClient.setApiUser();
    await Promise.all([
      EnvironmentsService.createEnvironment({ ...orgctx, requestBody: environment1 }),
      EnvironmentsService.createEnvironment({ ...orgctx, requestBody: environment2 }),
    ]);
  });

  after(async function () {
    PlatformAPIClient.setApiUser();
    await Promise.all([
      EnvironmentsService.deleteEnvironment({ ...orgctx, envName: environmentName1 }).catch(() => { }),
      EnvironmentsService.deleteEnvironment({ ...orgctx, envName: environmentName2 }).catch(() => { }),
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return all environments", async function () {

    const options = {
      ...orgctx,
      format: "summary" as ListFormat,
    }

    const response = await EnvironmentsService.listEnvironments(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list environments; error="${reason.body.message}"`);
    });

    expect(response.body, "number of environments is not correct").to.have.lengthOf(2);
    expect(response.body, "response is not correct").to.have.deep.members([environment1, environment2]);
    // expect(response.body, "response is not correct").to.deep.include(environment1);

    // // check messaging protocols in response

    // expect(response.body, "response is not correct").to.have.property("messagingProtocols");
    // environment1.exposedProtocols.forEach((protocol) => {

    //   const p = response.body.messagingProtocols.find(p => p.protocol.name == protocol.name);

    //   expect(p, `protocol ${protocol.name} is missing`).to.be.not.undefined;
    //   expect(p, `protocol ${protocol.name} is not correct`).to.have.property("uri").that.is.not.empty;
    // });

    // // check that serviceId, serviceName and msgVpnName have a value

    // expect(response.body, "response is not correct").to.have.property("serviceId").that.is.not.empty;
    // expect(response.body, "response is not correct").to.have.property("serviceName").that.is.not.empty;
    // expect(response.body, "response is not correct").to.have.property("msgVpnName").that.is.not.empty;
  });

  it("should return all environments for page #1", async function () {

    const options = {
      ...orgctx,
      pageSize: 1,
      pageNumber: 1,
      format: "summary" as ListFormat,
    }

    const response = await EnvironmentsService.listEnvironments(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list environments; error="${reason.body.message}"`);
    });

    expect(response.body, "number of environments is not correct").to.have.lengthOf(1);
  });

  it("should return all environments for page #2", async function () {

    const options = {
      ...orgctx,
      pageSize: 1,
      pageNumber: 2,
      format: "summary" as ListFormat,
    }

    const response = await EnvironmentsService.listEnvironments(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list environments; error="${reason.body.message}"`);
    });

    expect(response.body, "number of environments is not correct").to.have.lengthOf(1);
  });

  it("should return all environments sorted in ascending order", async function () {

    const options = {
      ...orgctx,
      sortFieldName: "name",
      sortDirection: "asc" as SortDirection,
      format: "summary" as ListFormat,
    }

    const response = await EnvironmentsService.listEnvironments(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list environments; error="${reason.body.message}"`);
    });

    expect(response.body, "number of environments is not correct").to.have.lengthOf(2);
    expect(response.body, "response is not correct").to.have.deep.members(
      [environment1, environment2].sort((a, b) => (a.name > b.name ? 1 : -1))
    );
  });

  it("should return all environments sorted in descending order", async function () {

    const options = {
      ...orgctx,
      sortFieldName: "name",
      sortDirection: "desc" as SortDirection,
      format: "summary" as ListFormat,
    }

    const response = await EnvironmentsService.listEnvironments(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list environments; error="${reason.body.message}"`);
    });

    expect(response.body, "number of environments is not correct").to.have.lengthOf(2);
    expect(response.body, "response is not correct").to.have.deep.members(
      [environment1, environment2].sort((a, b) => (a.name > b.name ? -1 : 1))
    );
  });

  it("should return all environments in full format", async function () {

    const options = {
      ...orgctx,
      pageSize: 1,
      pageNumber: 1,
      sortFieldName: "name",
      sortDirection: "asc" as SortDirection,
      format: "full" as ListFormat,
    }

    const response = await EnvironmentsService.listEnvironments(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list environments; error="${reason.body.message}"`);
    });

    expect(response.body, "number of environments is not correct").to.have.lengthOf(1);

    const environment = response.body[0];
    expect(environment, "response is not correct").to.deep.include(environment1);

    expect(environment, "response is not correct").to.have.property("msgVpnName").that.is.not.empty;
    expect(environment, "response is not correct").to.have.property("messagingProtocols");

    environment1.exposedProtocols.forEach((protocol) => {
      const p = environment.messagingProtocols.find(p => p.protocol.name == protocol.name);
      expect(p, `protocol ${protocol.name} is missing`).to.be.not.undefined;
      expect(p, `protocol ${protocol.name} is not correct`).to.have.property("uri").that.is.not.empty;
    });
  });

  it("should not return environments if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await EnvironmentsService.listEnvironments({ ...orgctx }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

});
