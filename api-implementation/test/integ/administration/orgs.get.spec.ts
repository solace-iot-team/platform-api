import 'mocha';
import { expect } from 'chai';
import path from 'path';
import {
  AdministrationService,
  ApiError,
  Organization,
} from '../../lib/generated/openapi';

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
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return an organization with name only", async function () {

    const response = await AdministrationService.getOrganization({ organizationName: organization1.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get organization; error="${reason.body.message}"`);
    });

    expect(response, "organization name is incorrect").to.have.property("name", organization1.name);
    expect(response, "cloud-token is unexpected").to.not.have.property("cloud-token");
    expect(response, "status is incorrect").to.have.property("status").that.is.an("object").that.is.empty;
  });

  it("should return an organization with all-in-one token", async function () {

    const response = await AdministrationService.getOrganization({ organizationName: organization2.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get organization; error="${reason.body.message}"`);
    });

    expect(response, "organization name is incorrect").to.have.property("name", organization2.name);
    expect(response, "cloud-token is unexpected").to.have.property("cloud-token").that.is.a("string");
    expect(response, "status is incorrect").to.have.property("status").that.includes({
      "cloudConnectivity": true,
      "eventPortalConnectivity": true,
    });
  });

  it("should return an organization with cloud and event portal tokens", async function () {

    const response = await AdministrationService.getOrganization({ organizationName: organization3.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get organization; error="${reason.body.message}"`);
    });

    expect(response, "organization name is incorrect").to.have.property("name", organization3.name);
    expect(response, "cloud-token is unexpected").to.have.property("cloud-token").that.is.an("object");
    expect(response, "status is incorrect").to.have.property("status").that.includes({
      "cloudConnectivity": true,
      "eventPortalConnectivity": true,
    });
  });

  it("should not return an organization if the user is not authorized", async function () {

    PlatformAPIClient.setApiUser();

    await AdministrationService.getOrganization({ organizationName: organization1.name }).then(() => {
      expect.fail("an unauthorized user retrieved an organization");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not return an organization if the organization is unknown", async function () {

    await AdministrationService.getOrganization({ organizationName: "unknown" }).then(() => {
      expect.fail("an unknown organization was returned");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([404]);
    });
  });

});
