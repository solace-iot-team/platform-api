import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { TestContext } from "../../lib/test.helpers";
import type { App } from "../../lib/generated/openapi";
import { ApiError, AppsService } from "../../lib/generated/openapi";
import * as setup from './apps.setup';

const scriptName: string = path.basename(__filename);

describe("apps", function () {
  describe(scriptName, function () {

    const developerName1: string = setup.developer1.userName;
    const developerName2: string = setup.developer2.userName;

    /**
     * An application owned by {@link setup.developer1}.
     */
    const application1: App = {
      name: `${developerName1}-app1`,
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    /**
     * An application owned by {@link setup.developer1}.
     */
    const application2: App = {
      name: `${developerName1}-app2`,
      apiProducts: [setup.apiProduct1.name],
      credentials: { expiresAt: -1 },
    }

    /**
     * An application owned by {@link setup.developer2}.
     */
    const application3: App = {
      name: `${developerName2}-app3`,
      apiProducts: [],
      credentials: { expiresAt: -1 },
    }

    /**
     * An application owned by {@link setup.developer2}.
     */
    const application4: App = {
      name: `${developerName2}-app4`,
      apiProducts: [setup.apiProduct2.name],
      credentials: { expiresAt: -1 },
    }

    /**
     * An application owned by {@link setup.developer2}.
     */
    const application5: App = {
      name: `${developerName2}-app5`,
      apiProducts: [setup.apiProduct2.name],
      credentials: { expiresAt: -1 },
    }

    before(async function () {
      TestContext.newItId();
      await Promise.all([
        AppsService.createDeveloperApp(setup.organizationName, developerName1, application1),
        AppsService.createDeveloperApp(setup.organizationName, developerName1, application2),
        AppsService.createDeveloperApp(setup.organizationName, developerName2, application3),
        AppsService.createDeveloperApp(setup.organizationName, developerName2, application4),
        AppsService.createDeveloperApp(setup.organizationName, developerName2, application5),
      ]);
    });

    it("should return applications", async function () {

      const apps = await AppsService.listDeveloperApps(setup.organizationName, developerName1).catch((reason) => {
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

      const apps = await AppsService.listDeveloperApps(setup.organizationName, developerName2, null, 2, 1).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect.fail(`failed to list developer application; error="${reason.body.message}"`);
      });

      expect(apps.length, "number of applications is incorrect").to.be.equals(2);
    });

    it("should return applications for page #2", async function () {

      const apps = await AppsService.listDeveloperApps(setup.organizationName, developerName2, null, 2, 2).catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect.fail(`failed to list developer application; error="${reason.body.message}"`);
      });

      expect(apps.length, "number of applications is incorrect").to.be.equals(1);
    });

    it("should return applications sorted in ascending order", async function () {

      const apps = await AppsService.listDeveloperApps(setup.organizationName, developerName1, null, null, null, "name", "asc").catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect.fail(`failed to list developer application; error="${reason.body.message}"`);
      });

      expect(apps.length, "number of returned applications is incorrect").to.be.equals(2);

      let appNames: Array<string> = []
      apps.forEach((app) => { appNames.push(app.name); })

      expect(appNames, "list of application names is incorrect").to.have.ordered.members(
        [application1.name, application2.name].sort((a, b) => (a > b ? 1 : -1))
      );
    });

    it("should return applications sorted in descending order", async function () {

      const apps = await AppsService.listDeveloperApps(setup.organizationName, developerName1, null, null, null, "name", "desc").catch((reason) => {
        expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
        expect.fail(`failed to list developer application; error="${reason.body.message}"`);
      });

      expect(apps.length, "number of returned applications is incorrect").to.be.equals(2);

      let appNames: Array<string> = []
      apps.forEach((app) => { appNames.push(app.name); })

      expect(appNames, "list of application names is incorrect").to.have.ordered.members(
        [application1.name, application2.name].sort((a, b) => (a > b ? -1 : 1))
      );
    });

    after(async function () {
      TestContext.newItId();
      await Promise.all([
        AppsService.deleteDeveloperApp(setup.organizationName, developerName1, application1.name),
        AppsService.deleteDeveloperApp(setup.organizationName, developerName1, application2.name),
        AppsService.deleteDeveloperApp(setup.organizationName, developerName2, application3.name),
        AppsService.deleteDeveloperApp(setup.organizationName, developerName2, application4.name),
        AppsService.deleteDeveloperApp(setup.organizationName, developerName2, application5.name),
      ]);
    });

  });
});