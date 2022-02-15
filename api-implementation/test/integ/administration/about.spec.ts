import 'mocha';
import { expect } from 'chai';
import path from 'path';
import type { About } from '../../lib/generated/openapi';
import {
  AdministrationService,
  ApiError,
} from '../../lib/generated/openapi';

const scriptName: string = path.basename(__filename);

describe(scriptName, function () {

  it("should return 'about' information", async function () {

    const response = await AdministrationService.about().catch((reason) => {
      expect(reason, `error=${reason.message}`).is.instanceof(ApiError);
      expect.fail(`failed to get about information; error="${reason.statusText}"`);
    });

    // Note: The version information is generated when the server is build, but
    //       not available when running the integration tests.

    expect(response.body, "proxy mode is incorrect").to.have.property("APIS_PROXY_MODE", false);
    expect(response.body, "version is not set").to.have.property("version");
  });

});
