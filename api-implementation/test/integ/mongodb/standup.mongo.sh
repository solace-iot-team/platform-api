#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Settings

if [ -z "$PLATFORM_API_TEST_MONGO_PORT" ]; then
  echo ">>> ERROR: - $scriptName - missing env var: PLATFORM_API_TEST_MONGO_PORT"
  exit 1
fi

dockerProjectName="platform-api-test-mongodb"

############################################################################################################################
# Run

echo " >>> Starting: $scriptName ..."
  # try multiple times, sometimes the docker registry is not available
  code=1; counter=0
  until [[ $code -eq 0 || $counter -gt 30 ]]; do
    ((counter++))
    docker-compose -p $dockerProjectName -f "$scriptDir/docker-compose.yml" up -d
    code=$?;
    if [ $code -gt 0 ]; then sleep 2s; fi
  done
  echo "     - tries: $counter"
  if [[ $code != 0 ]]; then echo " >>> ERROR: starting mongo in docker '$dockerComposeFile', tries=$counter"; exit 1; fi
  docker ps -a
echo " >>> Success."

###
# The End.
