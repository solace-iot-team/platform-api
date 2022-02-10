import 'mocha';

describe("administration", function () {
  require('./administration/orgs.create.spec.ts');
  require('./administration/orgs.delete.spec.ts');
  require('./administration/orgs.get.spec.ts');
  require('./administration/orgs.update.spec.ts');
  require('./administration/orgs.list.spec.ts');
  require('./administration/healthcheck.spec.ts');
  require('./administration/about.spec.ts');
});

describe("developers", function () {
  require('./developers/developers.create.spec.ts');
  require('./developers/developers.delete.spec.ts');
  require('./developers/developers.get.spec.ts');
  require('./developers/developers.update.spec.ts');
  require('./developers/developers.list.spec.ts');
});

describe("apps", function () {
  require('./apps/apps.developer.create.spec.ts');
  require('./apps/apps.developer.delete.spec.ts');
  require('./apps/apps.developer.get.spec.ts');
  require('./apps/apps.developer.update.spec.ts');
  require('./apps/apps.developer.list.spec.ts');
  require('./apps/apps.all.get.spec.ts');
  require('./apps/apps.all.list.spec.ts');
  require('./apps/apps.all.get.api.spec.ts');
  require('./apps/apps.all.list.apis.spec.ts');
  require('./apps/apps.all.get.status.spec.ts');
});