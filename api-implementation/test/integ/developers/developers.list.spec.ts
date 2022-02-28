import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { TestContext } from '../../lib/test.helpers';
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

  const developer1: Developer = {
    email: "developer1@mycompany.com",
    firstName: "firstNameA",
    lastName: "lastNameA",
    userName: `developer1@${setup.organizationName}`,
  }

  const developer2: Developer = {
    email: "developer2@mycompany.com",
    firstName: "firstNameB",
    lastName: "lastNameB",
    userName: `developer2@${setup.organizationName}`,
    attributes: [{
      name: "location",
      value: "DE",
    }],
  }

  const developer3: Developer = {
    email: "developer3@mycompany.com",
    firstName: "firstNameC",
    lastName: "lastNameC",
    userName: `developer3@${setup.organizationName}`,
    attributes: [{
      name: "location",
      value: "US",
    }],
  }

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    TestContext.newItId();
    PlatformAPIClient.setApiUser();
    await Promise.all([
      DevelopersService.createDeveloper({ ...orgctx, requestBody: developer1 }),
      DevelopersService.createDeveloper({ ...orgctx, requestBody: developer2 }),
      DevelopersService.createDeveloper({ ...orgctx, requestBody: developer3 }),
    ]);
  });

  after(async function () {
    TestContext.newItId();
    await Promise.all([
      DevelopersService.deleteDeveloper({ ...orgctx, developerUsername: developer1.userName }),
      DevelopersService.deleteDeveloper({ ...orgctx, developerUsername: developer2.userName }),
      DevelopersService.deleteDeveloper({ ...orgctx, developerUsername: developer3.userName }),
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return all developers", async function () {

    const response = await DevelopersService.listDevelopers({ ...orgctx }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list developers; error="${reason.body.message}"`);
    });

    const developers: Developer[] = response.body;

    expect(developers, "number of developers is not correct").to.have.lengthOf(3);
    expect(developers, "list of developers is not correct").to.have.deep.members([developer1, developer2, developer3]);
  });

  it("should return all developers for page #1", async function () {

    const response = await DevelopersService.listDevelopers({ ...orgctx, pageSize: 2, pageNumber: 1 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list developers; error="${reason.body.message}"`);
    });

    expect(response.body, "number of developers is not correct").to.have.lengthOf(2);
  });

  it("should return all developers for page #2", async function () {

    const response = await DevelopersService.listDevelopers({ ...orgctx, pageSize: 2, pageNumber: 2 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list developers; error="${reason.body.message}"`);
    });

    expect(response.body, "number of developers is not correct").to.have.lengthOf(1);
  });

  it("should return all developers sorted in ascending order", async function () {

    const response = await DevelopersService.listDevelopers({ ...orgctx, sortFieldName: "userName", sortDirection: "asc" }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list developers; error="${reason.body.message}"`);
    });

    const developers: Developer[] = response.body;
    expect(developers, "list of developers is not correct").to.have.deep.ordered.members(
      [developer1, developer2, developer3].sort((a, b) => (a.userName > b.userName ? 1 : -1))
    );
  });

  it("should return all developers sorted in descending order", async function () {

    const response = await DevelopersService.listDevelopers({ ...orgctx, sortFieldName: "userName", sortDirection: "desc" }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list developers; error="${reason.body.message}"`);
    });

    const developers: Developer[] = response.body;
    expect(developers, "list of developers is not correct").to.have.deep.ordered.members(
      [developer1, developer2, developer3].sort((a, b) => (a.userName > b.userName ? -1 : 1))
    );
  });

  it("should not return any developers if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();

    await DevelopersService.listDevelopers({ ...orgctx }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not return any developers if the page size is invalid", async function () {

    await DevelopersService.listDevelopers({ ...orgctx, pageSize: -1 }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([400]);
    });
  });

  it("should not return any developers if the page number is invalid", async function () {

    await DevelopersService.listDevelopers({ ...orgctx, pageNumber: 0 }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([400]);
    });
  });

});
