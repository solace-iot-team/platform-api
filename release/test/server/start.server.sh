#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Environment Variables

  if [ -z "$APIM_RELEASE_TEST_LOG_DIR" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_LOG_DIR"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_DB_URL" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_DB_URL"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_PLATFORM_PORT" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_PLATFORM_PORT"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_APP_ID" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_APP_ID"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_LOG_LEVEL" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_LOG_LEVEL"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_FILE_USER_REGISTRY" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_FILE_USER_REGISTRY"; exit 1; fi

############################################################################################################################
# Run

MY_LOG_DIR="$APIM_RELEASE_TEST_LOG_DIR/server"; mkdir -p $MY_LOG_DIR;

echo " >>> Starting server ..."
  # map to server env
  export DB_URL=$APIM_RELEASE_TEST_DB_URL
  export PLATFORM_PORT=$APIM_RELEASE_TEST_PLATFORM_PORT
  export APP_ID=$APIM_RELEASE_TEST_APP_ID
  export LOG_LEVEL=$APIM_RELEASE_TEST_LOG_LEVEL
  export FILE_USER_REGISTRY=$APIM_RELEASE_TEST_FILE_USER_REGISTRY

  # **********************************************************************
  # temp fix until release is done
  # change to docker compose

    if [ -z "$APIM_SOLACE_PLATFORM_API_PROJECT_HOME" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_SOLACE_PLATFORM_API_PROJECT_HOME"; exit 1; fi
    SERVER_DIR="$APIM_SOLACE_PLATFORM_API_PROJECT_HOME/api-implementation"
    cd $SERVER_DIR
    startServerScript="npm run server:dev"

  # end fix
  # **********************************************************************
  #

  logFileName="$MY_LOG_DIR/$scriptName.log"
  nohup $startServerScript > $logFileName 2>&1 &
    if [[ $? != 0 ]]; then echo " >>> ERROR: starting server"; exit 1; fi
    # grep log file for ERRORS
    echo " >>> waiting 15 seconds for server to start ..."
    echo " >>> log file: $logFileName"
    sleep 15s
    # cat $logFileName
    errors=$(grep -n -r -e "Error" $logFileName )
    if [ ! -z "$errors" ]; then
      echo " >>> ERROR: starting server"; exit 1;
    fi

echo " >>> Success."

###
# The End.
