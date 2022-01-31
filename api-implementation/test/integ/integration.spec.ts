import 'mocha';

// describe("orgs", function() {
//   require('./orgs/orgs.create.spec.ts')
// });

describe("apps", function() {
  require('./apps/apps.developer.create.spec.ts')
  require('./apps/apps.developer.delete.spec.ts')
  require('./apps/apps.developer.list.spec.ts')
  require('./apps/apps.developer.patch.spec.ts')
});