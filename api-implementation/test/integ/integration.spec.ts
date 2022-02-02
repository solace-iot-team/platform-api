import 'mocha';

describe("administration", function() {
  require('./administration/orgs.create.spec.ts')
  require('./administration/orgs.delete.spec.ts')
  require('./administration/orgs.get.spec.ts')
  require('./administration/orgs.list.spec.ts')
  require('./administration/orgs.update.spec.ts')
  require('./administration/healthcheck.spec.ts')
  require('./administration/about.spec.ts')
});

describe("apps", function() {
  require('./apps/apps.developer.create.spec.ts')
  require('./apps/apps.developer.delete.spec.ts')
  require('./apps/apps.developer.list.spec.ts')
  require('./apps/apps.developer.patch.spec.ts')
});