import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { CloudToken, ManagementService, Organization } from '../../lib/generated/openapi';
import { AdministrationService, ApiError } from '../../lib/generated/openapi';

import * as setup from './common/test.setup';
import { PlatformAPIClient } from '../../lib/api.helpers';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const organizationName: string = "organization";

  const orgctx = {
    organizationName: organizationName,
  }

  // HOOKS

  setup.addBeforeHooks(this);

  afterEach(async function () {
    PlatformAPIClient.setManagementUser();
    await AdministrationService.deleteOrganization({ ...orgctx }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should update the token of an organization", async function () {

    const organization: Organization = {
      name: organizationName,
    }

    PlatformAPIClient.setManagementUser();
    await AdministrationService.createOrganization({ requestBody: organization });

    const updateToken = {
      organizationName: organizationName,
      requestBody: setup.solaceCloudToken,
    }

    PlatformAPIClient.setApiUser();
    const response = await ManagementService.updateToken(updateToken).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update token; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.eql(setup.solaceCloudToken);
  });

  it("should update the token of an organization with cloud and event portal token", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': {
        cloud: { baseUrl: setup.solaceCloudBaseUrl, token: setup.solaceCloudToken },
        eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: setup.solaceEventPortalToken },
      },
    }

    PlatformAPIClient.setManagementUser();
    await AdministrationService.createOrganization({ requestBody: organization });

    const updateToken = {
      organizationName: organizationName,
      requestBody: setup.solaceCloudToken,
    }

    PlatformAPIClient.setApiUser();
    const response = await ManagementService.updateToken(updateToken).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update token; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.eql(setup.solaceCloudToken);
  });

  it("should not update the token of an organization if the user is not authorized", async function () {

    const organization: Organization = {
      name: organizationName,
    }

    PlatformAPIClient.setManagementUser();
    await AdministrationService.createOrganization({ requestBody: organization });

    const updateToken = {
      organizationName: organizationName,
      requestBody: setup.solaceCloudToken,
    }

    await ManagementService.updateToken(updateToken).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not update the token of an organization that does not exist", async function () {

    const updateToken = {
      organizationName: "unknown",
      requestBody: setup.solaceCloudToken,
    }

    PlatformAPIClient.setApiUser();
    await ManagementService.updateToken(updateToken).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

  it("should not update the token of an organization if the token is invalid", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': setup.solaceCloudToken,
    }

    PlatformAPIClient.setManagementUser();
    await AdministrationService.createOrganization({ requestBody: organization });

    const updateToken = {
      organizationName: organizationName,
      requestBody: "invalid",
    }

    await ManagementService.updateToken(updateToken).then(() => {
      expect.fail("an organization was updated with an invalid token");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

});
