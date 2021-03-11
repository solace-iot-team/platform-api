#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Environment Variables

  if [ -z "$APIM_INTEGRATION_TEST_LOG_DIR" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_LOG_DIR"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_DB_URL" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_DB_URL"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_PLATFORM_PORT" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_PLATFORM_PORT"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_APP_ID" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_APP_ID"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_LOG_LEVEL" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_LOG_LEVEL"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_FILE_USER_REGISTRY" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_FILE_USER_REGISTRY"; exit 1; fi

############################################################################################################################
# Run

MY_LOG_DIR="$APIM_INTEGRATION_TEST_LOG_DIR/server"; mkdir -p $MY_LOG_DIR;
MY_PID_FILE="$MY_LOG_DIR/server.pid"
IS_BACKGROUND=$1

echo " >>> Starting server ..."
  # map to server env
  export DB_URL=$APIM_INTEGRATION_TEST_DB_URL
  export PLATFORM_PORT=$APIM_INTEGRATION_TEST_PLATFORM_PORT
  export APP_ID=$APIM_INTEGRATION_TEST_APP_ID
  export LOG_LEVEL=$APIM_INTEGRATION_TEST_LOG_LEVEL
  export FILE_USER_REGISTRY=$APIM_INTEGRATION_TEST_FILE_USER_REGISTRY

  if [ -z "$IS_BACKGROUND" ]; then
    npm run dev
    if [[ $? != 0 ]]; then echo " >>> ERROR: starting server"; exit 1; fi
  else
    echo "starting in background ..."
    # npm run start, re-direct output to log file or define log file location
    logFileName="$MY_LOG_DIR/npm-run-dev.log"
    nohup npm run dev > $logFileName 2>&1 &
    if [[ $? != 0 ]]; then echo " >>> ERROR: starting server"; exit 1; fi
    serverPid="$!"; echo $serverPid > $MY_PID_FILE
    echo "pid:"; cat $MY_PID_FILE

    # grep log file for ERRORS
    echo " >>> waiting for server to start ..."
    echo " >>> log file: $logFileName"
    sleep 15s
    # cat $logFileName
    errors=$(grep -n -r -e "Error" $logFileName )
    if [ ! -z "$errors" ]; then
      echo " >>> ERROR: starting server"; exit 1;
    fi
  fi
echo " >>> Success."

###
# The End.
