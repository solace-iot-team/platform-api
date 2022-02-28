import 'mocha';
import { expect } from 'chai';
import path from 'path';
import yaml from 'js-yaml';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { TestContext } from '../../lib/test.helpers';
import { ApiProductsService, App } from "../../lib/generated/openapi";
import { ApiError, AppsService } from "../../lib/generated/openapi";

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const organizationName: string = setup.organizationName;
  const developerName: string = setup.developer1.userName;

  const orgctx = {
    organizationName: organizationName,
  }

  const devctx = {
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
      AppsService.createDeveloperApp({ ...devctx, requestBody: application1 }),
      AppsService.createDeveloperApp({ ...devctx, requestBody: application2 }),
      AppsService.createDeveloperApp({ ...devctx, requestBody: application3 }),
    ]);
  });

  after(async function () {
    TestContext.newItId();
    await Promise.all([
      AppsService.deleteDeveloperApp({ ...devctx, appName: application1.name }),
      AppsService.deleteDeveloperApp({ ...devctx, appName: application2.name }),
      AppsService.deleteDeveloperApp({ ...devctx, appName: application3.name }),
    ]);
  })

  setup.addAfterHooks(this);

  // TESTS

  it("should return all applications for an API product", async function () {

    const options = {
      ...orgctx,
      apiProductName: setup.apiProduct1.name,
    }

    const response = await ApiProductsService.listAppReferencesToApiProducts(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list API products; error="${reason.body.message}"`);
    });

    expect(response.body, "number of applications is not correct").to.have.lengthOf(2);

    const applications = [application1, application3].map((application) => ({
      name: application.name,
      displayName: application.displayName ?? application.name,
    }));

    expect(response.body, "response is not correct").to.have.deep.members(applications);
  });

  it("should return no applications for an unused API product", async function () {

    const options = {
      ...orgctx,
      apiProductName: "unused",
    }

    const response = await ApiProductsService.listAppReferencesToApiProducts(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list API products; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.an('array').that.is.empty;
  });

  it("should not return applications if the user is not authorized", async function () {

    const options = {
      ...orgctx,
      apiProductName: setup.apiProduct1.name,
    }

    PlatformAPIClient.setManagementUser();
    await ApiProductsService.listAppReferencesToApiProducts(options).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

});
