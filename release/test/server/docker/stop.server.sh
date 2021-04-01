#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Environment Variables

  if [ -z "$APIM_SOLACE_PLATFORM_API_PROJECT_HOME" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_SOLACE_PLATFORM_API_PROJECT_HOME"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_LOG_DIR" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_LOG_DIR"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_DOCKER_CONTAINER_NAME" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_DOCKER_CONTAINER_NAME"; exit 1; fi

############################################################################################################################
# Run

echo " >>> Getting docker logs ..."
  _logFile=${scriptDir#"$APIM_SOLACE_PLATFORM_API_PROJECT_HOME/release/"}
  logFile="$APIM_RELEASE_TEST_LOG_DIR/$_logFile/$APIM_RELEASE_TEST_DOCKER_CONTAINER_NAME.docker.log"; mkdir -p "$(dirname "$logFile")";
  runScript="docker logs $APIM_RELEASE_TEST_DOCKER_CONTAINER_NAME"
  $runScript  > $logFile
  if [[ $? != 0 ]]; then echo " >>> ERROR: $runScript "; exit 1; fi
  # TODO: parse the log file for errors - not straightforward, Errors are part of normal operations
echo " >>> Success."

echo " >>> Removing docker container ..."
  runScript="docker rm -f $APIM_RELEASE_TEST_DOCKER_CONTAINER_NAME"
  $runScript
  if [[ $? != 0 ]]; then echo " >>> ERROR: $runScript "; exit 1; fi
  docker ps -a
echo " >>> Success."

###
# The End.
