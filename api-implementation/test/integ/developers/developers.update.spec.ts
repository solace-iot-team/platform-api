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

  it("should update the email address", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });

    const developerPatch = {
      ...orgctx,
      developerUsername: developer.userName,
      requestBody: {
        email: "someone@mycompany.com"
      },
    }

    const response = await DevelopersService.updateDeveloper(developerPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer; error="${reason.body.message}"`);
    });

    const updatedDeveloper: Developer = {
      ...developer,
      ...developerPatch.requestBody,
    }

    expect(response.body, "response is not correct").to.be.eql(updatedDeveloper);
  });

  it("should update the first and last name", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });

    const developerPatch = {
      ...orgctx,
      developerUsername: developer.userName,
      requestBody: {
        firstName: "anotherFirstName",
        lastName: "anotherLastName",
      },
    }

    const response = await DevelopersService.updateDeveloper(developerPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer; error="${reason.body.message}"`);
    });

    const updatedDeveloper: Developer = {
      ...developer,
      ...developerPatch.requestBody,
    }

    expect(response.body, "response is not correct").to.be.eql(updatedDeveloper);
  });

  it("should update the attributes", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });

    const developerPatch = {
      ...orgctx,
      developerUsername: developer.userName,
      requestBody: {
        attributes: [{
          name: "age",
          value: "43",
        }]
      },
    }

    const response = await DevelopersService.updateDeveloper(developerPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer; error="${reason.body.message}"`);
    });

    const updatedDeveloper: Developer = {
      ...developer,
      ...developerPatch.requestBody,
    }

    expect(response.body, "response is not correct").to.be.eql(updatedDeveloper);
  });

  it("should update a developer when If-Match header is used", async function () {

    const response = await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });
    const etag = response.headers['etag'];

    const developerPatch = {
      ...orgctx,
      developerUsername: developer.userName,
      ifMatch: etag,
      requestBody: {
        attributes: [{
          name: "age",
          value: "43",
        }]
      },
    }

    await DevelopersService.updateDeveloper(developerPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update developer; error="${reason.body.message}"`);
    });
  });

  it("should not update a developer if the user is not authorized", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });

    const developerPatch = {
      ...orgctx,
      developerUsername: developer.userName,
      requestBody: {
        email: "someone@mycompany.com",
      },
    }

    PlatformAPIClient.setManagementUser();

    await DevelopersService.updateDeveloper(developerPatch).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not update a developer if the If-Match header is invalid", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });

    const developerPatch = {
      ...orgctx,
      developerUsername: developer.userName,
      ifMatch: "5678",
      requestBody: {
        firstName: "anotherFirstName",
      },
    }

    await DevelopersService.updateDeveloper(developerPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([412]);
    });
  });

  it("should not update a developer if the request is invalid", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });

    const developerPatch = {
      ...orgctx,
      developerUsername: developer.userName,
      requestBody: {
        email: "developer",
      },
    }

    await DevelopersService.updateDeveloper(developerPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not update a developer if the request has unexpected parameters", async function () {

    await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });

    const developerPatch = {
      ...orgctx,
      developerUsername: developer.userName,
      requestBody: {
        email: "developer@mycompany.com",
        userName: "anotherUserName",
      },
    }

    await DevelopersService.updateDeveloper(developerPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not update a developer that does not exist", async function () {

    const developerPatch = {
      ...orgctx,
      developerUsername: "unknown",
      requestBody: {},
    }

    await DevelopersService.updateDeveloper(developerPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

  it("should not update a developer if the developer has changed", async function () {

    const response = await DevelopersService.createDeveloper({ ...orgctx, requestBody: developer });
    const etag = response.headers['etag'];

    const developerPatch1 = {
      ...orgctx,
      developerUsername: developer.userName,
      ifMatch: etag,
      requestBody: {
        firstName: "anotherFirstName",
      },
    }

    const developerPatch2 = {
      ...orgctx,
      developerUsername: developer.userName,
      ifMatch: etag,
      requestBody: {
        lastName: "anotherLastName",
      },
    }

    // NOTE: The 2nd update must be submitted AFTER the 1st update has been processed, or
    //       otherwise, both updates will get processed. This is because the ETag is
    //       calculated based on the data in the database and as long as the data hasn't
    //       been updated, the "old" ETag will still be valid.

    await DevelopersService.updateDeveloper(developerPatch1);
    await DevelopersService.updateDeveloper(developerPatch2).then(() => {
      expect.fail("concurrent update request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([412]);
    });
  });

});
