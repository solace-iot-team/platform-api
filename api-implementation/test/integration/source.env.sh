
#  usage:
# source source.env.sh

if [ -z "$APIM_SOLACE_PLATFORM_API_PROJECT_HOME" ]; then
  _scriptDir=$(pwd)
  projectHome=${_scriptDir%/platform-api/*}
  if [[ ! $projectHome =~ "platform-api" ]]; then
    projectHome=$projectHome/platform-api
  fi
else
  projectHome=$APIM_SOLACE_PLATFORM_API_PROJECT_HOME
fi

export APIM_INTEGRATION_TEST_ENABLE_LOGGING="true"
export APIM_SOLACE_PLATFORM_API_PROJECT_HOME="$projectHome"
export APIM_INTEGRATION_TEST_HOME="$APIM_SOLACE_PLATFORM_API_PROJECT_HOME/api-implementation/test/integration"
export APIM_INTEGRATION_TEST_RESOURCES_HOME="$APIM_INTEGRATION_TEST_HOME/resources"
export APIM_INTEGRATION_TEST_WORKING_DIR="$APIM_INTEGRATION_TEST_HOME/tmp"; mkdir -p $APIM_INTEGRATION_TEST_WORKING_DIR;
nodeVersion=$(node --version)
export APIM_INTEGRATION_TEST_LOG_DIR="$APIM_INTEGRATION_TEST_WORKING_DIR/logs/node-$nodeVersion"; mkdir -p $APIM_INTEGRATION_TEST_LOG_DIR;
export APIM_INTEGRATION_TEST_MONGO_DATABASE=platform
export APIM_INTEGRATION_TEST_MONGO_DATABASE_USER=platform-user
export APIM_INTEGRATION_TEST_MONGO_DATABASE_PASSWORD=platform-user-password
export APIM_INTEGRATION_TEST_MONGO_ROOT_USERNAME=mongo-root
export APIM_INTEGRATION_TEST_MONGO_ROOT_PASSWORD=mongo-root-pass
export APIM_INTEGRATION_TEST_MONGO_PORT=27017
# mongodb://YourUsername:YourPasswordHere@127.0.0.1:27017/your-database-name
# export APIM_INTEGRATION_TEST_DB_URL="mongodb://$APIM_INTEGRATION_TEST_MONGO_DATABASE_USER:$APIM_INTEGRATION_TEST_MONGO_DATABASE_PASSWORD@localhost:$APIM_INTEGRATION_TEST_MONGO_PORT/$APIM_INTEGRATION_TEST_MONGO_DATABASE?retryWrites=true&w=majority"
# without auth in mongo
export APIM_INTEGRATION_TEST_DB_URL="mongodb://localhost:$APIM_INTEGRATION_TEST_MONGO_PORT/$APIM_INTEGRATION_TEST_MONGO_DATABASE?retryWrites=true&w=majority"
export APIM_INTEGRATION_TEST_PLATFORM_PROTOCOL="http"
export APIM_INTEGRATION_TEST_PLATFORM_HOST="localhost"
export APIM_INTEGRATION_TEST_PLATFORM_PORT="9090"
export APIM_INTEGRATION_TEST_APP_ID="integration-test"
# 'fatal', 'error', 'warn', 'info', 'debug', 'trace' or 'silent'
export APIM_INTEGRATION_TEST_LOG_LEVEL="debug"
export APIM_INTEGRATION_TEST_FILE_USER_REGISTRY="$APIM_INTEGRATION_TEST_RESOURCES_HOME/organization_users.json"
# service ids
export APIM_INTEGRATION_TEST_SOLACE_CLOUD_DEV_SERVICE_ID="1i5g7tif6z8n"
export APIM_INTEGRATION_TEST_SOLACE_CLOUD_PROD_SERVICE_ID="1n34cqfgy8jp"
export APIM_INTEGRATION_TEST_SOLACE_CLOUD_NO_MQTT_SERVICE_ID="1rvhmgxlxhvh"
# specs & data: uc-elevator-co
export APIM_INTEGRATION_TEST_UC_ELEVATOR_CO_API_SPEC_MAINTENANCE_FILE="$APIM_INTEGRATION_TEST_RESOURCES_HOME/uc-elevator-co/ApiMaintenance.async-api-spec.yml"
# developers
export APIM_INTEGRATION_TEST_DEVELOPERS_FILE="$APIM_INTEGRATION_TEST_RESOURCES_HOME/developers.json"
# demo
unset APIM_INTEGRATION_TEST_IS_BOOTSTRAP_DEMO
# org
source "$APIM_INTEGRATION_TEST_HOME/source.env.org.sh" integration-test-org

env | grep APIM

###
