import "mocha";
import * as chai from "chai";
const expect = chai.expect;
import path = require("path");
import fetch, { RequestInit, Response } from "node-fetch";
import { UserRegistry, getEnvVarValueAssert, getBaseUrl, getRequestAuthHeader, logResponse } from "../lib/test.helpers";

// move to lib?
const scriptName: string = path.basename(__filename);
const testEnv = {
  SCRIPT_NAME: scriptName,
  PROJECT_HOME: getEnvVarValueAssert(scriptName, 'APIM_SOLACE_PLATFORM_API_PROJECT_HOME'),
  WORKING_DIR: getEnvVarValueAssert(scriptName, 'APIM_INTEGRATION_TEST_WORKING_DIR'),
  PLATFORM_ADMIN_USER: getEnvVarValueAssert(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_ADMIN_USER'),
  PLATFORM_ADMIN_PASSWORD: getEnvVarValueAssert(scriptName, 'APIM_INTEGRATION_TEST_PLATFORM_ADMIN_PASSWORD'),
  FILE_USER_REGISTRY: getEnvVarValueAssert(scriptName, 'APIM_INTEGRATION_TEST_FILE_USER_REGISTRY')
}
const userRegistry: UserRegistry = require(testEnv.FILE_USER_REGISTRY);


describe('general test', () => {
  before("initializing test", async()=>{
    console.log('>>> initializing ...');
    console.log(`>>> testEnv = ${JSON.stringify(testEnv, null, 2)}`);
    console.log(`>>> userRegistry = ${JSON.stringify(userRegistry, null, 2)}`);
    console.log('>>> success.');
  });
  // after("teardown test", async()=>{
  //   console.log('>>> teardown ...');
  //   console.log('>>> success.');
  // });

  xcontext("tests with empty DB", () => {

    beforeEach(()=>{
      console.log("check: called every time before it?");
      expect(false, "TODO: helper to empty Mongo DB").to.be.true;
    });

    it("should handle unauthorized requests for empty DB", async() => {
      let getRequest: RequestInit = null;
      let response: Response = null;
      const uri = getBaseUrl() + "organizations";
      getRequest = {
        method: "GET"
      };
      response = await fetch(uri, getRequest);
      await logResponse("get organizations no auth header", response);
      expect(response.status, "get organizations no auth header").to.equal(401);

      getRequest = {
        method: "GET",
        headers: {
          Authorization: getRequestAuthHeader("not", 'valid')
        }
      };
      response = await fetch(uri, getRequest);
      await logResponse("get organizations unauthorized", response);
      expect(response.status, "get organizations unauthorized").to.equal(401);
    });

    xit("should handle unauthorized requests for populated DB", async() => {
      let getRequest: RequestInit = null;
      let response: Response = null;
      const uri = getBaseUrl() + "organizations";
      getRequest = {
        method: "GET"
      };
      response = await fetch(uri, getRequest);
      await logResponse("get organizations no auth header", response);
      expect(response.status, "get organizations no auth header").to.equal(401);

      getRequest = {
        method: "GET",
        headers: {
          Authorization: getRequestAuthHeader("not", 'valid')
        }
      };
      response = await fetch(uri, getRequest);
      await logResponse("get organizations unauthorized", response);
      expect(response.status, "get organizations unauthorized").to.equal(401);
    });

    // fails for no orgs ...
    it("should get all organizations ", async() => {
      const uri = getBaseUrl() + "organizations";
      const getRequest: RequestInit = {
          method: "GET",
          headers: {
            Authorization: getRequestAuthHeader(testEnv.PLATFORM_ADMIN_USER, testEnv.PLATFORM_ADMIN_PASSWORD)
          }
      };
      const response: Response = await fetch(uri, getRequest);
      await logResponse("get all organizations", response);
      expect(response.status, "getOrganizations").to.equal(200);
    });

  });

  context("tests platformManagement", () => {

    // beforeEach(()=>{
    //   expect(false, "TODO: helper: delete all orgs").to.be.true;
    // });

    it("should create/get/patch/get/delete/get an org", async() => {
      const uri = getBaseUrl() + "organizations";
      const headers = {
        Authorization: getRequestAuthHeader(testEnv.PLATFORM_ADMIN_USER, testEnv.PLATFORM_ADMIN_PASSWORD),
        "Content-Type": "application/json"
      }
      // src/model/@types/api-model/index.d.ts 
      let request: RequestInit = null;
      let response: Response = null;
      let body = null;
      // create org
      body = {
        name: "org1"
      }
      request = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      };
      response = await fetch(uri, request);
      await logResponse("create org1", response);
      expect(response.status, "create org1").to.equal(201);
      // get org
      request = {
        method: "GET",
        headers: headers
      };
      response = await fetch(uri, request);
      await logResponse("get org1", response);
      expect(response.status, "get org1").to.equal(200);

      expect(false, "TODO: continue here").to.be.true;

    });

  });

});
