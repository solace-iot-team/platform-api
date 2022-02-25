import 'mocha';
import { expect } from 'chai';
import path from 'path';
import type { CloudToken, Organization } from '../../lib/generated/openapi';
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

  it("should update the cloud token", async function () {

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

  it("should update the cloud and event portal URL", async function () {

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
      'cloud-token': {
        cloud: { baseUrl: setup.solaceCloudBaseUrl },
        eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl },
      },
    }

    await AdministrationService.updateOrganization({ ...orgctx, requestBody: organizationPatch }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update organization; error="${reason.body.message}"`);
    });

  });

  it("should update an organization when If-Match header is used", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': {
        cloud: { baseUrl: setup.solaceCloudBaseUrl, token: setup.solaceCloudToken },
        eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: setup.solaceEventPortalToken },
      },
    }

    const response = await AdministrationService.createOrganization({ requestBody: organization });

    const organizationPatch = {
      ...orgctx,
      ifMatch: response.headers['etag'],
      requestBody: {
        name: organizationName,
        'cloud-token': setup.solaceCloudToken,
      },
    }

    await AdministrationService.updateOrganization(organizationPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update organization; error="${reason.body.message}"`);
    });
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
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not update an organization that does not exist", async function () {

    const organizationPatch: Organization = {
      name: "unknown",
      'cloud-token': setup.solaceCloudToken,
    }

    await AdministrationService.updateOrganization({ organizationName: "unknown", requestBody: organizationPatch }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

  it("should not update an organization if the cloud token is invalid", async function () {

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
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not update an organization if the event portal URL is invalid", async function () {

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
      'cloud-token': {
        cloud: { baseUrl: setup.solaceCloudBaseUrl },
        eventPortal: { baseUrl: "https://somewhere.solace.cloud/event-portal" },
      },
    }

    await AdministrationService.updateOrganization({ ...orgctx, requestBody: organizationPatch }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not update an organization if the If-Match header is incorrect", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': setup.solaceCloudToken,
    }

    await AdministrationService.createOrganization({ requestBody: organization });

    const organizationPatch = {
      ...orgctx,
      ifMatch: "1234",
      requestBody: {
        name: organizationName,
        'cloud-token': {
          cloud: { baseUrl: setup.solaceCloudBaseUrl, token: setup.solaceCloudToken },
          eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: setup.solaceEventPortalToken },
        },
      }
    }

    await AdministrationService.updateOrganization(organizationPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([412]);
    });
  });

  it("should not update an organization if the organization has changed", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': {
        cloud: { baseUrl: setup.solaceCloudBaseUrl, token: setup.solaceCloudToken },
        eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: setup.solaceEventPortalToken },
      },
    }

    const response = await AdministrationService.createOrganization({ requestBody: organization });
    const etag = response.headers['etag'];

    const organizationPatch1 = {
      ...orgctx,
      ifMatch: etag,
      requestBody: {
        name: organizationName,
        'cloud-token': setup.solaceCloudToken,
      }
    }

    const organizationPatch2 = {
      ...orgctx,
      ifMatch: etag,
      requestBody: {
        name: organizationName,
        'cloud-token': {
          cloud: { baseUrl: setup.solaceCloudBaseUrl },
          eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl },
        },
      }
    }

    // NOTE: The 2nd update must be submitted AFTER the 1st update has been processed, or
    //       otherwise, both updates will get processed. This is because the ETag is
    //       calculated based on the data in the database and as long as the data hasn't
    //       been updated, the "old" ETag will still be valid.

    await AdministrationService.updateOrganization(organizationPatch1);
    await AdministrationService.updateOrganization(organizationPatch2).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([412]);
    });
  });

});
