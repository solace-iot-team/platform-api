import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import type { Developer } from '../../lib/generated/openapi';
import {
  ApiError,
  DevelopersService,
} from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const developer: Developer = {
    email: "developer@mycompany.com",
    firstName: "firstName",
    lastName: "lastName",
    userName: `developer@${setup.organizationName}`,
  }

  // HOOKS

  setup.addBeforeHooks(this);

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await DevelopersService.deleteDeveloper({ ...orgctx, developerUsername: developer.userName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should create a developer", async function () {

    const response = await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create developer; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.eql(developer);
  });

  it("should create a developer with additional attributes", async function () {

    const anotherDeveloper: Developer = {
      ...developer,
      attributes: [{
        name: "country",
        value: "DE",
      }],
    }

    const response = await DevelopersService.createDeveloper({ ...orgctx, requestBody: anotherDeveloper }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create developer; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.eql(anotherDeveloper);
  });

  it("should not create a developer if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not create a developer if the user name is already used", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });
    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not create a developer if the email is invalid", async function () {

    const anotherDeveloper: Developer = {
      ...developer,
      email: "developer",
    }

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: anotherDeveloper }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not create a developer if the first name is invalid", async function () {

    const anotherDeveloper: Developer = {
      ...developer,
      firstName: "",
    }

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: anotherDeveloper }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not create a developer if the last name is invalid", async function () {

    const anotherDeveloper: Developer = {
      ...developer,
      lastName: "",
    }

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: anotherDeveloper }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not create a developer if the user name is invalid", async function () {

    const anotherDeveloper: Developer = {
      ...developer,
      userName: "",
    }

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: anotherDeveloper }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

});
