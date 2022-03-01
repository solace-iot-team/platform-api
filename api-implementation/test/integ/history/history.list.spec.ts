import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { AdministrationService, ApisService, Environment, EnvironmentPatch, OpenAPI } from '../../lib/generated/openapi';
import {
  ApiError,
  EnvironmentsService,
  ManagementService,
} from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  type SortDirection = "asc" | "desc";

  const organizationName: string = setup.organizationName;
  const orgctx = {
    organizationName: organizationName,
  }

  const environmentName1: string = setup.environment1.name;
  const environmentName2: string = setup.environment2.name;

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    PlatformAPIClient.setApiUser();
    await EnvironmentsService.createEnvironment({ ...orgctx, requestBody: setup.environment1 });
    await EnvironmentsService.createEnvironment({ ...orgctx, requestBody: setup.environment2 });
    await EnvironmentsService.updateEnvironment({ ...orgctx, envName: environmentName1, requestBody: {} });
    await EnvironmentsService.deleteEnvironment({ ...orgctx, envName: environmentName2 });
    await ApisService.createApi({ ...orgctx, apiName: setup.apiName, requestBody: setup.apiSpec });
  });

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
  });

  after(async function () {
    await Promise.all([
      EnvironmentsService.deleteEnvironment({ ...orgctx, envName: environmentName1 }),
      ApisService.deleteApi({ ...orgctx, apiName: setup.apiName }),
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return all history entries", async function () {

    const response = await ManagementService.listHistory({ ...orgctx }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list history; error="${reason.body.message}"`);
    });

    expect(response.body, "number of entries is not correct").to.have.lengthOf(5);

    const apiUser = await PlatformAPIClient.getOpenApiUser();
    const history = response.body;

    expect(history[0], "entry #1 is not correct").to.deep.include({
      operation: "PUT",
      requestBody: setup.apiSpec,
      user: `${apiUser} (${apiUser})`,
      responseCode: 201,
    });

    expect(history[1], "entry #2 is not correct").to.deep.include({
      operation: "DELETE",
      requestBody: {},
      user: `${apiUser} (${apiUser})`,
      responseCode: 204,
    });

    expect(history[2], "entry #3 is not correct").to.deep.include({
      operation: "PATCH",
      requestBody: {},
      user: `${apiUser} (${apiUser})`,
      responseCode: 200,
    });

    expect(history[3], "entry #4 is not correct").to.deep.include({
      operation: "POST",
      requestBody: setup.environment2,
      user: `${apiUser} (${apiUser})`,
      responseCode: 201,
    });

    expect(history[4], "entry #5 is not correct").to.deep.include({
      operation: "POST",
      requestBody: setup.environment1,
      user: `${apiUser} (${apiUser})`,
      responseCode: 201,
    });
  });

  it("should return all history entries for page #1", async function () {

    const options = {
      ...orgctx,
      pageSize: 3,
      pageNumber: 1,
    }

    const response = await ManagementService.listHistory(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list history; error="${reason.body.message}"`);
    });

    expect(response.body, "number of entries is not correct").to.have.lengthOf(3);
  });

  it("should return all history entries for page #2", async function () {

    const options = {
      ...orgctx,
      pageSize: 3,
      pageNumber: 2,
    }

    const response = await ManagementService.listHistory(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list history; error="${reason.body.message}"`);
    });

    expect(response.body, "number of entries is not correct").to.have.lengthOf(2);
  });

  it("should not return the history if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ManagementService.listHistory({ ...orgctx }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

});
