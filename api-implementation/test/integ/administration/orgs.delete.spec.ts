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

  it("should delete an organization", async function () {

    const organization: Organization = {
      name: organizationName,
    }

    await AdministrationService.createOrganization({ requestBody: organization });

    await AdministrationService.deleteOrganization({ organizationName: organizationName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to delete organization; error="${reason.body.message}"`);
    });
  });

  it("should not create an organization if the user is not authorized", async function () {

    const organization: Organization = {
      name: organizationName,
    }

    await AdministrationService.createOrganization({ requestBody: organization });

    PlatformAPIClient.setApiUser();

    await AdministrationService.deleteOrganization({ organizationName: organizationName }).then(() => {
      expect.fail("an unauthorized user deleted an organization");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not delete an organization that does not exist", async function () {

    await AdministrationService.deleteOrganization({ organizationName: "unknown" }).then(() => {
      expect.fail("n unknown organization was deleted");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([404]);
    });
  });

});
