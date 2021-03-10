# integration-test

## prerequisites
````bash
cd {root}/platform-api/api-implementation
npm install
# npm run compile
#
# # run in development mode
# npm run dev
#
# # run tests
# npm run test
````

## environment variables

TODO: get the full set, example?
could use source.evn.sh - any secrets in there?

````bash
export APIM_SOLACE_PLATFORM_API_PROJECT_HOME="$projectHome"

export APIM_INTEGRATION_TEST_MONGO_ROOT_USERNAME={username}
export APIM_INTEGRATION_TEST_MONGO_ROOT_PASSWORD={password}
````
## local integration test

````bash

docker-compose -f mongodb/docker-compose.yml up -d

# check
docker ps
docker volume ls | grep mongo
# login
docker exec -ti integration-mongodb bash

  mongo admin -u root -p mongo
  show dbs
  use xxx?
  show collections

docker-compose -f mongodb/docker-compose.yml down
````





----
