import 'mocha';
import { expect } from 'chai';
import path from 'path';
import type {
  Developer,
  DeveloperPatch,
} from '../../lib/generated/openapi';
import {
  ApiError,
  DevelopersService,
} from '../../lib/generated/openapi';

import * as setup from './common/test.setup';
import { PlatformAPIClient } from '../../lib/api.helpers';

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

  it("should update the email of a developer", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });

    const developerPatch: DeveloperPatch = {
      email: "someone@mycompany.com",
    }

    const response = await DevelopersService.updateDeveloper({
      ...orgctx, developerUsername: developer.userName, requestBody: developerPatch,
    }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to delete developer; error="${reason.body.message}"`);
    });

    const expected: Developer = {
      ...developer,
      email: developerPatch.email,
    }

    expect(response, "response is not correct").to.be.eql(expected);
  });

  it("should update the first and last name of a developer", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });

    const developerPatch: DeveloperPatch = {
      firstName: "anotherFirstName",
      lastName: "anotherLastName",
    }

    const response = await DevelopersService.updateDeveloper({
      ...orgctx, developerUsername: developer.userName, requestBody: developerPatch,
    }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to delete developer; error="${reason.body.message}"`);
    });

    const updatedDeveloper: Developer = {
      ...developer,
      firstName: developerPatch.firstName,
      lastName: developerPatch.lastName,
    }

    expect(response, "response is not correct").to.be.eql(updatedDeveloper);
  });

  it("should update attributes of a developer", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });

    const developerPatch: DeveloperPatch = {
      attributes: [{
        name: "age",
        value: "43",
      }]
    }

    const response = await DevelopersService.updateDeveloper({
      ...orgctx, developerUsername: developer.userName, requestBody: developerPatch,
    }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to delete developer; error="${reason.body.message}"`);
    });

    const updatedDeveloper: Developer = {
      ...developer,
      attributes: developerPatch.attributes,
    }

    expect(response, "response is not correct").to.be.eql(updatedDeveloper);
  });

  it("should not update a developer if the user is not authorized", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });

    const developerPatch: DeveloperPatch = {
      email: "someone@mycompany.com",
    }

    PlatformAPIClient.setManagementUser();

    await DevelopersService.updateDeveloper({
      ...orgctx, developerUsername: developer.userName, requestBody: developerPatch,
    }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not update a developer if the request is invalid", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });

    const developerPatch = {
      email: "developer",
      firstName: "firstName",
      lastName: "lastName",
    }

    await DevelopersService.updateDeveloper({
      ...orgctx, developerUsername: developer.userName, requestBody: { ...developerPatch },
    }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([400]);
    });
  });

  it("should not update a developer if the request has unexpected parameters", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });

    const developerPatch = {
      email: "developer@mycompany.com",
      userName: "anotherUserName",
    }

    await DevelopersService.updateDeveloper({
      ...orgctx, developerUsername: developer.userName, requestBody: { ...developerPatch },
    }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([400]);
    });
  });

  it("should not update a developer that does not exist", async function () {

    await DevelopersService.updateDeveloper({
      ...orgctx, developerUsername: "unknown", requestBody: {},
    }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([404]);
    });
  });

});
