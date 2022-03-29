import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { AsyncAPIHelper } from "../../lib/test.helpers";
import { ApiError, APIImport, ApisService } from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);
const apisDirectory = `${setup.resourcesDirectory}/apis`;

describe(scriptName, function () {

  type ApiSortDirection = "asc" | "desc";
  type ApiFormat = "compact" | "summary" | "extended";

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const apiName1: string = "SayHelloApi";
  const apiSpec1: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${apisDirectory}/say-hello.yml`);

  const apiName2: string = "API-M-Account-Service";
  const apiSpec2: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${apisDirectory}/account-service.yml`);

  const apiEventPortalId2: string = "30gb615l9re";

  const apiName3: string = "API-M-Email-Service";
  const apiSpec3: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${apisDirectory}/email-service.yml`);

  const apiEventPortalId3: string = "g7r2vc60i1j";

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {

    const apiImport: APIImport = {
      source: APIImport.source.EVENT_APIPRODUCT,
    }

    PlatformAPIClient.setApiUser();
    await Promise.all([
      ApisService.createApi({ ...orgctx, apiName: apiName1, requestBody: apiSpec1 }),
      ApisService.importApi({ ...orgctx, requestBody: { ...apiImport, id: apiEventPortalId2 } }),
      ApisService.importApi({ ...orgctx, requestBody: { ...apiImport, id: apiEventPortalId3 } }),
    ]);
  });

  after(async function () {
    PlatformAPIClient.setApiUser();
    await Promise.all([
      ApisService.deleteApi({ ...orgctx, apiName: apiName1 }).catch(() => { }),
      ApisService.deleteApi({ ...orgctx, apiName: apiName2 }).catch(() => { }),
      ApisService.deleteApi({ ...orgctx, apiName: apiName3 }).catch(() => { }),
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return all APIs", async function () {

    const options = {
      ...orgctx,
      format: "compact" as ApiFormat,
    }

    const response = await ApisService.listApis(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API info; error="${reason.body.message}"`);
    });

    expect(response.body, "number of APIs is not correct").to.have.lengthOf(3);
    expect(response.body, "response is not correct").to.have.members([
      apiName1, apiName2, apiName3
    ]);
  });

  it("should return all APIs for page #1", async function () {

    const options = {
      ...orgctx,
      pageSize: 2,
      pageNumber: 1,
      format: "compact" as ApiFormat,
    }

    const response = await ApisService.listApis(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list APIs; error="${reason.body.message}"`);
    });

    expect(response.body, "number of APIs is not correct").to.have.lengthOf(2);
  });

  it("should return all APIs for page #2", async function () {

    const options = {
      ...orgctx,
      pageSize: 2,
      pageNumber: 2,
      format: "compact" as ApiFormat,
    }

    const response = await ApisService.listApis(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list APIs; error="${reason.body.message}"`);
    });

    expect(response.body, "number of APIs is not correct").to.have.lengthOf(1);
  });

  it("should return APIs sorted in ascending order", async function () {

    const options = {
      ...orgctx,
      sortFieldName: "name",
      sortDirection: "asc" as ApiSortDirection,
      format: "compact" as ApiFormat,
    }

    const response = await ApisService.listApis(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list APIs; error="${reason.body.message}"`);
    });

    expect(response.body, "number of APIs is not correct").to.have.lengthOf(3);
    expect(response.body, "order of APIs is not correct").to.have.members(
      [apiName1, apiName2, apiName3].sort((a, b) => (a > b ? 1 : -1))
    );
  });

  it("should return APIs sorted in descending order", async function () {

    const options = {
      ...orgctx,
      sortFieldName: "name",
      sortDirection: "desc" as ApiSortDirection,
      format: "compact" as ApiFormat,
    }

    const response = await ApisService.listApis(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list APIs; error="${reason.body.message}"`);
    });

    expect(response.body, "number of APIs is not correct").to.have.lengthOf(3);
    expect(response.body, "order of APIs is not correct").to.have.members(
      [apiName1, apiName2, apiName3].sort((a, b) => (a > b ? -1 : 1))
    );
  });

  it("should return APIs in summary format", async function () {

    const options = {
      ...orgctx,
      pageSize: 1,
      pageNumber: 1,
      sortFieldName: "name",
      sortDirection: "asc" as ApiSortDirection,
      format: "summary" as ApiFormat,
    }

    const response = await ApisService.listApis(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get APIs; error="${reason.body.message}"`);
    });

    expect(response.body, "number of returned APIs is not correct").to.have.lengthOf(1);

    const apiUser: string = await PlatformAPIClient.getOpenApiUser();
    const apiSpec = JSON.parse(apiSpec2);

    const apiData = response.body[0];

    expect(apiData, "response is not correct").to.be.eql({
      createdBy: apiUser,
      description: apiSpec.info?.description,
      name: apiName2,
      source: APIImport.source.EVENT_APIPRODUCT,
    });
  });

  it("should return APIs in extended format", async function () {

    const options = {
      ...orgctx,
      pageSize: 1,
      pageNumber: 3,
      sortFieldName: "name",
      sortDirection: "asc" as ApiSortDirection,
      format: "extended" as ApiFormat,
    }

    const response = await ApisService.listApis(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get APIs; error="${reason.body.message}"`);
    });

    expect(response.body, "number of returned APIs is not correct").to.have.lengthOf(1);

    const apiUser: string = await PlatformAPIClient.getOpenApiUser();
    const apiData = response.body[0];

    expect(apiData, "response is not correct").to.deep.include({
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
    expect(apiData, "response is not correct").to.have.property("createdTime").that.is.a('number');
  });

  it("should return APIs with filter: search for a single word", async function () {

    // Search: APIs that contain the term 'hello'
    // Result: apiName1

    await checkApiListWithFilter("hello", [apiName1]);
  });

  it("should return APIs with filter: match any terms", async function () {

    // Search: APIs that contain the term 'account' or 'email'
    // Result: apiName2, apiName3

    await checkApiListWithFilter("account email", [apiName2, apiName3]);
  });

  it("should return APIs with filter: match a phrase", async function () {

    // Search: APIs that contain the phrase 'first name'
    // Result: apiName2, apiName3

    await checkApiListWithFilter(`"first name"`, [apiName2, apiName3]);
  });

  it("should return APIs with filter: exclude results that contain a term", async function () {

    // Search: APIs that contain the term 'service' but not the term 'account'
    // Result: apiName3

    await checkApiListWithFilter("service -account", [apiName3]);
  });

  it("should return APIs with filter: match all terms", async function () {

    // Search: APIs that contain the term 'name' and the term 'email'
    // Result: apiName2, apiName3

    // Note: When using a filter with multiple terms in double quotes, the service
    //       does NOT return all APIs that contain both terms. Instead, the
    //       service will return all APIs that match at least one term exactly and
    //       that match all other terms partially (e.g., the term "ser" match the
    //       terms "user" or "service" partially).
    //       It is NOT possible to search for an exact match of two or more terms!

    await checkApiListWithFilter(`"name" "email"`, [apiName2, apiName3]);
  });

  it("should not return APIs if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ApisService.listApis({ ...orgctx }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  // HELPER

  const checkApiListWithFilter = async (filter: string, apiNames: Array<string>): Promise<void> => {

    const options = {
      ...orgctx,
      format: "compact" as ApiFormat,
      filter: filter,
    }

    const response = await ApisService.listApis(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list APIs; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.have.members(apiNames);
  }

});