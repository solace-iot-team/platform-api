import 'mocha';
import { expect } from 'chai';
import path from 'path';
import yaml from 'js-yaml';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { AsyncAPIHelper } from "../../lib/test.helpers";
import { ApiError, ApisService } from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);
const apisDirectory: string = `${setup.resourcesDirectory}/apis`;

describe(scriptName, function () {

  type ApiFormat = "application/json" | "application/x-yaml";

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const apiName: string = "SayHelloApi";
  const apiSpec: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${apisDirectory}/say-hello.yml`);

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    PlatformAPIClient.setApiUser();
    await ApisService.createApi({ ...orgctx, apiName: apiName, requestBody: apiSpec });
  });

  after(async function () {
    PlatformAPIClient.setApiUser();
    await ApisService.deleteApi({ ...orgctx, apiName: apiName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return the API spec in JSON format", async function () {

    const options = {
      ...orgctx,
      apiName: apiName,
      format: "application/json" as ApiFormat,
    }

    const response = await ApisService.getApi(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API spec; error="${reason.body.message}"`);
    });

    const baseApiSpec = JSON.parse(apiSpec);
    baseApiSpec.info['x-origin'] = { name: "apim-connector", vendor: "solace" };

    expect(response.body, "response is not correct").to.be.eql(baseApiSpec);
  });

  it("should return the API spec in YAML format", async function () {

    const options = {
      ...orgctx,
      apiName: apiName,
      format: "application/x-yaml" as ApiFormat,
    }

    const response = await ApisService.getApi(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API spec; error="${reason.body.message}"`);
    });

    let apiSpecFromResponse: any;
    try {
      apiSpecFromResponse = yaml.load(response.body);
    } catch (e) {
      expect.fail(`failed to parse API spec from response; error=${e.message}`);
    }

    const baseApiSpec = JSON.parse(apiSpec);
    baseApiSpec.info['x-origin'] = { name: "apim-connector", vendor: "solace" };

    expect(apiSpecFromResponse, "response is not correct").to.be.eql(baseApiSpec);
  });

  it("should not return the API spec if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ApisService.getApi({ ...orgctx, apiName: apiName }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not return the API spec if the API is unknown", async function () {

    await ApisService.getApi({ ...orgctx, apiName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});