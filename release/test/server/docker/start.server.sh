#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Environment Variables

  if [ -z "$APIM_RELEASE_TEST_MONGO_DATABASE" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_MONGO_DATABASE"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_MONGO_PORT" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_MONGO_PORT"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_PLATFORM_PORT" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_PLATFORM_PORT"; exit 1; fi


############################################################################################################################
# Run

dockerComposeFileMac="$scriptDir/docker-compose.mac.yml"
localMongoDBUrlMac="mongodb://host.docker.internal:$APIM_RELEASE_TEST_MONGO_PORT/$APIM_RELEASE_TEST_MONGO_DATABASE?retryWrites=true&w=majority"
dockerComposeFileLinux="$scriptDir/docker-compose.linux.yml"
localMongoDBUrlLinux="mongodb://127.0.0.1:$APIM_RELEASE_TEST_MONGO_PORT/$APIM_RELEASE_TEST_MONGO_DATABASE?retryWrites=true&w=majority"
dockerComposeFile="null"
localMongoDBUrl="null"
platformApiServerDataVolumeMountPath="$scriptDir/data"
platformApiServerDataVolumeInternal="/platform-api-server/data"
fileUserRegistry="$platformApiServerDataVolumeInternal/organization_users.json"

echo " >>> Starting server in docker..."

  uName=$(uname -s)
  case $uName in
    Darwin)
      dockerComposeFile=$dockerComposeFileMac
      localMongoDBUrl=$localMongoDBUrlMac
      ;;
    Linux)
      dockerComposeFile=$dockerComposeFileLinux
      localMongoDBUrl=$localMongoDBUrlLinux
      ;;
    *)
      echo ">>> ERROR: unknown OS: $uName"; exit 1
      ;;
  esac

  export CONTAINER_NAME="release-platform-api-server"
  export IMAGE="platform-api-server-test:latest"
  export PLATFORM_DATA_MOUNT_PATH=$platformApiServerDataVolumeMountPath
  export PLATFORM_DATA_INTERNAL_PATH=$platformApiServerDataVolumeInternal
  export PLATFORM_PORT=$APIM_RELEASE_TEST_PLATFORM_PORT
  export DB_URL=$localMongoDBUrl
  export LOG_LEVEL=debug
  export APP_ID=platform-api-server
  export FILE_USER_REGISTRY=$fileUserRegistry

  docker-compose -f "$dockerComposeFile" up -d
  if [[ $? != 0 ]]; then echo " >>> ERROR: docker compose with '$dockerComposeFile'"; exit 1; fi
  docker ps -a
echo " >>> Success."

  # docker exec -ti platform-api-server bash
  # docker logs platform-api-server

###
# The End.
