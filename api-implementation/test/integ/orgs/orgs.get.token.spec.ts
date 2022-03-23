import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { ManagementService, Organization } from '../../lib/generated/openapi';
import { AdministrationService, ApiError } from '../../lib/generated/openapi';

import * as setup from './common/test.setup';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { TestContext } from '../../lib/test.helpers';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const organization1: Organization = {
    name: "organization1",
    'cloud-token': setup.solaceCloudToken,
  }

  const organization2: Organization = {
    name: "organization2",
    'cloud-token': {
      cloud: { baseUrl: setup.solaceCloudBaseUrl, token: setup.solaceCloudToken },
      eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: setup.solaceEventPortalToken },
    },
  }

  const organization3: Organization = {
    name: "organization3",
  }

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    TestContext.newItId();
    PlatformAPIClient.setManagementUser();
    await Promise.all([
      AdministrationService.createOrganization({ requestBody: organization1 }),
      AdministrationService.createOrganization({ requestBody: organization2 }),
      AdministrationService.createOrganization({ requestBody: organization3 }),
    ]);
  });

  beforeEach(function () {
    PlatformAPIClient.setApiUser();
  });

  after(async function () {
    TestContext.newItId();
    PlatformAPIClient.setManagementUser();
    await Promise.all([
      AdministrationService.deleteOrganization({ organizationName: organization1.name }),
      AdministrationService.deleteOrganization({ organizationName: organization2.name }),
      AdministrationService.deleteOrganization({ organizationName: organization3.name }),
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return the token for an organization", async function () {

    const response = await ManagementService.getToken({ organizationName: organization1.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get token; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.eql(organization1['cloud-token']);
  });

  it("should return the token for an organization with cloud and event portal token", async function () {

    const response = await ManagementService.getToken({ organizationName: organization2.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get token; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.deep.include(organization2['cloud-token']);
  });

  it("should not return a token if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await ManagementService.getToken({ organizationName: organization1.name }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not return a token if the organization is unknown", async function () {

    await ManagementService.getToken({ organizationName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

  it("should not return a token if not token is defined", async function () {

    await ManagementService.getToken({ organizationName: organization3.name }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});
