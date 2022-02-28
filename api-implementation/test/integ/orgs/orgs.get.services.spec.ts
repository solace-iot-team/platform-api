import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { EnvironmentsService, Organization } from '../../lib/generated/openapi';
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
  }

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    TestContext.newItId();
    PlatformAPIClient.setManagementUser();
    await Promise.all([
      AdministrationService.createOrganization({ requestBody: organization1 }),
      AdministrationService.createOrganization({ requestBody: organization2 }),
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
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return all cloud services for an organization", async function () {

    const options = {
      organizationName: organization1.name,
    }

    const response = await EnvironmentsService.listServices(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list services; error="${reason.body.message}"`);
    });

    // check that the response contains entries for both test services

    const ids = response.body.map(service => service.serviceId);
    expect(ids, "response is not correct").to.include.members([
      setup.solaceCloudServiceId1, setup.solaceCloudServiceId2,
    ]);
  });

  it("should not return services if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await EnvironmentsService.listServices({ organizationName: organization1.name }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not return services if the organization has no token", async function () {

    await EnvironmentsService.listServices({ organizationName: organization2.name }).then(() => {
      expect.fail("invalid requests was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([500]);
    });
  });

  it("should not return services if the organization is unknown", async function () {

    await EnvironmentsService.listServices({ organizationName: "unknown" }).then(() => {
      expect.fail("invalid requests was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});
