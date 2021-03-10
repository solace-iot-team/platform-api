#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Environment Variables

  if [ -z "$APIM_SOLACE_PLATFORM_API_PROJECT_HOME" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_SOLACE_PLATFORM_API_PROJECT_HOME"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_WORKING_DIR" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_SOLACE_PLATFORM_API_PROJECT_HOME"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_LOG_DIR" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_SOLACE_PLATFORM_API_PROJECT_HOME"; exit 1; fi
  # docker commpose file
  if [ -z "$APIM_INTEGRATION_TEST_MONGO_DATABASE" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_MONGO_DATABASE"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_MONGO_PORT" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_MONGO_PORT"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_MONGO_ROOT_USERNAME" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_MONGO_ROOT_USERNAME"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_MONGO_ROOT_PASSWORD" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_MONGO_ROOT_PASSWORD"; exit 1; fi

############################################################################################################################
# Run

echo " >>> Stopping mongo in docker..."
  docker-compose -f "$scriptDir/docker-compose.yml" down
  if [[ $? != 0 ]]; then echo " >>> ERROR: stopping mongo in docker"; exit 1; fi
  docker ps -a
echo " >>> Success."

###
# The End.
