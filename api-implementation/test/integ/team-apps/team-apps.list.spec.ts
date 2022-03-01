import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { TestContext } from "../../lib/test.helpers";
import type { App } from "../../lib/generated/openapi";
import { ApiError, TeamsService } from "../../lib/generated/openapi";

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  type SortDirection = "asc" | "desc";

  const organizationName: string = setup.organizationName;

  const teamName1: string = setup.team1.name;
  const teamName2: string = setup.team2.name;

  const teamctx1 = {
    organizationName: organizationName,
    teamName: teamName1,
  }

  const teamctx2 = {
    organizationName: organizationName,
    teamName: teamName2,
  }

  /** An application owned by team #1. */
  const application1: App = {
    name: `${teamName1}-app1`,
    apiProducts: [],
    credentials: { expiresAt: -1 },
  }

  /** An application owned by team #1. */
  const application2: App = {
    name: `${teamName1}-app2`,
    apiProducts: [setup.apiProduct1.name],
    attributes: [{ name: "language", value: "EN" }],
    credentials: { expiresAt: -1 },
  }

  /** An application owned by team #2. */
  const application3: App = {
    name: `${teamName2}-app3`,
    apiProducts: [setup.apiProduct1.name],
    attributes: [{ name: "language", value: "EN,DE" }],
    credentials: { expiresAt: -1 },
  }

  /** An application owned by team #2. */
  const application4: App = {
    name: `${teamName2}-app4`,
    apiProducts: [setup.apiProduct2.name, setup.apiProduct3.name],
    credentials: { expiresAt: -1 },
  }

  /** An application owned by team #2. */
  const application5: App = {
    name: `${teamName2}-app5`,
    apiProducts: [setup.apiProduct1.name, setup.apiProduct2.name, setup.apiProduct3.name],
    credentials: { expiresAt: -1 },
  }

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    TestContext.newItId();
    await Promise.all([
      TeamsService.createTeamApp({ ...teamctx1, requestBody: application1 }),
      TeamsService.createTeamApp({ ...teamctx1, requestBody: application2 }),
      TeamsService.createTeamApp({ ...teamctx2, requestBody: application3 }),
      TeamsService.createTeamApp({ ...teamctx2, requestBody: application4 }),
      TeamsService.createTeamApp({ ...teamctx2, requestBody: application5 }),
    ]);
  });

  afterEach(function () {
    PlatformAPIClient.setApiUser();
  });

  after(async function () {
    TestContext.newItId();
    await Promise.all([
      TeamsService.deleteTeamApp({ ...teamctx1, appName: application1.name }),
      TeamsService.deleteTeamApp({ ...teamctx1, appName: application2.name }),
      TeamsService.deleteTeamApp({ ...teamctx2, appName: application3.name }),
      TeamsService.deleteTeamApp({ ...teamctx2, appName: application4.name }),
      TeamsService.deleteTeamApp({ ...teamctx2, appName: application5.name }),
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return applications", async function () {

    const response = await TeamsService.listTeamApps({ ...teamctx1 }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list team application; error="${reason.body.message}"`);
    });

    const applications = response.body;
    expect(applications, "number of applications is not correct").to.have.lengthOf(2);

    let names: Array<string> = applications.map(app => app.name);
    expect(names, "application names are not correct").to.have.members([
      application1.name,
      application2.name
    ]);

    const app1 = applications[names.indexOf(application1.name)];
    expect(app1, "application is not correct").to.deep.include({
      name: application1.name,
      displayName: application1.displayName ?? application1.name,
      apiProducts: application1.apiProducts,
    });

    const app2 = applications[names.indexOf(application2.name)];
    expect(app2, "application is not correct").to.deep.include({
      name: application2.name,
      displayName: application2.displayName ?? application2.name,
      apiProducts: application2.apiProducts,
    });
  });

  it("should return applications for page #1", async function () {

    const options = {
      ...teamctx2,
      pageSize: 2,
      pageNumber: 1,
    }

    const response = await TeamsService.listTeamApps(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list team applications; error="${reason.body.message}"`);
    });

    expect(response.body, "number of applications is not correct").to.have.lengthOf(2);
  });

  it("should return applications for page #2", async function () {

    const options = {
      ...teamctx2,
      pageSize: 2,
      pageNumber: 2,
    }

    const response = await TeamsService.listTeamApps(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list team applications; error="${reason.body.message}"`);
    });

    expect(response.body, "number of applications is not correct").to.have.lengthOf(1);
  });

  it("should return applications sorted in ascending order", async function () {

    const options = {
      ...teamctx1,
      sortFieldName: "name",
      sortDirection: "asc" as SortDirection,
    }

    const response = await TeamsService.listTeamApps(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list team application; error="${reason.body.message}"`);
    });

    const applications = response.body;

    expect(applications, "number of applications is not correct").to.have.lengthOf(2);
    expect(applications, "order of applications is not correct").to.have.ordered.members(
      [...applications].sort((a, b) => (a.name > b.name ? 1 : -1))
    );
  });

  it("should return applications sorted in descending order", async function () {

    const options = {
      ...teamctx1,
      sortFieldName: "name",
      sortDirection: "desc" as SortDirection,
    }

    const response = await TeamsService.listTeamApps(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list team applications; error="${reason.body.message}"`);
    });

    const applications = response.body;

    expect(applications, "number of applications is not correct").to.have.lengthOf(2);
    expect(applications, "order of applications is not correct").to.have.ordered.members(
      [...applications].sort((a, b) => (a.name > b.name ? -1 : 1))
    );
  });

  it("should not return applications if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await TeamsService.listTeamApps({ ...teamctx1 }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not return applications if the page size is invalid", async function () {

    const options = {
      ...teamctx2,
      pageSize: -1,
    }

    await TeamsService.listTeamApps(options).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not return applications if the page number is invalid", async function () {

    const options = {
      ...teamctx2,
      pageNumber: 0,
    }

    await TeamsService.listTeamApps(options).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

});
