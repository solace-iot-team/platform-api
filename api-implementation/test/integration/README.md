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

[Add your secrets - see instructions here](./template.source.secrets.env.sh).
````bash
source source.secrets.env.sh
````

[Standard environment:](./source.env.sh)
````bash
source source.env.sh
````
* Outputs: `APIM_INTEGRATION_TEST_WORKING_DIR`
* Logfiles: `APIM_INTEGRATION_TEST_LOG_DIR`

## start mongo in docker
````bash
mongodb/start.mongo.sh

# check if user is automatically set-up / login ok
docker exec -it integration-mongodb bash
mongo -u platform-user -p platform-user-password --authenticationDatabase platform
# docker logs
docker logs integration-mongodb
````
### stop mongo
````bash
mongodb/stop.mongo.sh
````

## start server
````bash
# in foreground for development
./start.server.sh

# in background with log file for test
./start.server.background.sh
````
### stop server
````bash
./stop.server.sh
````

## tests

````bash
# development: output to console
./run.npm.integration-tests.sh

# test: output to log file
./run.npm.integration-tests.logfile.sh
# log file:

````



----
