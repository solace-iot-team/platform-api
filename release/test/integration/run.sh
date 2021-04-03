#!/usr/bin/env bash

scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Environment Variables

  if [ -z "$APIM_SOLACE_PLATFORM_API_PROJECT_HOME" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_SOLACE_PLATFORM_API_PROJECT_HOME"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_LOG_DIR" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_LOG_DIR"; exit 1; fi

############################################################################################################################
# Prepare

  integrationLibDir="$APIM_SOLACE_PLATFORM_API_PROJECT_HOME/api-implementation/test/lib"
  integrationDir="$APIM_SOLACE_PLATFORM_API_PROJECT_HOME/api-implementation/test/integration"
  # map release test secrets env to integration test env
  export APIM_INTEGRATION_TEST_SOLACE_CLOUD_URL=$APIM_RELEASE_TEST_SOLACE_CLOUD_URL
  export APIM_INTEGRATION_TEST_SOLACE_CLOUD_TOKEN=$APIM_RELEASE_TEST_SOLACE_CLOUD_TOKEN
  export APIM_INTEGRATION_TEST_SOLACE_EVENT_PORTAL_URL=$APIM_RELEASE_TEST_SOLACE_EVENT_PORTAL_URL
  export APIM_INTEGRATION_TEST_SOLACE_EVENT_PORTAL_TOKEN=$APIM_RELEASE_TEST_SOLACE_EVENT_PORTAL_TOKEN
  export APIM_INTEGRATION_TEST_PLATFORM_ADMIN_USER=$APIM_RELEASE_TEST_PLATFORM_ADMIN_USER
  export APIM_INTEGRATION_TEST_PLATFORM_ADMIN_PASSWORD=$APIM_RELEASE_TEST_PLATFORM_ADMIN_PASSWORD

############################################################################################################################
# Run

echo ">>> Run integration test ..."
  # get the openapi client and copy to  $integrationLibDir
  cd $scriptDir
  npm install
  mkdir -p $integrationLibDir/generated/openapi
  cp -a ./node_modules/@solace-iot-team/platform-api-openapi-client/dist/* $integrationLibDir/generated/openapi
  code=$?; if [[ $code != 0 ]]; then echo " >>> ERROR - code=$code - cp openapi client package - $scriptName"; exit 1; fi
  cd $integrationDir
  npm install
  source source.env.sh
  export APIM_INTEGRATION_TEST_LOG_DIR=$APIM_RELEASE_TEST_LOG_DIR
  runScript="./run.npm.integration-tests.logfile.sh"
  $runScript
  code=$?; if [[ $code != 0 ]]; then echo " >>> ERROR - code=$code - runScript='$runScript' - $scriptName"; exit 1; fi
echo ">>> Success";

###
# The End.
