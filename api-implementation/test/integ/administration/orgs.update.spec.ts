import 'mocha';
import { expect } from 'chai';
import path from 'path';
import type { Organization } from '../../lib/generated/openapi';
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
    await AdministrationService.deleteOrganization({ ...orgctx }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should update the cloud token for an organization", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': {
        cloud: { baseUrl: setup.solaceCloudBaseUrl, token: setup.solaceCloudToken },
        eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: setup.solaceEventPortalToken },
      },
    }

    await AdministrationService.createOrganization({ requestBody: organization });

    const organizationPatch: Organization = {
      name: organizationName,
      'cloud-token': setup.solaceCloudToken,
    }

    const response = await AdministrationService.updateOrganization({ ...orgctx, requestBody: organizationPatch }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update organization; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").that.has.property("cloud-token").that.is.a("string").that.is.not.empty;
  });

  it("should not update an organization if the user is not authorized", async function () {

    const organization: Organization = {
      name: organizationName,
    }

    await AdministrationService.createOrganization({ requestBody: organization });

    const organizationPatch: Organization = {
      name: organizationName,
      'cloud-token': setup.solaceCloudToken,
    }

    PlatformAPIClient.setApiUser();

    await AdministrationService.updateOrganization({ ...orgctx, requestBody: organizationPatch }).then(() => {
      expect.fail("an unauthorized user updated an organization");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not update an organization that does not exist", async function () {

    const organizationPatch: Organization = {
      name: "unknown",
      'cloud-token': setup.solaceCloudToken,
    }

    await AdministrationService.updateOrganization({ organizationName: "unknown", requestBody: organizationPatch }).then(() => {
      expect.fail("an unknown organization was updated");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([404]);
    });
  });

  it("should not update an organization if the new cloud token is invalid", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': setup.solaceCloudToken,
    }

    await AdministrationService.createOrganization({ requestBody: organization });

    const organizationPatch: Organization = {
      name: organizationName,
      'cloud-token': "invalid",
    }

    await AdministrationService.updateOrganization({ ...orgctx, requestBody: organizationPatch }).then(() => {
      expect.fail("an organization was updated with an invalid token");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([400]);
    });
  });

});
