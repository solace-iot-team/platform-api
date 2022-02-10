import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { TestContext } from "../../lib/test.helpers";
import { APIProduct, App, AppEnvironmentStatus, AppStatus, WebHook } from "../../lib/generated/openapi";
import { ApiError, AppListItem, AppsService } from "../../lib/generated/openapi";

import * as setup from './common/test.setup';
import { PlatformAPIClient } from '../../lib/api.helpers';
import P from 'pino';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const organizationName: string = setup.organizationName;
  const developerName: string = setup.developer1.userName;

  const applicationName1: string = `${developerName}-app1`;
  const applicationName2: string = `${developerName}-app2`;

  /** Base parameters to create, get, update or delete a developer application. */
  const devctx = {
    organizationName: organizationName,
    developerUsername: developerName,
  }

  /** Base parameters to get details for application #1. */
  const appctx1 = {
    organizationName: organizationName,
    appName: applicationName1,
  }

  /** Base parameters to get details for application #2. */
  const appctx2 = {
    organizationName: organizationName,
    appName: applicationName2,
  }

  /**
   * An application with API products.
   * 
   * API products:
   * - {@link setup.apiProduct1 apiProduct1}, {@link setup.apiProduct2 apiProduct2} and {@link setup.apiProduct3 apiProduct3}
   */
  const application1: App = {
    name: applicationName1,
    apiProducts: [setup.apiProduct2.name, setup.apiProduct1.name, setup.apiProduct3.name],
    credentials: { expiresAt: -1 },
  }

  /** An application without API products. */
  const application2: App = {
    name: applicationName2,
    apiProducts: [],
    credentials: { expiresAt: -1 },
  }

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    TestContext.newItId();
    await Promise.all([
      AppsService.createDeveloperApp({ ...devctx, requestBody: application1 }),
      AppsService.createDeveloperApp({ ...devctx, requestBody: application2 }),
    ]);
  });

  after(async function () {
    TestContext.newItId();
    await Promise.all([
      AppsService.deleteDeveloperApp({ ...devctx, appName: applicationName1 }).catch(() => { }),
      AppsService.deleteDeveloperApp({ ...devctx, appName: applicationName2 }).catch(() => { }),
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return API names", async function () {

    const response = await AppsService.listAppApiSpecifications({ ...appctx1 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API names; error="${reason.body.message}"`);
    });

    const apiNames: Set<string> = new Set(setup.apiProduct1.apis.concat(setup.apiProduct2.apis, setup.apiProduct3.apis));
    expect(response, "API names are incorrect").to.have.members(Array.from(apiNames.values()));
  });

  it("should return no API names for an application without API products", async function () {

    const response = await AppsService.listAppApiSpecifications({ ...appctx2 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get application status; error="${reason.body.message}"`);
    });

    expect(response, "returned API names are incorrect").to.be.empty;
  });

  xit("should return API names for page #1", async function () {

    const response = await AppsService.listAppApiSpecifications({ ...appctx1, pageSize: 2, pageNumber: 1 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API names; error="${reason.body.message}"`);
    });

    expect(response.length, "number of API names is incorrect").to.be.equals(2);
  });

  xit("should return API names for page #2", async function () {

    const response = await AppsService.listAppApiSpecifications({ ...appctx1, pageSize: 2, pageNumber: 2 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API names; error="${reason.body.message}"`);
    });

    expect(response.length, "number of API names is incorrect").to.be.equals(1);
  });

  xit("should return API names sorted in ascending order", async function () {

    const response = await AppsService.listAppApiSpecifications({ ...appctx1, sortFieldName: "name", sortDirection: "asc" }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API names; error="${reason.body.message}"`);
    });

    const apiNames: Set<string> = new Set(setup.apiProduct1.apis.concat(setup.apiProduct2.apis, setup.apiProduct3.apis));

    expect(response, "API names are incorrect").to.have.ordered.members(
      Array.from(apiNames.values()).sort((a, b) => (a > b ? 1 : -1))
    );
  });

  xit("should return API names sorted in descending order", async function () {

    const response = await AppsService.listAppApiSpecifications({ ...appctx1, sortFieldName: "name", sortDirection: "desc" }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API names; error="${reason.body.message}"`);
    });

    const apiNames: Set<string> = new Set(setup.apiProduct1.apis.concat(setup.apiProduct2.apis, setup.apiProduct3.apis));

    expect(response, "API names are incorrect").to.have.ordered.members(
      Array.from(apiNames.values()).sort((a, b) => (a > b ? -1 : 1))
    );
  });

  it("should not return API names if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();

    await AppsService.listAppApiSpecifications({ ...appctx1 }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not return API names for an unknown application", async function () {

    await AppsService.listAppApiSpecifications({ organizationName: organizationName, appName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([404]);
    });
  });

});
