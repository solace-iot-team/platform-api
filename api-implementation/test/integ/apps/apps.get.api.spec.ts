import 'mocha';
import { expect } from 'chai';
import path from 'path';
import yaml from 'js-yaml';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { TestContext } from '../../lib/test.helpers';
import type { App } from "../../lib/generated/openapi";
import {
  ApiError,
  AppsService,
  DevelopersService,
  TeamsService,
} from "../../lib/generated/openapi";

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  type ApiSpecFormat = "application/json" | "application/x-yaml";

  const organizationName: string = setup.organizationName;

  const developerName: string = setup.developer.userName;
  const devctx = {
    organizationName: organizationName,
    developerUsername: developerName,
  }

  const teamName: string = setup.team.name;
  const teamctx = {
    organizationName: organizationName,
    teamName: teamName,
  }

  const applicationName1: string = "test-app1";
  const appctx1 = {
    organizationName: organizationName,
    appName: applicationName1,
  }

  const applicationName2: string = "test-app2";
  const appctx2 = {
    organizationName: organizationName,
    appName: applicationName2,
  }

  /**
   * A developer application with API products.
   * 
   * API products:
   * - {@link setup.apiProduct1 apiProduct1}, {@link setup.apiProduct2 apiProduct2} and {@link setup.apiProduct3 apiProduct3}
   */
  const application1: App = {
    name: applicationName1,
    apiProducts: [setup.apiProduct2.name, setup.apiProduct1.name, setup.apiProduct3.name],
    credentials: { expiresAt: -1 },
  }

  /** A team application without API products. */
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
      DevelopersService.createDeveloperApp({ ...devctx, requestBody: application1 }),
      TeamsService.createTeamApp({ ...teamctx, requestBody: application2 }),
    ]);
  });

  afterEach(function () {
    PlatformAPIClient.setApiUser();
  });

  after(async function () {
    TestContext.newItId();
    await Promise.all([
      DevelopersService.deleteDeveloperApp({ ...devctx, appName: applicationName1 }).catch(() => { }),
      TeamsService.deleteTeamApp({ ...teamctx, appName: applicationName2 }).catch(() => { }),
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return the API spec as JSON", async function () {

    const options = {
      ...appctx1,
      apiName: setup.apiName1,
      format: "application/json" as ApiSpecFormat,
    }

    const response = await AppsService.getAppApiSpecification(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API spec; error="${reason.body.message}"`);
    });

    verifyApiSpec(response.body, JSON.parse(setup.apiSpec1));
  });

  it("should return the API spec as YAML", async function () {

    const options = {
      ...appctx1,
      apiName: setup.apiName2,
      format: "application/x-yaml" as ApiSpecFormat,
    }

    const response = await AppsService.getAppApiSpecification(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API spec; error="${reason.body.message}"`);
    });

    let apiSpecFromResponse: any;
    try {
      apiSpecFromResponse = yaml.load(response.body);
    } catch (e) {
      expect.fail(`failed to parse API spec as YAML; error=${e.message}`);
    }

    verifyApiSpec(apiSpecFromResponse, JSON.parse(setup.apiSpec2));
  });

  it("should not return an API spec if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await AppsService.getAppApiSpecification({ ...appctx1, apiName: setup.apiProduct1.apis[0] }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not return an API spec for an unknown API", async function () {

    await AppsService.getAppApiSpecification({ ...appctx2, apiName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([404]);
    });
  });

  // HELPER

  const verifyApiSpec = (apiSpec: any, baseApiSpec: any): void => {

    // Note: When an API spec is used in an API product, it contains more information than the
    //       API spec that was used to create the corresponding API.

    // check 'info' section

    expect(apiSpec.info, `info section is not correct`).to.deep.include(baseApiSpec.info);
    expect(apiSpec.info, `info section is not correct`).to.have.property("x-origin").that.includes({
      "name": "apim-connector",
      "vendor": "solace",
    });

    // check 'channels' section

    for (const topic in baseApiSpec.channels) {

      // The 'channels' section of an API product API spec contains information about protocol
      // bindings and the protocol bindings depend on the list of protocols of the API product.

      const a = apiSpec.channels[topic];
      const e = baseApiSpec.channels[topic];

      if (e.publish) {
        expect(a.publish, `channel section ${topic} is not correct`).to.deep.include(e.publish);
        expect(a.publish, `channel section ${topic} is not correct`).to.have.nested.property(
          "bindings.mqtt"
        ).that.has.all.keys(["qos", "bindingVersion"]);
      } else {
        expect(a.publish, `channel section ${topic} is not correct`).is.undefined;
      }

      if (e.subscribe) {
        expect(a.subscribe, `channel section ${topic} is not correct`).to.deep.include(e.subscribe);
        expect(a.subscribe, `channel section ${topic} is not correct`).to.have.nested.property(
          "bindings.mqtt"
        ).that.has.all.keys(["qos", "bindingVersion"]);
      } else {
        expect(a.subscribe, `channel section ${topic} is not correct`).is.undefined;
      }
    }

    // check 'components' section

    expect(apiSpec.components, `components section is not correct`).to.deep.include(baseApiSpec.components);
  }

});
