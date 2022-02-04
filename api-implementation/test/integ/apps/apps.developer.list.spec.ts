import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { TestContext } from "../../lib/test.helpers";
import type { App } from "../../lib/generated/openapi";
import { ApiError, AppsService } from "../../lib/generated/openapi";

import * as setup from './common/test.setup';
import { PlatformAPIClient } from '../../lib/api.helpers';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const organizationName: string = setup.organizationName;

  const developerName1: string = setup.developer1.userName;
  const developerName2: string = setup.developer2.userName;

  /** Base parameters to create, list, update or delete applications for developer #1. */
  const appctx1 = {
    organizationName: organizationName,
    developerUsername: developerName1,
  }

  /** Base parameters to create, list, update or delete applications for developer #2. */
  const appctx2 = {
    organizationName: organizationName,
    developerUsername: developerName2,
  }

  /** An application owned by developer #1. */
  const application1: App = {
    name: `${developerName1}-app1`,
    apiProducts: [],
    credentials: { expiresAt: -1 },
  }

  /** An application owned by developer #1. */
  const application2: App = {
    name: `${developerName1}-app2`,
    apiProducts: [setup.apiProduct1.name],
    attributes: [{ name: "language", value: "EN" }],
    credentials: { expiresAt: -1 },
  }

  /** An application owned by developer #2. */
  const application3: App = {
    name: `${developerName2}-app3`,
    apiProducts: [setup.apiProduct1.name],
    attributes: [{ name: "language", value: "EN,DE" }],
    credentials: { expiresAt: -1 },
  }

  /** An application owned by developer #2. */
  const application4: App = {
    name: `${developerName2}-app4`,
    apiProducts: [setup.apiProduct2.name, setup.apiProduct3.name],
    credentials: { expiresAt: -1 },
  }

  /** An application owned by developer #2. */
  const application5: App = {
    name: `${developerName2}-app5`,
    apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
    credentials: { expiresAt: -1 },
  }

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    TestContext.newItId();
    await Promise.all([
      AppsService.createDeveloperApp({ ...appctx1, requestBody: application1 }),
      AppsService.createDeveloperApp({ ...appctx1, requestBody: application2 }),
      AppsService.createDeveloperApp({ ...appctx2, requestBody: application3 }),
      AppsService.createDeveloperApp({ ...appctx2, requestBody: application4 }),
      AppsService.createDeveloperApp({ ...appctx2, requestBody: application5 }),
    ]);
  });

  after(async function () {
    TestContext.newItId();
    await Promise.all([
      AppsService.deleteDeveloperApp({ ...appctx1, appName: application1.name }),
      AppsService.deleteDeveloperApp({ ...appctx1, appName: application2.name }),
      AppsService.deleteDeveloperApp({ ...appctx2, appName: application3.name }),
      AppsService.deleteDeveloperApp({ ...appctx2, appName: application4.name }),
      AppsService.deleteDeveloperApp({ ...appctx2, appName: application5.name }),
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return applications", async function () {

    const apps = await AppsService.listDeveloperApps({ ...appctx1 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list developer application; error="${reason.body.message}"`);
    });

    expect(apps.length, "number of returned applications is incorrect").to.be.equals(2);

    let appNames: Array<string> = []
    apps.forEach((app) => {
      appNames.push(app.name);
    })

    expect(appNames, "list of application names is incorrect").to.have.members([
      application1.name,
      application2.name
    ]);

    const app1 = apps[appNames.indexOf(application1.name)];
    expect(app1, "1st application is incorrect").to.deep.include({
      name: application1.name,
      displayName: application1.displayName ?? application1.name,
      apiProducts: application1.apiProducts,
    });

    const app2 = apps[appNames.indexOf(application2.name)];
    expect(app2, "2nd application is incorrect").to.deep.include({
      name: application2.name,
      displayName: application2.displayName ?? application2.name,
      apiProducts: application2.apiProducts,
    });
  });

  it("should return applications for page #1", async function () {

    const apps = await AppsService.listDeveloperApps({ ...appctx2, pageSize: 2, pageNumber: 1 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list developer application; error="${reason.body.message}"`);
    });

    expect(apps.length, "number of applications is incorrect").to.be.equals(2);
  });

  it("should return applications for page #2", async function () {

    const apps = await AppsService.listDeveloperApps({ ...appctx2, pageSize: 2, pageNumber: 2 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list developer application; error="${reason.body.message}"`);
    });

    expect(apps.length, "number of applications is incorrect").to.be.equals(1);
  });

  it("should return applications sorted in ascending order", async function () {

    const apps = await AppsService.listDeveloperApps({ ...appctx1, sortFieldName: "name", sortDirection: "asc" }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list developer application; error="${reason.body.message}"`);
    });

    expect(apps.length, "number of applications is incorrect").to.be.equals(2);

    let appNames: Array<string> = []
    apps.forEach((app) => { appNames.push(app.name); })

    expect(appNames, "list of application names is incorrect").to.have.ordered.members(
      [application1.name, application2.name].sort((a, b) => (a > b ? 1 : -1))
    );
  });

  it("should return applications sorted in descending order", async function () {

    const apps = await AppsService.listDeveloperApps({ ...appctx1, sortFieldName: "name", sortDirection: "desc" }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list developer application; error="${reason.body.message}"`);
    });

    expect(apps.length, "number of applications is incorrect").to.be.equals(2);

    let appNames: Array<string> = []
    apps.forEach((app) => { appNames.push(app.name); })

    expect(appNames, "list of application names is incorrect").to.have.ordered.members(
      [application1.name, application2.name].sort((a, b) => (a > b ? -1 : 1))
    );
  });

  it("should not return applications if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();

    await AppsService.listDeveloperApps({ ...appctx1 }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

});
