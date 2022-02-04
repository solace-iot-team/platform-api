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

  it("should return organizations", async function () {

    const response = await AdministrationService.listOrganizations({}).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list organizations; error="${reason.body.message}"`);
    });

    expect(response.length, "number of returned organizations is incorrect").to.be.equals(3);

    let orgNames: Array<string> = [];
    response.forEach(org => orgNames.push(org.name));

    expect(orgNames, "list of organization names is incorrect").to.have.members([
      organization1.name,
      organization2.name,
      organization3.name,
    ]);

    const org1 = response[orgNames.indexOf(organization1.name)];
    expect(org1, "1st organization is incorrect").to.not.have.property('cloud-token');

    const org2 = response[orgNames.indexOf(organization2.name)];
    expect(org2, "2nd organization is incorrect").to.have.property('cloud-token').that.is.a('string');

    const org3 = response[orgNames.indexOf(organization3.name)];
    expect(org3, "2nd organization is incorrect").to.have.property('cloud-token').that.is.an('object');
  });

  it("should return organizations for page #1", async function () {

    const response = await AdministrationService.listOrganizations({ pageSize: 2, pageNumber: 1 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list organizations; error="${reason.body.message}"`);
    });

    expect(response.length, "number of returned organizations is incorrect").to.be.equals(2);
  });

  it("should return organizations for page #2", async function () {

    const response = await AdministrationService.listOrganizations({ pageSize: 2, pageNumber: 2 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list organizations; error="${reason.body.message}"`);
    });

    expect(response.length, "number of returned organizations is incorrect").to.be.equals(1);
  });

  it("should return organizations sorted in ascending order", async function () {

    const response = await AdministrationService.listOrganizations({ sortFieldName: "name", sortDirection: "asc" }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list organizations; error="${reason.body.message}"`);
    });

    expect(response.length, "number of returned organizations is incorrect").to.be.equals(3);

    let orgNames: Array<string> = [];
    response.forEach(org => orgNames.push(org.name));

    expect(orgNames, "order of organizations is incorrect").to.have.ordered.members(
      [organization1.name, organization2.name, organization3.name].sort((a, b) => (a > b ? 1 : -1))
    );
  });

  it("should return organizations sorted in descending order", async function () {

    const response = await AdministrationService.listOrganizations({ sortFieldName: "name", sortDirection: "desc" }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list organizations; error="${reason.body.message}"`);
    });

    expect(response.length, "number of returned organizations is incorrect").to.be.equals(3);

    let orgNames: Array<string> = [];
    response.forEach(org => orgNames.push(org.name));

    expect(orgNames, "order of organizations is incorrect").to.have.ordered.members(
      [organization1.name, organization2.name, organization3.name].sort((a, b) => (a > b ? -1 : 1))
    );
  });

  it("should not return organizations if the user is not authorized", async function () {

    PlatformAPIClient.setApiUser();

    await AdministrationService.listOrganizations({}).then(() => {
      expect.fail("an unauthorized user retrieved organizations");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

});
