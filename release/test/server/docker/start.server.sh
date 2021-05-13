#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Environment Variables

  if [ -z "$APIM_RELEASE_TEST_DOCKER_CONTAINER_NAME" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_DOCKER_CONTAINER_NAME"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_MONGO_DATABASE" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_MONGO_DATABASE"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_MONGO_PORT" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_MONGO_PORT"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_PLATFORM_PORT" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_PLATFORM_PORT"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_AUTH_EXTRACTION_USER_PRINCIPAL" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_AUTH_EXTRACTION_USER_PRINCIPAL"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_AUTH_EXTRACTION_ORGS" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_AUTH_EXTRACTION_ORGS"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_AUTH_EXTRACTION_ROLES" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_AUTH_EXTRACTION_ROLES"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_AUTH_VERIFICATION_KEY" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_AUTH_VERIFICATION_KEY"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_AUTH_VERIFICATION_ISSUER" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_AUTH_VERIFICATION_ISSUER"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_AUTH_VERIFICATION_AUD" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_AUTH_VERIFICATION_AUD"; exit 1; fi
  if [ -z "$APIM_RELEASE_TEST_AUTH_DISCOVERY_OIDC_URL" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_RELEASE_TEST_AUTH_DISCOVERY_OIDC_URL  "; exit 1; fi

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
jwtKey="$platformApiServerDataVolumeInternal/jwt_integration_test.pem"

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

  export CONTAINER_NAME=$APIM_RELEASE_TEST_DOCKER_CONTAINER_NAME
  export IMAGE="solaceiotteam/apim-connector-server:latest"
  export PLATFORM_DATA_MOUNT_PATH=$platformApiServerDataVolumeMountPath
  export PLATFORM_DATA_INTERNAL_PATH=$platformApiServerDataVolumeInternal
  export PLATFORM_PORT=$APIM_RELEASE_TEST_PLATFORM_PORT
  export DB_URL=$localMongoDBUrl
  export LOG_LEVEL=debug
  export APP_ID=platform-api-server
  export FILE_USER_REGISTRY=$fileUserRegistry
  export AUTH_EXTRACTION_USER_PRINCIPAL=$APIM_RELEASE_TEST_AUTH_EXTRACTION_USER_PRINCIPAL
  export AUTH_EXTRACTION_ORGS=$APIM_RELEASE_TEST_AUTH_EXTRACTION_ORGS
  export AUTH_EXTRACTION_ROLES=$APIM_RELEASE_TEST_AUTH_EXTRACTION_ROLES
  export AUTH_VERIFICATION_KEY=$jwtKey
  export AUTH_VERIFICATION_ISSUER=$APIM_RELEASE_TEST_AUTH_VERIFICATION_ISSUER
  export AUTH_VERIFICATION_AUD=$APIM_RELEASE_TEST_AUTH_VERIFICATION_AUD
  export AUTH_DISCOVERY_OIDC_URL=$APIM_RELEASE_TEST_AUTH_DISCOVERY_OIDC_URL
  export DOCKER_CLIENT_TIMEOUT=120
  export COMPOSE_HTTP_TIMEOUT=120

  echo "   >>> docker-compose up ..."
    # try multiple times, sometimes the docker registry is not available
    code=1; counter=0
    until [[ $code -eq 0 || $counter -gt 10 ]]; do
      ((counter++))
      docker-compose -f "$dockerComposeFile" up -d
      code=$?;
      if [ $code -gt 0 ]; then sleep 2s; fi
    done
    echo "     - tries: $counter"
    if [[ $code != 0 ]]; then echo " >>> ERROR: docker compose with '$dockerComposeFile', tries=$counter"; exit 1; fi
    docker ps -a
  echo "   >>> success."

  echo "   >>> check docker logs if server up ..."
    # wait until initialized
    WORKING_DIR=$scriptDir/tmp; mkdir -p $WORKING_DIR; rm -rf $WORKING_DIR/*;
    dockerLogsFile="$WORKING_DIR/docker.logs"
    isInitialized=0; checks=0
    isListeningOnPortInitialized=0; isConnected2MongoInitialized=0; isLoadedUserRegistryInitialized=0;
    until [[ $isInitialized -gt 2 || $checks -gt 10 ]]; do
      ((checks++))
      echo "   check: $checks"
      docker logs $CONTAINER_NAME > $dockerLogsFile
      entryListeningOnPort=$(grep -n -e "Listening on port $PLATFORM_PORT" $dockerLogsFile)
      echo "      - entryListeningOnPort='$entryListeningOnPort'"
      if [ ! -z "$entryListeningOnPort" ]; then ((isListeningOnPortInitialized=1)); fi
      entryConnected2Mongo=$(grep -n -e "Connected to Mongo" $dockerLogsFile)
      echo "      - entryConnected2Mongo='$entryConnected2Mongo'"
      if [ ! -z "$entryConnected2Mongo" ]; then ((isConnected2MongoInitialized=1)); fi
      entryLoadedUserRegistry=$(grep -n -e "Loaded user registry" $dockerLogsFile)
      echo "      - entryLoadedUserRegistry='$entryLoadedUserRegistry'"
      if [ ! -z "$entryLoadedUserRegistry" ]; then ((isLoadedUserRegistryInitialized=1)); fi
      isInitialized=$((isListeningOnPortInitialized + isConnected2MongoInitialized + isLoadedUserRegistryInitialized))
      if [ $isInitialized -lt 3 ]; then sleep 2s; fi
    done
    if [ $isInitialized -lt 3 ]; then echo " >>> ERROR: server is not initialized, checks=$checks"; exit 1; fi
  echo "   >>> success."

echo " >>> Success."

  # docker exec -ti platform-api-server bash
  # docker logs platform-api-server

###
# The End.
