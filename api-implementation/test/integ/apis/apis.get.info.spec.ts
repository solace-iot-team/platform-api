import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { AsyncAPIHelper } from "../../lib/test.helpers";
import { ApiError, APIImport, ApisService } from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);
const apisDirectory: string = `${setup.resourcesDirectory}/apis`;

describe(scriptName, function () {

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const apiName1: string = "SayHelloApi";
  const apiSpec1: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${apisDirectory}/say-hello.yml`);

  const apiName2: string = "API-M-Account-Service"
  const apiSpec2: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${apisDirectory}/account-service.yml`);

  const apiEventPortalId2: string = "30gb615l9re";

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    PlatformAPIClient.setApiUser();
    await Promise.all([
      ApisService.createApi({ ...orgctx, apiName: apiName1, requestBody: apiSpec1 }),
      ApisService.importApi({
        ...orgctx,
        requestBody: {
          source: APIImport.source.EVENT_APIPRODUCT, id: apiEventPortalId2,
        }
      }),
    ]);
  });

  after(async function () {
    PlatformAPIClient.setApiUser();
    await ApisService.deleteApi({ ...orgctx, apiName: apiName1 }).catch(() => { });
    await ApisService.deleteApi({ ...orgctx, apiName: apiName2 }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return the API info for an uploaded API", async function () {

    const response = await ApisService.getApiInfo({ ...orgctx, apiName: apiName1 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API info; error="${reason.body.message}"`);
    });

    const apiUser: string = await PlatformAPIClient.getOpenApiUser();

    expect(response.body, "response is incorrect").to.deep.include({
      source: "Upload",
      createdBy: apiUser,
      description: apiName1,
      name: apiName1,
      summary: apiName1,
      version: "1",
      apiParameters: [{
        name: "language",
        type: "string",
        enum: ["EN", "DE"],
      }],
    });
  });

  it("should return the API info for an imported API", async function () {

    const response = await ApisService.getApiInfo({ ...orgctx, apiName: apiName2 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API info; error="${reason.body.message}"`);
    });

    const apiUser: string = await PlatformAPIClient.getOpenApiUser();
    const apiSpec = JSON.parse(apiSpec2);

    expect(response.body, "response is incorrect").to.deep.include({
      source: APIImport.source.EVENT_APIPRODUCT,
      sourceId: apiEventPortalId2,
      createdBy: apiUser,
      description: apiSpec.info?.description,
      name: apiName2,
      summary: "",
      version: "1",
      apiParameters: [],
    });
  });

  it("should not return the API info if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ApisService.getApiInfo({ ...orgctx, apiName: apiName1 }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not return the API info if the API is unknown", async function () {

    await ApisService.getApiInfo({ ...orgctx, apiName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});