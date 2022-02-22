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

describe("apis", function () {
  require('./apis/apis.import.spec.ts');
  require('./apis/apis.create.spec.ts');
  require('./apis/apis.delete.spec.ts');
  require('./apis/apis.get.spec.ts');
  require('./apis/apis.get.info.spec.ts');
  require('./apis/apis.update.spec.ts');
  require('./apis/apis.list.spec.ts');
});

describe("api-products", function () {
  require('./api-products/api-products.create.spec.ts');
  require('./api-products/api-products.delete.spec.ts');
  require('./api-products/api-products.get.spec.ts');
  require('./api-products/api-products.get.api.spec.ts');
  require('./api-products/api-products.get.apis.spec.ts');
  require('./api-products/api-products.update.spec.ts');
  require('./api-products/api-products.list.spec.ts');
  require('./api-products/api-products.list.via.api.spec.ts');
});

describe("apps", function () {
  require('./apps/apps.developer.create.spec.ts');
  require('./apps/apps.developer.delete.spec.ts');
  require('./apps/apps.developer.get.spec.ts');
  require('./apps/apps.developer.update.spec.ts');
  require('./apps/apps.developer.list.spec.ts');
  require('./apps/apps.all.get.spec.ts');
  require('./apps/apps.all.get.api.spec.ts');
  require('./apps/apps.all.get.apis.spec.ts');
  require('./apps/apps.all.get.status.spec.ts');
  require('./apps/apps.all.list.spec.ts');
  require('./apps/apps.all.list.via.api-product.spec.ts');
});