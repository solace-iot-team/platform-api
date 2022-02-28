import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import type { Team } from '../../lib/generated/openapi';
import { ApiError, TeamsService } from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const teamName: string = "team";
  const teamBase: Team = {
    name: teamName,
    displayName: "Team",
  }

  // HOOKS

  setup.addBeforeHooks(this);

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await TeamsService.deleteTeam({ ...orgctx, teamName: teamName }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return a team", async function () {

    const team: Team = { ...teamBase };
    await TeamsService.createTeam({ ...orgctx, requestBody: team });

    const response = await TeamsService.getTeam({ ...orgctx, teamName: teamName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get team; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.eql(team);
  });

  it("should return a team with additional attributes", async function () {

    const team: Team = {
      ...teamBase,
      attributes: [{
        name: "country",
        value: "DE",
      }],
    }

    await TeamsService.createTeam({ ...orgctx, requestBody: team });

    const response = await TeamsService.getTeam({ ...orgctx, teamName: teamName }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get developer; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.eql(team);
  });

  it("should not return a team if the user is not authorized", async function () {

    const team: Team = { ...teamBase };
    await TeamsService.createTeam({ ...orgctx, requestBody: team });

    PlatformAPIClient.setManagementUser();
    await TeamsService.getTeam({ ...orgctx, teamName: teamName }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not return a team that does not exist", async function () {

    await TeamsService.getTeam({ ...orgctx, teamName: "unknown" }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([404]);
    });
  });

});
