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

  it("should create a team", async function () {

    const team: Team = { ...teamBase };

    const response = await TeamsService.createTeam({ ...orgctx, requestBody: team }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create team; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.eql(teamBase);
  });

  it("should create a team with additional attributes", async function () {

    const team: Team = {
      ...teamBase,
      attributes: [{
        name: "country",
        value: "DE",
      }],
    }

    const response = await TeamsService.createTeam({ ...orgctx, requestBody: team }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to create team; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.be.eql(team);
  });

  it("should not create a team if the user is not authorized", async function () {

    const team: Team = { ...teamBase };

    PlatformAPIClient.setManagementUser();
    await TeamsService.createTeam({ ...orgctx, requestBody: team }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not create a team if the name is already used", async function () {

    const team: Team = { ...teamBase };

    await TeamsService.createTeam({ ...orgctx, requestBody: team });
    await TeamsService.createTeam({ ...orgctx, requestBody: team }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([422]);
    });
  });

  xit("should not create a team if the name is invalid", async function () {

    const team: Team = {
      ...teamBase,
      name: "[####]",
    };

    await TeamsService.createTeam({ ...orgctx, requestBody: team }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not create a team if the display name is invalid", async function () {

    const team: Team = {
      ...teamBase,
      displayName: "",
    };

    await TeamsService.createTeam({ ...orgctx, requestBody: team }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

});
