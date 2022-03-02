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
  require('./orgs/orgs.get.token.spec.ts');
  require('./orgs/orgs.update.spec.ts');
  require('./orgs/orgs.update.token.spec.ts');
  require('./orgs/orgs.list.spec.ts');
});

describe("environments", function () {
  require('./environments/environments.create.spec.ts');
  require('./environments/environments.delete.spec.ts');
  require('./environments/environments.get.spec.ts');
  require('./environments/environments.update.spec.ts');
  require('./environments/environments.list.spec.ts');
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

describe("developers", function () {
  require('./developers/developers.create.spec.ts');
  require('./developers/developers.delete.spec.ts');
  require('./developers/developers.get.spec.ts');
  require('./developers/developers.update.spec.ts');
  require('./developers/developers.list.spec.ts');
});

describe("developer-apps", function() {
  require('./developer-apps/developer-apps.create.spec.ts');
  require('./developer-apps/developer-apps.delete.spec.ts');
  require('./developer-apps/developer-apps.get.spec.ts');
  require('./developer-apps/developer-apps.update.spec.ts');
  require('./developer-apps/developer-apps.list.spec.ts');
});

describe("teams", function () {
  require('./teams/teams.create.spec.ts');
  require('./teams/teams.delete.spec.ts');
  require('./teams/teams.get.spec.ts');
  require('./teams/teams.update.spec.ts');
  require('./teams/teams.list.spec.ts');
});

describe("team-apps", function() {
  require('./team-apps/team-apps.create.spec.ts');
  require('./team-apps/team-apps.delete.spec.ts');
  require('./team-apps/team-apps.get.spec.ts');
  require('./team-apps/team-apps.update.spec.ts');
  require('./team-apps/team-apps.list.spec.ts');
});

describe("apps", function () {
  require('./apps/apps.get.spec.ts');
  require('./apps/apps.get.api.spec.ts');
  require('./apps/apps.get.apis.spec.ts');
  require('./apps/apps.get.status.spec.ts');
  require('./apps/apps.list.spec.ts');
  require('./apps/apps.list.via.api-product.spec.ts');
});

describe("history", function () {
  require('./history/history.list.spec.ts');
});