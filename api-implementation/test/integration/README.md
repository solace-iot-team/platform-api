# integration & concurreny tests

## prerequisites

* **node**
* **npm**
* **docker**

````bash
cd {root}/platform-api/api-implementation
npm install
````
## environment variables

[Standard environment:](./source.env.sh)
````bash
source source.env.sh

# Output in:
echo $APIM_INTEGRATION_TEST_WORKING_DIR
# Logfiles in:
echo $APIM_INTEGRATION_TEST_LOG_DIR

````

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

## integration tests

````bash
cd {root}/platform-api/api-implementation/test/integration
# development: output to console
./run.npm.integration-tests.sh

# test: output to log file
./run.npm.integration-tests.logfile.sh
# log file:

````

## concurrency tests
````bash
cd {root}/platform-api/api-implementation/test/integration
# test: output to log file
./run.npm.concurrency-tests.sh
# log files:
$APIM_INTEGRATION_TEST_LOG_DIR/concurrency-test/*.{orgx}.out
````

## bootstrapping demo
Changing the values below allows certain tests to run against a live demo env.

[Add your demo env secrets - see instructions here](./template.source.secrets.env.demo.sh).
````bash
cd {root}/platform-api/api-implementation/test/integration
source source.secrets.env.demo.sh
npm run test:bootstrap-demo
````


----
