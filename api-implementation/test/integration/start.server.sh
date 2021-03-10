#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Environment Variables

  if [ -z "$APIM_INTEGRATION_TEST_DB_URL" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_DB_URL"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_PLATFORM_PORT" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_PLATFORM_PORT"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_APP_ID" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_APP_ID"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_LOG_LEVEL" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_LOG_LEVEL"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_FILE_USER_REGISTRY" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_FILE_USER_REGISTRY"; exit 1; fi

############################################################################################################################
# Run

echo " >>> Starting server ..."
  export DB_URL=$APIM_INTEGRATION_TEST_DB_URL
  export PLATFORM_PORT=$APIM_INTEGRATION_TEST_PLATFORM_PORT
  export APP_ID=$APIM_INTEGRATION_TEST_APP_ID
  export LOG_LEVEL=$APIM_INTEGRATION_TEST_LOG_LEVEL
  export FILE_USER_REGISTRY=$APIM_INTEGRATION_TEST_FILE_USER_REGISTRY

  # npm run start, re-direct output to log file or define log file location
  npm run dev
  if [[ $? != 0 ]]; then echo " >>> ERROR: starting server"; exit 1; fi

echo " >>> Success."

###
# The End.
