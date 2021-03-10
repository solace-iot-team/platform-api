#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Environment Variables

  if [ -z "$APIM_SOLACE_PLATFORM_API_PROJECT_HOME" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_SOLACE_PLATFORM_API_PROJECT_HOME"; exit 1; fi
  if [ -z "$WORKING_DIR" ]; then export WORKING_DIR="$APIM_SOLACE_PLATFORM_API_PROJECT_HOME/tmp"; mkdir -p $WORKING_DIR; fi
  if [ -z "$LOG_DIR" ]; then export LOG_DIR="$WORKING_DIR/logs"; mkdir -p $LOG_DIR; fi

  # docker commpose file
  if [ -z "$APIM_INTEGRATION_TEST_MONGO_INITDB_PORT" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_MONGO_INITDB_PORT"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_MONGO_ROOT_USERNAME" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_MONGO_ROOT_USERNAME"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_MONGO_ROOT_PASSWORD" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_MONGO_ROOT_PASSWORD"; exit 1; fi

############################################################################################################################
# Run

echo " >>> Starting mongo in docker..."
  docker-compose -f "$scriptDir/docker-compose.yml" up -d
  if [[ $? != 0 ]]; then echo " >>> ERROR: starting mongo in docker"; exit 1; fi
  docker ps -a
echo " >>> Success."

###
# The End.
