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

  beforeEach(async function () {
    await ApisService.createApi({ ...orgctx, apiName: apiName, requestBody: apiSpec });
  });

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await ApisService.deleteApi({ ...orgctx, apiName: apiName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should update the API spec", async function () {

    const changedApiSpec = JSON.parse(apiSpec);

    changedApiSpec.info.version = "v2";
    delete changedApiSpec.channels["say/hello/{language}"].publish;

    const apiPatch = {
      ...orgctx,
      apiName: apiName,
      requestBody: JSON.stringify(changedApiSpec),
    }

    const response = await ApisService.updateApi(apiPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update API; error="${reason.body.message}"`);
    });

    changedApiSpec.info['x-origin'] = {
      name: "apim-connector",
      vendor: "solace",
    };

    expect(response.body, "response is not correct").to.be.eql(changedApiSpec);
  });

  it("should update the API spec when If-Match header is used", async function () {

    const response = await ApisService.getApi({ ...orgctx, apiName: apiName });
    const etag = response.headers['etag'];

    const apiPatch = {
      ...orgctx,
      apiName: apiName,
      ifMatch: etag,
      requestBody: apiSpec,
    }

    await ApisService.updateApi(apiPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update API; error="${reason.body.message}"`);
    });
  });

  it("should not update an API if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ApisService.updateApi({ ...orgctx, apiName: apiName, requestBody: apiSpec }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not update an API if the If-Match header is invalid", async function () {

    const apiPatch = {
      ...orgctx,
      apiName: apiName,
      ifMatch: "0815",
      requestBody: apiSpec,
    }

    await ApisService.updateApi(apiPatch).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([412]);
    });
  });

  it("should not update an API if the specification is invalid", async function () {

    const apiPatch = {
      ...orgctx,
      apiName: apiName,
      requestBody: "{}",
    }

    await ApisService.updateApi(apiPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not update an API if the API has changed", async function () {

    const response = await ApisService.getApi({ ...orgctx, apiName: apiName });
    const etag = response.headers['etag'];

    const changedApiSpec = JSON.parse(apiSpec);

    changedApiSpec.info.version = "v2";
    delete changedApiSpec.channels["say/hello/{language}"].publish;

    const apiPatch1 = {
      ...orgctx,
      apiName: apiName,
      ifMatch: etag,
      requestBody: changedApiSpec,
    }

    const apiPatch2 = {
      ...orgctx,
      apiName: apiName,
      ifMatch: etag,
      requestBody: apiSpec,
    }

    // NOTE: The 2nd update must be submitted AFTER the 1st update has been processed, or
    //       otherwise, both updates will get processed. This is because the ETag is
    //       calculated based on the data in the database and as long as the data hasn't
    //       been updated, the "old" ETag will still be valid.

    await ApisService.updateApi(apiPatch1);
    await ApisService.updateApi(apiPatch2).then(() => {
      expect.fail("concurrent update request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([412]);
    });
  });

  it("should not update an API that does not exist", async function () {

    await ApisService.updateApi({ ...orgctx, apiName: "unknown", requestBody: apiSpec }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});