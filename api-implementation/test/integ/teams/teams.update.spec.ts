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

  const team: Team = {
    name: "team",
    displayName: "Team",
  }

  // HOOKS

  setup.addBeforeHooks(this);

  afterEach(async function () {
    PlatformAPIClient.setApiUser();
    await TeamsService.deleteTeam({ ...orgctx, teamName: team.name }).catch(() => { });
  });

  setup.addAfterHooks(this);

  // TESTS

  it("should update the display name", async function () {

    await TeamsService.createTeam({ ...orgctx, requestBody: team });

    const teamPatch = {
      ...orgctx,
      teamName: team.name,
      requestBody: {
        displayName: "updated display name",
      },
    }

    const response = await TeamsService.updateTeam(teamPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update team; error="${reason.body.message}"`);
    });

    const updatedTeam: Team = {
      ...team,
      ...teamPatch.requestBody,
    }

    expect(response.body, "response is not correct").to.be.eql(updatedTeam);
  });

  it("should update the attributes", async function () {

    await TeamsService.createTeam({ ...orgctx, requestBody: team });

    const teamPatch = {
      ...orgctx,
      teamName: team.name,
      requestBody: {
        attributes: [{
          name: "location",
          value: "DE",
        }],
      },
    }

    const response = await TeamsService.updateTeam(teamPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update team; error="${reason.body.message}"`);
    });

    const updatedTeam: Team = {
      ...team,
      ...teamPatch.requestBody,
    }

    expect(response.body, "response is not correct").to.be.eql(updatedTeam);
  });

  it("should update a team when If-Match header is used", async function () {

    const response = await TeamsService.createTeam({ ...orgctx, requestBody: team });
    const etag = response.headers['etag'];

    const teamPatch = {
      ...orgctx,
      teamName: team.name,
      ifMatch: etag,
      requestBody: {
        attributes: [{
          name: "location",
          value: "DE",
        }],
      },
    }

    await TeamsService.updateTeam(teamPatch).catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to update team; error="${reason.body.message}"`);
    });
  });

  it("should not update a team if the user is not authorized", async function () {

    await TeamsService.createTeam({ ...orgctx, requestBody: team });

    const teamPatch = {
      ...orgctx,
      teamName: team.name,
      requestBody: {
        displayName: "updated display name",
      },
    }

    PlatformAPIClient.setManagementUser();
    await TeamsService.updateTeam(teamPatch).then(() => {
      expect.fail("unauthorized request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([401]);
    });
  });

  it("should not update a team if the If-Match header is invalid", async function () {

    await TeamsService.createTeam({ ...orgctx, requestBody: team });

    const teamPatch = {
      ...orgctx,
      teamName: team.name,
      ifMatch: "1357",
      requestBody: {
        displayName: "updated display name",
      },
    }

    await TeamsService.updateTeam(teamPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([412]);
    });
  });

  it("should not update a team if the request is invalid", async function () {

    await TeamsService.createTeam({ ...orgctx, requestBody: team });

    const teamPatch = {
      ...orgctx,
      teamName: team.name,
      requestBody: {
        displayName: "",
      },
    }

    await TeamsService.updateTeam(teamPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not update a team if the request has unexpected parameters", async function () {

    await TeamsService.createTeam({ ...orgctx, requestBody: team });

    const teamPatch = {
      ...orgctx,
      teamName: team.name,
      requestBody: {
        name: "anotherName",
        displayName: "displayName",
      },
    }

    await TeamsService.updateTeam(teamPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([400]);
    });
  });

  it("should not update a team that does not exist", async function () {

    const teamPatch = {
      ...orgctx,
      teamName: "unknown",
      requestBody: {},
    }

    await TeamsService.updateTeam(teamPatch).then(() => {
      expect.fail("invalid request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([404]);
    });
  });

  it("should not update a team if the developer has changed", async function () {

    const response = await TeamsService.createTeam({ ...orgctx, requestBody: team });
    const etag = response.headers['etag'];

    const teamPatch1 = {
      ...orgctx,
      teamName: team.name,
      ifMatch: etag,
      requestBody: {
        displayName: "displayName1",
      },
    }

    const teamPatch2 = {
      ...orgctx,
      teamName: team.name,
      ifMatch: etag,
      requestBody: {
        displayName: "displayName2",
      },
    }

    // NOTE: The 2nd update must be submitted AFTER the 1st update has been processed, or
    //       otherwise, both updates will get processed. This is because the ETag is
    //       calculated based on the data in the database and as long as the data hasn't
    //       been updated, the "old" ETag will still be valid.

    await TeamsService.updateTeam(teamPatch1);
    await TeamsService.updateTeam(teamPatch2).then(() => {
      expect.fail("concurrent update request was not rejected");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, "status is not correct").to.be.oneOf([412]);
    });
  });

});
