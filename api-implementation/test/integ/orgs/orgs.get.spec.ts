import 'mocha';
import { expect } from 'chai';
import path from 'path';
import type { Organization } from '../../lib/generated/openapi';
import { AdministrationService, ApiError } from '../../lib/generated/openapi';

import * as setup from './common/test.setup';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { TestContext } from '../../lib/test.helpers';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const organization1: Organization = {
    name: "organization1",
  }

  const organization2: Organization = {
    name: "organization2",
    'cloud-token': setup.solaceCloudToken,
  }

  const organization3: Organization = {
    name: "organization3",
    'cloud-token': {
      cloud: { baseUrl: setup.solaceCloudBaseUrl, token: setup.solaceCloudToken },
      eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: setup.solaceEventPortalToken },
    },
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

  after(async function () {
    TestContext.newItId();
    await Promise.all([
      AdministrationService.deleteOrganization({ organizationName: organization1.name }),
      AdministrationService.deleteOrganization({ organizationName: organization2.name }),
      AdministrationService.deleteOrganization({ organizationName: organization3.name }),
    ]).catch(e => {console.log(e)});
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return an organization with name only", async function () {

    const response = await AdministrationService.getOrganization({ organizationName: organization1.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get organization; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.deep.include({
      name: organization1.name,
      status: {},
    });
    expect(response.body, "response is not correct").to.not.have.property("cloud-token");
  });

  it("should return an organization with all-in-one token", async function () {

    const response = await AdministrationService.getOrganization({ organizationName: organization2.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get organization; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.deep.include({
      name: organization2.name,
      status: {
        "cloudConnectivity": true,
        "eventPortalConnectivity": true,
      },
    });
    expect(response.body, "response is not correct").to.have.property("cloud-token").that.is.a("string");
  });

  it("should return an organization with cloud and event portal tokens", async function () {

    const response = await AdministrationService.getOrganization({ organizationName: organization3.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get organization; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.deep.include({
      name: organization3.name,
      status: {
        "cloudConnectivity": true,
        "eventPortalConnectivity": true,
      },
    });
    expect(response.body, "response is not correct").to.have.property("cloud-token").that.is.an("object");
  });

  it("should not return an organization if the user is not authorized", async function () {

    PlatformAPIClient.setApiUser();
    await AdministrationService.getOrganization({ organizationName: organization1.name }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not return an organization if the organization is unknown", async function () {

    await AdministrationService.getOrganization({ organizationName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([404]);
    });
  });

});
