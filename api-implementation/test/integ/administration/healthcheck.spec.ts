import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import path from 'path';
import * as fetch from 'fetch-with-proxy';
import { databaseaccess } from '../../../src/databaseaccess';
import {
  AdministrationService,
  ApiError,
} from '../../lib/generated/openapi';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  let databaseIsHealthyStub: sinon.SinonStub;
  let fetchStub: sinon.SinonStub;

  // HOOKS

  before(function () {
    databaseIsHealthyStub = sinon.stub(databaseaccess, "isHealthy");
    fetchStub = sinon.stub(fetch, "default");
  });

  beforeEach(function () {
    databaseIsHealthyStub.reset();
    databaseIsHealthyStub.resolves(true);
    fetchStub.reset();
    fetchStub.callThrough();
  });

  after(function () {
    databaseIsHealthyStub.restore();
    fetchStub.restore();
  });

  // TESTS

  it("should return 'ok' if the server is healthy", async function () {

    const response = await AdministrationService.healthcheck().catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`health check returned an unexpected error; error="${reason.statusText}"`);
    });

    expect(response.body, "status is incorrect").to.have.property("status", "ok");
  });

  it("should return 'failure' if the database is unhealthy", async function () {

    databaseIsHealthyStub.resolves(false);

    await AdministrationService.healthcheck().then(() => {
      expect.fail("health check returned incorrect result");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([503]);
    });
  });

  it("should return 'failure' if Solace PubSub+ Cloud cannot be accessed", async function () {

    fetchStub.withArgs("https://api.solace.cloud/api/v0", sinon.match.any).resolves({ status: 404 });

    await AdministrationService.healthcheck().then(() => {
      expect.fail("health check returned incorrect result");
    }, (reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect(reason.status, `status is not correct`).to.be.oneOf([503]);
    });
  });

});
