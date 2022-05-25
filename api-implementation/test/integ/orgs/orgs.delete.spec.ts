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

  const organization: Organization = {
    name: organizationName,
  }

  // HOOKS

  setup.addBeforeHooks(this);

  beforeEach(async function () {
    await AdministrationService.createOrganization({ requestBody: organization });
  });

  afterEach(async function () {
    PlatformAPIClient.setManagementUser();
    AdministrationService.deleteOrganization({ organizationName: organizationName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should delete an organization", async function () {

    await AdministrationService.deleteOrganization({ organizationName: organizationName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to delete organization; error="${reason.body.message}"`);
    });
  });

  it("should not delete an organization if the user is not authorized", async function () {

    PlatformAPIClient.setApiUser();
    await AdministrationService.deleteOrganization({ organizationName: organizationName }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not delete an organization that does not exist", async function () {

    await AdministrationService.deleteOrganization({ organizationName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});
