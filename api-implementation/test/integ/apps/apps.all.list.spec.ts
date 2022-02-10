import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { TestContext } from "../../lib/test.helpers";
import { App, AppStatus } from "../../lib/generated/openapi";
import { ApiError, AppListItem, AppsService } from "../../lib/generated/openapi";

import * as setup from './common/test.setup';
import { PlatformAPIClient } from '../../lib/api.helpers';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const organizationName: string = setup.organizationName;
  const developerName: string = setup.developer1.userName;

  /** Base parameters to create, delete, get, list or update applications for a developer. */
  const appctx1 = {
    organizationName: organizationName,
    developerUsername: developerName,
  }

  /**
   * An application owned by {@link setup.developer1 developer1}.
   * 
   * Application details:
   * - Name: <{@link developerName}>-app1
   * - API Products: {@link setup.apiProduct1 apiProduct1}
   * - Attibutes:
   *   + language: DE,EN
   */
  const application1: App = {
    name: `${developerName}-app1`,
    apiProducts: [setup.apiProduct1.name],
    attributes: [{ name: "language", value: "DE,EN" }],
    credentials: { expiresAt: -1 },
  }

  /**
   * An application owned by {@link setup.developer1 developer1}.
   * 
   * Application details:
   * - Name: <{@link developerName}>-app2
   * - API Products: {@link setup.apiProduct2 apiProduct2} and {@link setup.apiProduct3 apiProduct3}
   * - Attibutes: none
   */
  const application2: App = {
    name: `${developerName}-app2`,
    apiProducts: [setup.apiProduct2.name, setup.apiProduct3.name],
    credentials: { expiresAt: -1 },
  }

  /**
   * An application owned by {@link setup.developer1 developer1}.
   * 
   * Application details:
   * - Name: <{@link developerName}>-app3
   * - API Products: {@link setup.apiProduct1 apiProduct1}, {@link setup.apiProduct2 apiProduct2} and {@link setup.apiProduct3 apiProduct3}
   * - Attibutes:
   *   + language: DE
   */
  const application3: App = {
    name: `${developerName}-app3`,
    apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
    attributes: [{ name: "language", value: "DE" }],
    credentials: { expiresAt: -1 },
  }

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    TestContext.newItId();
    await Promise.all([
      AppsService.createDeveloperApp({ ...appctx1, requestBody: application1 }),
      AppsService.createDeveloperApp({ ...appctx1, requestBody: application2 }),
      AppsService.createDeveloperApp({ ...appctx1, requestBody: application3 }),
    ]);
  });

  after(async function () {
    TestContext.newItId();
    await Promise.all([
      AppsService.deleteDeveloperApp({ ...appctx1, appName: application1.name }),
      AppsService.deleteDeveloperApp({ ...appctx1, appName: application2.name }),
      AppsService.deleteDeveloperApp({ ...appctx1, appName: application3.name }),
    ]);
  })

  setup.addAfterHooks(this);

  // TESTS

  it("should return applications", async function () {

    const applicationList = [application1, application2, application3];

    const apps = await AppsService.listApps({ organizationName: organizationName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list applications; error="${reason.body.message}"`);
    });

    expect(apps.length, "number of returned applications is incorrect").to.be.equals(applicationList.length);

    applicationList.forEach(application => {

      const app = apps.find(app => app.name == application.name);

      expect(app, `application '${application.name}' is missing`).is.not.undefined;
      expect(app, `application '${application.name}' is not correct`).to.deep.include({
        name: application.name,
        displayName: application.displayName ?? application.name,
        apiProducts: application.apiProducts,
        appType: AppListItem.appType.DEVELOPER,
        ownerId: developerName,
        status: AppStatus.APPROVED,
      });
    });
  });

  it("should return applications with filter: search for a single word", async function () {

    // Search: applications that use API product #1
    // Result: application1 and application3

    const filter = setup.apiProduct1.name;
    const applicationNames = [application1.name, application3.name];

    await checkAppListWithFilter(organizationName, filter, applicationNames);
  });

  it("should return applications with filter: match any terms", async function () {

    // Search: application #1 and application #2 by name
    // Result: application1 and application2

    // Note: The dash is used as delimiter for tokenization. When searching for an
    //       application by name, the appX suffix can be used as term.

    const filter = "app1 app2";
    const applicationNames = [application1.name, application2.name];

    await checkAppListWithFilter(organizationName, filter, applicationNames);
  });

  it("should return applications with filter: match a phrase", async function () {

    // Search: applications that have an attribute with 'DE,EN' as value
    // Result: application1

    // Note: The comma is used as delimiter for tokenization. When searching for
    //       something like 'DE,EN', the phrase must be put in quotes. Otherwise,
    //       all applications that match any of the terms 'DE' and 'EN' will be
    //       returned.

    const filter = '"DE,EN"';
    const applicationNames = [application1.name];

    await checkAppListWithFilter(organizationName, filter, applicationNames);
  });

  it("should return applications with filter: exclude results that contain a term", async function () {

    // Search: applications that use API product #1 but do not use API product #2
    // Result: application1

    const filter = `${setup.apiProduct1.name} -${setup.apiProduct2.name}`;
    const applicationNames = [application1.name];

    await checkAppListWithFilter(organizationName, filter, applicationNames);
  });

  it("should return applications with filter: match all terms", async function () {

    // Search: applications that use API product #1 and API product #2
    // Result: application3

    // Note: When using a filter with multiple terms in double quotes, the service
    //       does NOT return all applications that contain both terms. Instead,
    //       the service will return all applications that match at least one term
    //       exactly and that match all other terms partially (e.g., the term "api"
    //       or "prod" match the term "apiProduct" partially).
    //       It is NOT possible to search for an exact match of two or more terms!

    const filter = `"apiProduct1" "apiProduct2"`;
    const applicationNames = [application3.name];

    await checkAppListWithFilter(organizationName, filter, applicationNames);
  });

  it("should not return applications if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();

    await AppsService.listApps({ organizationName: organizationName }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  // HELPER

  const checkAppListWithFilter = async (organizationName: string, filter: string, applicationNames: Array<string>): Promise<void> => {

    const response = await AppsService.listApps({ organizationName: organizationName, filter: filter }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list applications; error="${reason.body.message}"`);
    });

    expect(response.length, "number of returned applications is incorrect").to.be.equals(applicationNames.length);

    let appNames: Array<string> = []
    response.forEach(app => appNames.push(app.name));

    expect(appNames, "list of applications is incorrect").to.have.members(applicationNames);
  }

});
