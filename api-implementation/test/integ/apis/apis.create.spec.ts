import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { AsyncAPIHelper } from "../../lib/test.helpers";
import { ApiError, ApisService } from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const apiName: string = "SayHelloApi";
  const apiSpec: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${setup.resourcesDirectory}/apis/say-hello.yml`);

  // HOOKS

  setup.addBeforeHooks(this);

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await ApisService.deleteApi({ ...orgctx, apiName: apiName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should create an API", async function () {

    const response = await ApisService.createApi({ ...orgctx, apiName: apiName, requestBody: apiSpec }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create API; error="${reason.body.message}"`);
    });

    const baseApiSpec = JSON.parse(apiSpec);
    baseApiSpec.info['x-origin'] = { name: "apim-connector", vendor: "solace" };

    expect(response.body, "response is not correct").to.be.eql(baseApiSpec);
  });

  it("should not create an API if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ApisService.createApi({ ...orgctx, apiName: apiName, requestBody: apiSpec }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not create an API if the name is already used", async function () {

    await ApisService.createApi({ ...orgctx, apiName: apiName, requestBody: apiSpec });
    await ApisService.createApi({ ...orgctx, apiName: apiName, requestBody: apiSpec }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400, 422]);
    });
  });

  it("should not create an API if the specification is invalid", async function () {

    await ApisService.createApi({ ...orgctx, apiName: apiName, requestBody: "{}" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });
});