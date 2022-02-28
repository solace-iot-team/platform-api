import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { App, AppsService, Team } from '../../lib/generated/openapi';
import { ApiError, TeamsService } from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const team: Team = {
    name: "team",
    displayName: "Team",
  }

  const app: App = {
    name: `${team.name}-app`,
    apiProducts: [],
    credentials: { expiresAt: -1 },
  }

  // HOOKS

  setup.addBeforeHooks(this);

  beforeEach(async function () {
    await TeamsService.createTeam({ ...orgctx, requestBody: team });
  });

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await AppsService.deleteTeamApp({ ...orgctx, teamName: team.name, appName: app.name }).catch(() => { });
    await TeamsService.deleteTeam({ ...orgctx, teamName: team.name }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should delete a developer", async function () {

    await TeamsService.deleteTeam({ ...orgctx, teamName: team.name }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to delete team; error="${reason.body.message}"`);
    });
  });

  it("should not delete a team if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await TeamsService.deleteTeam({ ...orgctx, teamName: team.name }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not delete a team if an application exists", async function () {

    await AppsService.createTeamApp({ ...orgctx, teamName: team.name, requestBody: app });

    await TeamsService.deleteTeam({ ...orgctx, teamName: team.name }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([409]);
    });
  });

  it("should not delete a team that does not exist", async function () {

    await TeamsService.deleteTeam({ ...orgctx, teamName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

});
