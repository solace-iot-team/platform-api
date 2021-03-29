#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Environment Variables

  if [ -z "$APIM_RELEASE_TEST_MONGO_PORT" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_MONGO_PORT"; exit 1; fi

############################################################################################################################
# Run

echo " >>> Stopping mongo in docker..."
  docker-compose -f "$scriptDir/docker-compose.yml" down
  if [[ $? != 0 ]]; then echo " >>> ERROR: stopping mongo in docker"; exit 1; fi
  docker ps -a
echo " >>> Success."

###
# The End.
