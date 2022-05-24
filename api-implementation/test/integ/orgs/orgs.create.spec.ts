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

  afterEach(async function (done) {
    setTimeout(function () {
      done();
    }, 2000);
    await AdministrationService.deleteOrganization({ organizationName: organizationName }).catch(() => { });
    setTimeout(function () {
      done();
    }, 2000);
  });

  beforeEach(function (done) {
    setTimeout(function () {
      done();
    }, 2000);
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
    expect(response.body, "response is not correct").to.not.have.property("integrations");
  });

  it("should create an organization with all-in-one cloud token", async function () {

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
    expect(response.body, "response is not correct").to.not.have.property("integrations");
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
    expect(response.body, "response is not correct").to.not.have.property("integrations");
  });

  it("should create an organization with notifications enabled", async function () {

    const organization: Organization = {
      name: organizationName,
      integrations: {
        notifications: {
          baseUrl: "http://localhost:8080/",
          authentication: {
            userName: "admin",
            password: "secret",
          },
        },
      }
    }

    const response = await AdministrationService.createOrganization({ requestBody: organization }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create organization; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.deep.include({
      name: organizationName,
      integrations: organization.integrations, // shouldn't the password be masked ??
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
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not create an organization if the name is already used", async function () {

    const organization: Organization = {
      name: organizationName,
    }

    await AdministrationService.createOrganization({ requestBody: organization });
    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  it("should not create an organization if the all-in-one token is invalid", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': "invalid",
    }

    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not create an organization if the cloud endpoint is invalid", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': {
        cloud: { baseUrl: "https://invalid.me", token: setup.solaceCloudToken },
        eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: setup.solaceEventPortalToken },
      },
    }

    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not create an organization if the cloud token is invalid", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': {
        cloud: { baseUrl: setup.solaceCloudBaseUrl, token: "invalid" },
        eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: setup.solaceEventPortalToken },
      },
    }

    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not create an organization if the event portal endpoint is invalid", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': {
        cloud: { baseUrl: setup.solaceCloudBaseUrl, token: setup.solaceCloudToken },
        eventPortal: { baseUrl: "https://invalid.me", token: setup.solaceEventPortalToken },
      },
    }

    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not create an organization if the event portal token is invalid", async function () {

    const organization: Organization = {
      name: organizationName,
      'cloud-token': {
        cloud: { baseUrl: setup.solaceCloudBaseUrl, token: setup.solaceCloudToken },
        eventPortal: { baseUrl: setup.solaceEventPortalBaseUrl, token: "invalid" },
      },
    }

    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not create an organization if the notification URL is invalid", async function () {

    const organization: Organization = {
      name: organizationName,
      integrations: {
        notifications: {
          baseUrl: "not://valid",
          authentication: {
            token: "GKqep8dBnw5p8cvZ",
          }
        },
      },
    }

    await AdministrationService.createOrganization({ requestBody: organization }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });
});
