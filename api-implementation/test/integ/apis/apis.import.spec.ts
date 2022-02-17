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

  const apiName: string = "API-M Account Service";
  const apiSpec: string = AsyncAPIHelper.loadYamlFileAsJsonString(`${apisDirectory}/account-service.yml`);

  const apiEventPortalId: string = "30gb615l9re";

  const apiImport: APIImport = {
    source: APIImport.source.EVENT_APIPRODUCT,
    id: apiEventPortalId,
    overwrite: false,
  }

  // HOOKS

  setup.addBeforeHooks(this);

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await ApisService.deleteApi({ ...orgctx, apiName: apiName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should import an API", async function () {

    const response = await ApisService.importApi({ ...orgctx, requestBody: apiImport }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to import API; error="${reason.body.message}"`);
    });

    const baseApiSpec = JSON.parse(apiSpec);

    delete baseApiSpec.info['x-generated-time'];
    baseApiSpec.info['x-origin'] = { name: "event-portal", vendor: "solace" };

    expect(response.body, "response is not correct").to.be.eql(baseApiSpec);
  });

  it("should re-import an API if overwrite is allowed", async function () {

    const apiImportReplace: APIImport = {
      ...apiImport,
      overwrite: true,
    }

    await ApisService.importApi({ ...orgctx, requestBody: apiImport });
    await ApisService.importApi({ ...orgctx, requestBody: apiImportReplace }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to re-import API; error="${reason.body.message}"`);
    });
  });

  it("should not import an API if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ApisService.importApi({ ...orgctx, requestBody: apiImport }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not import an API if the ID is unknown", async function () {

    const apiImportUnknown: APIImport = {
      source: APIImport.source.EVENT_APIPRODUCT,
      id: "unknown",
    }

    await ApisService.importApi({ ...orgctx, requestBody: apiImportUnknown }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400, 500]);
    });
  });

  it("should not re-import an API if overwrite is not allowed", async function () {

    await ApisService.importApi({ ...orgctx, requestBody: apiImport });
    await ApisService.importApi({ ...orgctx, requestBody: apiImport }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400, 422]);
    });
  });

});