#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Environment Variables

  if [ -z "$APIM_SOLACE_PLATFORM_API_PROJECT_HOME" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_SOLACE_PLATFORM_API_PROJECT_HOME"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_WORKING_DIR" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_SOLACE_PLATFORM_API_PROJECT_HOME"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_LOG_DIR" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_SOLACE_PLATFORM_API_PROJECT_HOME"; exit 1; fi
  # docker commpose file
  if [ -z "$APIM_INTEGRATION_TEST_MONGO_DATABASE" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_MONGO_DATABASE"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_MONGO_PORT" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_MONGO_PORT"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_MONGO_ROOT_USERNAME" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_MONGO_ROOT_USERNAME"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_MONGO_ROOT_PASSWORD" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_MONGO_ROOT_PASSWORD"; exit 1; fi
  # add: init-mongo
  if [ -z "$APIM_INTEGRATION_TEST_MONGO_DATABASE_USER" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_MONGO_DATABASE_USER"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_MONGO_DATABASE_PASSWORD" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_MONGO_DATABASE_PASSWORD"; exit 1; fi

############################################################################################################################
# Run

# MY_WORKING_DIR="$APIM_INTEGRATION_TEST_WORKING_DIR/mongo"; mkdir -p $MY_WORKING_DIR;
#
# echo " >>> Generating init-mongo.js ..."
#   database=$APIM_INTEGRATION_TEST_MONGO_DATABASE
#   username=$APIM_INTEGRATION_TEST_MONGO_DATABASE_USER
#   password=$APIM_INTEGRATION_TEST_MONGO_DATABASE_PASSWORD
#
#   # initMongo='
#   #   db.createUser(
#   #     {
#   #       user: "'"$username"'",
#   #       pwd: "'"$password"'",
#   #       roles: [
#   #         {
#   #           role: "readWrite",
#   #           db: "'"$database"'"
#   #         }
#   #       ]
#   #     }
#   #   )
#   # '
#
#   # initMongo='
#   #   use admin;
#   #   db.createRole(
#   #     {
#   #       role: "readWriteAnyDatabase",
#   #       privileges: [
#   #         { resource: { db: "", collection: "" }, actions: ["find", "update", "insert", "remove"] }
#   #       ]
#   #     }
#   #   );
#   #   db.createUser(
#   #     {
#   #       user: "'"$username"'",
#   #       pwd: "'"$password"'",
#   #       roles: [
#   #         "readWriteAnyDatabase"
#   #       ]
#   #     }
#   #   );
#   # '
#
#   export initMongoFile="$MY_WORKING_DIR/init-mongo.js"
#   echo $initMongo > $initMongoFile
#   cat $initMongoFile
# echo " >>> Success."

echo " >>> Starting mongo in docker..."
  docker-compose -f "$scriptDir/docker-compose.yml" up -d
  if [[ $? != 0 ]]; then echo " >>> ERROR: starting mongo in docker"; exit 1; fi
  docker ps -a
echo " >>> Success."

###
# The End.
