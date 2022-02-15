import 'mocha';
import { expect } from 'chai';
import path from 'path';
import yaml from 'js-yaml';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { TestContext } from '../../lib/test.helpers';
import type { App } from "../../lib/generated/openapi";
import { ApiError, AppsService } from "../../lib/generated/openapi";

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const organizationName: string = setup.organizationName;
  const developerName: string = setup.developer1.userName;

  const devctx = {
    organizationName: organizationName,
    developerUsername: developerName,
  }

  const applicationName1: string = `${developerName}-app1`;
  const applicationName2: string = `${developerName}-app2`;

  const appctx1 = {
    organizationName: organizationName,
    appName: applicationName1,
  }

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

  it("should return the API spec as JSON", async function () {

    const apiName = setup.apiName1;

    const response = await AppsService.getAppApiSpecification({ ...appctx1, apiName: apiName, format: "application/json" }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API spec; error="${reason.body.message}"`);
    });

    let apiSpec = response.body;
    expect(apiSpec, `API spec is not correct`).to.be.a('object').that.is.not.empty;

    const baseApiSpec = JSON.parse(setup.apiSpec1);

    // Note: The returned API spec contains more information than the API spec used to create it.
    //       Therefore, we need to check the returned API spec part by part.

    // check 'info' section

    expect(apiSpec.info, `info section is not correct`).to.deep.include(baseApiSpec.info);
    expect(apiSpec.info, `info section is not correct`).to.have.property("x-origin").that.includes({
      "name": "apim-connector",
      "vendor": "solace",
    });

    // check 'channels' section

    const sayHello = apiSpec.channels["say/hello/{language}"];

    expect(sayHello.subscribe, `SayHello channel section is not correct`).to.deep.include(
      baseApiSpec.channels["say/hello/{language}"].subscribe
    );
    expect(sayHello.subscribe, `SayHello channel section is not correct`).to.have.nested.property(
      "bindings.mqtt"
    ).that.has.all.keys(["qos", "bindingVersion"]);

    expect(sayHello.publish, `SayHello channel section is not correct`).to.deep.include(
      baseApiSpec.channels["say/hello/{language}"].publish
    );
    expect(sayHello.publish, `SayHello channel section is not correct`).to.have.nested.property(
      "bindings.mqtt"
    ).that.has.all.keys(["qos", "bindingVersion"]);

    // check 'components' section

    expect(apiSpec.components, `components section is not correct`).to.deep.include(baseApiSpec.components);

  });

  it("should return the API spec as YAML", async function () {

    const apiName = setup.apiName2;

    const response = await AppsService.getAppApiSpecification({ ...appctx1, apiName: apiName, format: "application/x-yaml" }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get API spec; error="${reason.body.message}"`);
    });

    let apiSpec: any;
    try {
      apiSpec = yaml.load(response.body);
    } catch (e) {
      expect.fail(`failed to parse API spec as YAML; error=${e.message}`);
    }

    const baseApiSpec = JSON.parse(setup.apiSpec2);

    // Note: The returned API spec contains more information than the API spec used to create it.
    //       Therefore, we need to check the returned API spec part by part.

    // check 'info' section

    expect(apiSpec.info, `info section is not correct`).to.deep.include(baseApiSpec.info);
    expect(apiSpec.info, `info section is not correct`).to.have.property("x-origin").that.includes({
      "name": "apim-connector",
      "vendor": "solace",
    });

    // check 'channels' section

    const userSignedUp = apiSpec.channels["user/signedup"];

    expect(userSignedUp.subscribe, `userSignedUp channel section is not correct`).to.deep.include(
      baseApiSpec.channels["user/signedup"].subscribe
    );
    expect(userSignedUp.subscribe, `userSignedUp channel section is not correct`).to.have.nested.property(
      "bindings.mqtt"
    ).that.has.all.keys(["qos", "bindingVersion"]);

    expect(userSignedUp.publish, `userSignedUp channel section is not correct`).to.not.exist;

    // check 'components' section

    expect(apiSpec.components, `components section is not correct`).to.deep.include(baseApiSpec.components);
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

});
