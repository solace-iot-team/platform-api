#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Settings

dockerProjectName="platform-api-test-mongodb"
dockerTearDownOptions="${PLATFORM_API_TEST_MONGO_TEARDOWN_OPTIONS:---volumes --rmi all}"

############################################################################################################################
# Run

echo " >>> Starting: $scriptName ..."
  docker-compose -p $dockerProjectName -f "$scriptDir/docker-compose.yml" down $dockerTearDownOptions
  if [[ $? != 0 ]]; then echo " >>> ERROR: stopping mongo in docker"; exit 1; fi
  docker ps -a
echo " >>> Success."

###
# The End.
