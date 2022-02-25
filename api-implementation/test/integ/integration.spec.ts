import 'mocha';

describe("server", function () {
  require('./server/healthcheck.spec.ts');
  require('./server/about.spec.ts');
});

describe("orgs", function () {
  require('./orgs/orgs.create.spec.ts');
  require('./orgs/orgs.delete.spec.ts');
  require('./orgs/orgs.get.spec.ts');
  require('./orgs/orgs.get.services.spec.ts');
  require('./orgs/orgs.update.spec.ts');
  require('./orgs/orgs.list.spec.ts');
});

describe("environments", function () {
  require('./environments/environments.create.spec.ts');
  require('./environments/environments.delete.spec.ts');
  require('./environments/environments.get.spec.ts');
  require('./environments/environments.update.spec.ts');
  require('./environments/environments.list.spec.ts');
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
  require('./api-products/api-products.list.via.env.spec.ts');
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