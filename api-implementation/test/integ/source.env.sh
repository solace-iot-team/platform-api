#
# Set environment variables for integration tests
#
# Usage:
#   source source.env.sh
#

unset_source_env() {

  # unset environment variables for test cases
  unset PLATFORM_API_TEST_ENABLE_LOGGING
  unset PLATFORM_API_TEST_ORG_ADMIN_USER
  unset PLATFORM_API_TEST_ORG_ADMIN_PASSWORD
  unset PLATFORM_API_TEST_SOLACE_CLOUD_SERVICE_ID_DEV
  unset PLATFORM_API_TEST_SOLACE_CLOUD_SERVICE_ID_PROD

  # unset environment variables for test server
  unset PLATFORM_API_TEST_PLATFORM_PROTOCOL
  unset PLATFORM_API_TEST_PLATFORM_HOST
  unset PLATFORM_API_TEST_PLATFORM_PORT
  unset PLATFORM_API_TEST_PLATFORM_DB_URL
  unset PLATFORM_API_TEST_PLATFORM_FILE_USER_REGISTRY
  unset PLATFORM_API_TEST_PLATFORM_APP_ID
  unset PLATFORM_API_TEST_PLATFORM_LOG_LEVEL
  unset PLATFORM_API_TEST_PLATFORM_LOG_FILE
  unset PLATFORM_API_TEST_PLATFORM_AUTH_EXTRACTION_USER_PRINCIPAL
  unset PLATFORM_API_TEST_PLATFORM_AUTH_EXTRACTION_ORGS
  unset PLATFORM_API_TEST_PLATFORM_AUTH_EXTRACTION_ROLES
  unset PLATFORM_API_TEST_PLATFORM_AUTH_VERIFICATION_KEY
  unset PLATFORM_API_TEST_PLATFORM_AUTH_VERIFICATION_ISSUER
  unset PLATFORM_API_TEST_PLATFORM_AUTH_VERIFICATION_AUD
  unset PLATFORM_API_TEST_PLATFORM_AUTH_DISCOVERY_OIDC_URL

  # unset environment variables for test database
  unset PLATFORM_API_TEST_MONGO_DATABASE
  unset PLATFORM_API_TEST_MONGO_PORT

  # unset environment variables for test files and directories
  unset PLATFORM_API_TEST_HOME
  unset PLATFORM_API_TEST_RESOURCES_DIR
  unset PLATFORM_API_TEST_LOGS_DIR

  # unset this function
  unset -f unset_source_env
}

if [ -z "$PLATFORM_API_PROJECT_HOME" ]; then
  _scriptDir=$(pwd)
  projectHome=${_scriptDir%/platform-api/*}
  if [[ ! $projectHome =~ "platform-api" ]]; then
    projectHome=$projectHome/platform-api
  fi
else
  projectHome=$PLATFORM_API_PROJECT_HOME
fi

export PLATFORM_API_PROJECT_HOME="$projectHome"

# Set environment variables for common directories
#
export PLATFORM_API_TEST_HOME="$PLATFORM_API_PROJECT_HOME/api-implementation/test/integ"
export PLATFORM_API_TEST_LOGS_DIR="$PLATFORM_API_TEST_HOME/tmp/logs/$(node --version)"

# Set environment variables for database
#
export PLATFORM_API_TEST_MONGO_DATABASE=platform
export PLATFORM_API_TEST_MONGO_PORT=27020

# Set environment variables for API Management Connector
#
export PLATFORM_API_TEST_PLATFORM_PROTOCOL="http"
export PLATFORM_API_TEST_PLATFORM_HOST="localhost"
export PLATFORM_API_TEST_PLATFORM_PORT="9090"
export PLATFORM_API_TEST_PLATFORM_DB_URL="mongodb://localhost:$PLATFORM_API_TEST_MONGO_PORT/$PLATFORM_API_TEST_MONGO_DATABASE?retryWrites=true&w=majority"
export PLATFORM_API_TEST_PLATFORM_FILE_USER_REGISTRY="$PLATFORM_API_TEST_HOME/resources/users/management.json"
export PLATFORM_API_TEST_PLATFORM_APP_ID="platform-api-test-server"
export PLATFORM_API_TEST_PLATFORM_LOG_LEVEL="debug"
export PLATFORM_API_TEST_PLATFORM_LOG_FILE="$PLATFORM_API_TEST_LOGS_DIR/server.log"
export PLATFORM_API_TEST_PLATFORM_AUTH_EXTRACTION_USER_PRINCIPAL=$.upn
export PLATFORM_API_TEST_PLATFORM_AUTH_EXTRACTION_ORGS=$.groups
export PLATFORM_API_TEST_PLATFORM_AUTH_EXTRACTION_ROLES=$.resource_access['platform-api-server'].roles
export PLATFORM_API_TEST_PLATFORM_AUTH_VERIFICATION_KEY="$PLATFORM_API_TEST_HOME/resources/jwt_integration_test.pem"
export PLATFORM_API_TEST_PLATFORM_AUTH_VERIFICATION_ISSUER=http://localhost:8180/auth/realms/default
export PLATFORM_API_TEST_PLATFORM_AUTH_VERIFICATION_AUD=platform-api-server
export PLATFORM_API_TEST_PLATFORM_AUTH_DISCOVERY_OIDC_URL=http://localhost:8180/auth/realms/default/.well-known/openid-configuration

# Set environment variables for test cases
#
export PLATFORM_API_TEST_ENABLE_LOGGING="true"
export PLATFORM_API_TEST_ORG_ADMIN_USER="org_admin_user"              # must match user with org-admin role in
export PLATFORM_API_TEST_ORG_ADMIN_PASSWORD="org_admin_user_password" # PLATFORM_API_TEST_PLATFORM_FILE_USER_REGISTRY
export PLATFORM_API_TEST_SOLACE_CLOUD_SERVICE_ID_DEV=1i5g7tif6z8n
export PLATFORM_API_TEST_SOLACE_CLOUD_SERVICE_ID_PROD=1n34cqfgy8jp

# Set environment variables with sensitive information
#
if [ -f "$PLATFORM_API_TEST_HOME/source.env.secrets.sh" ]; then
  source "$PLATFORM_API_TEST_HOME/source.env.secrets.sh"
fi

# Set server environment variables based on test environment variables
#
source "$PLATFORM_API_TEST_HOME/source.env.server.sh"

# Print all environment variables to stdout
#
logName='[source.env.sh]'
echo "$logName - test environment:"
export -p | sed 's/declare -x //' | grep PLATFORM_API_TEST
echo ""
