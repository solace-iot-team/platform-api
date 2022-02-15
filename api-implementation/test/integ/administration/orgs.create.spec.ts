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

  // HOOKS

  setup.addBeforeHooks(this);

  afterEach(async function () {
    await AdministrationService.deleteOrganization({ organizationName: organizationName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should create an organization", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': {
        cloud: { baseUrl: setup.solaceCloudBaseUrl, token: setup.solaceCloudToken },
        eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: setup.solaceEventPortalToken },
      },
    }

    const response = await AdministrationService.createOrganization({ requestBody: organization }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create organization; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.deep.include({
      name: organizationName,
      status: {
        cloudConnectivity: true,
        eventPortalConnectivity: true,
      },
    });
    expect(response.body, "response is not correct").to.have.property("cloud-token").that.is.an("object");
  });

  it("should create an organization with cloud token only", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': setup.solaceCloudToken,
    }

    const response = await AdministrationService.createOrganization({ requestBody: organization }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create organization; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.deep.include({
      name: organizationName,
      status: {
        cloudConnectivity: true,
        eventPortalConnectivity: true,
      },
    });
    expect(response.body, "response is not correct").to.have.property("cloud-token").that.is.a("string");
  });

  it("should create an organization without a cloud token", async function () {

    const organization: Organization = {
      name: organizationName,
    }

    const response = await AdministrationService.createOrganization({ requestBody: organization }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create organization; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.deep.include({
      name: organizationName,
      status: {},
    });
    expect(response.body, "response is not correct").to.not.have.property("cloud-token");
  });

  it("should not create an organization if the user is not authorized", async function () {

    const organization: Organization = {
      name: organizationName,
    }

    PlatformAPIClient.setApiUser();

    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("an unauthorized user created an organization");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not create an organization if the name is already used", async function () {

    const organization: Organization = {
      name: organizationName,
    }

    await AdministrationService.createOrganization({ requestBody: organization });
    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("an organization was created twice (duplicate)");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([422]);
    });
  });

  it("should not create an organization with an invalid all-in-one token", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': "invalid",
    }

    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("an organization was created with an invalid all-in-one token");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([400]);
    });
  });

  it("should not create an organization with an invalid cloud endpoint", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': {
        cloud: { baseUrl: "https://invalid.me", token: setup.solaceCloudToken },
        eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: setup.solaceEventPortalToken },
      },
    }

    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("an organization was created with an invalid cloud endpoint");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([400]);
    });
  });

  it("should not create an organization with an invalid cloud token", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': {
        cloud: { baseUrl: setup.solaceCloudBaseUrl, token: "invalid" },
        eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: setup.solaceEventPortalToken },
      },
    }

    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("an organization was created with an invalid cloud endpoint");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([400]);
    });
  });

  it("should not create an organization with an invalid event portal endpoint", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': {
        cloud: { baseUrl: setup.solaceCloudBaseUrl, token: setup.solaceCloudToken },
        eventPortal: { baseUrl: "https://invalid.me", token: setup.solaceEventPortalToken },
      },
    }

    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("an organization was created with an invalid event portal endpoint");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([400]);
    });
  });

  it("should not create an organization with an invalid event portal token", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': {
        cloud: { baseUrl: setup.solaceCloudBaseUrl, token: setup.solaceCloudToken },
        eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: "invalid" },
      },
    }

    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("an organization was created with an invalid event portal endpoint");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([400]);
    });
  });

});
