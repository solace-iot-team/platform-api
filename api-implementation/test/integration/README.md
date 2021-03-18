# integration-test

## prerequisites

* **node**
* **npm**
* **docker**

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

[Standard environment:](./source.env.sh)
````bash
source source.env.sh
````
* Outputs: `APIM_INTEGRATION_TEST_WORKING_DIR`
* Logfiles: `APIM_INTEGRATION_TEST_LOG_DIR`

[Add your secrets - see instructions here](./template.source.secrets.env.sh).
````bash
source source.secrets.env.sh
````
## generate openapi client
````bash
cd {root}/platform-api/api-implementation/test/integration
./generate.openapi-client.sh
````
## start mongo in docker
````bash
cd {root}/platform-api/api-implementation/test/integration
mongodb/start.mongo.sh

# check if user is automatically set-up / login ok
docker exec -it integration-mongodb bash
mongo -u platform-user -p platform-user-password --authenticationDatabase platform
# docker logs
docker logs integration-mongodb
````
### stop mongo
````bash
cd {root}/platform-api/api-implementation/test/integration
mongodb/stop.mongo.sh
````

## start server
````bash
cd {root}/platform-api/api-implementation/test/integration
# in foreground for development
./start.server.sh

# in background with log file for test
./start.server.background.sh
````
### stop server
````bash
cd {root}/platform-api/api-implementation/test/integration
./stop.server.sh
````

## tests

````bash
cd {root}/platform-api/api-implementation/test/integration
# development: output to console
./run.npm.integration-tests.sh

# test: output to log file
./run.npm.integration-tests.logfile.sh
# log file:

````

## Running against demo server
Changing the values below allows certain tests to run against a live demo env.

[Add your demo env secrets - see instructions here](./template.source.secrets.demo.sh).
````bash
cd {root}/platform-api/api-implementation/test/integration
source source.secrets.demo.sh
npm run demo:bootstrap
````


----
