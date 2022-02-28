import 'mocha';
import { expect } from 'chai';
import path from 'path';
import { PlatformAPIClient } from '../../lib/api.helpers';
import { TestContext } from '../../lib/test.helpers';
import type { Team } from '../../lib/generated/openapi';
import { ApiError, TeamsService } from '../../lib/generated/openapi';

import * as setup from './common/test.setup';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  type SortDirection = "asc" | "desc";

  const orgctx = {
    organizationName: setup.organizationName,
  }

  const team1: Team = {
    name: "team1",
    displayName: "Team 1",
  }

  const team2: Team = {
    name: "team2",
    displayName: "Team 2",
    attributes: [{
      name: "location",
      value: "DE",
    }],
  }

  const team3: Team = {
    name: "team3",
    displayName: "Team 3",
    attributes: [{
      name: "location",
      value: "US",
    }],
  }

  // HOOKS

  setup.addBeforeHooks(this);

  before(async function () {
    TestContext.newItId();
    PlatformAPIClient.setApiUser();
    await Promise.all([
      TeamsService.createTeam({ ...orgctx, requestBody: team1 }),
      TeamsService.createTeam({ ...orgctx, requestBody: team2 }),
      TeamsService.createTeam({ ...orgctx, requestBody: team3 }),
    ]);
  });

  after(async function () {
    TestContext.newItId();
    await Promise.all([
      TeamsService.deleteTeam({ ...orgctx, teamName: team1.name }),
      TeamsService.deleteTeam({ ...orgctx, teamName: team2.name }),
      TeamsService.deleteTeam({ ...orgctx, teamName: team3.name }),
    ]);
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should return all teams", async function () {

    const response = await TeamsService.listTeams({ ...orgctx }).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list teams; error="${reason.body.message}"`);
    });

    const teams: Team[] = response.body;

    expect(teams, "number of teams is not correct").to.have.lengthOf(3);
    expect(teams, "response is not correct").to.have.deep.members([team1, team2, team3]);
  });

  it("should return all teams for page #1", async function () {

    const options = {
      ...orgctx,
      pageSize: 2,
      pageNumber: 1,
    }

    const response = await TeamsService.listTeams(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list teams; error="${reason.body.message}"`);
    });

    expect(response.body, "number of teams is not correct").to.have.lengthOf(2);
  });

  it("should return all teams for page #2", async function () {

    const options = {
      ...orgctx,
      pageSize: 2,
      pageNumber: 2,
    }

    const response = await TeamsService.listTeams(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list teams; error="${reason.body.message}"`);
    });

    expect(response.body, "number of teams is not correct").to.have.lengthOf(1);
  });

  it("should return all teams sorted in ascending order", async function () {

    const options = {
      ...orgctx,
      sortFieldName: "name",
      sortDirection: "asc" as SortDirection,
    }

    const response = await TeamsService.listTeams(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list teams; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.have.deep.ordered.members(
      [team1, team2, team3].sort((a, b) => (a.name > b.name ? 1 : -1))
    );
  });

  it("should return all teams sorted in descending order", async function () {

    const options = {
      ...orgctx,
      sortFieldName: "name",
      sortDirection: "desc" as SortDirection,
    }

    const response = await TeamsService.listTeams(options).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to list teams; error="${reason.body.message}"`);
    });

    expect(response.body, "response is not correct").to.have.deep.ordered.members(
      [team1, team2, team3].sort((a, b) => (a.name > b.name ? -1 : 1))
    );
  });

  it("should not return any teams if the user is not authorized", async function () {

    PlatformAPIClient.setManagementUser();
    await TeamsService.listTeams({ ...orgctx }).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([401]);
    });
  });

  it("should not return any teams if the page size is invalid", async function () {

    await TeamsService.listTeams({ ...orgctx, pageSize: -1 }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([400]);
    });
  });

  it("should not return any teams if the page number is invalid", async function () {

    await TeamsService.listTeams({ ...orgctx, pageNumber: 0 }).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([400]);
    });
  });

});
