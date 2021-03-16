#
# template for running against live demo server
#
# cp template.source.secrets.demo.sh source.secrets.demo.sh
# vi source.secrets.demo.sh
#  ... enter secrets
# source source.secrets.demo.sh
#

export APIM_INTEGRATION_TEST_IS_BOOTSTRAP_DEMO="true"

export APIM_INTEGRATION_TEST_PLATFORM_PROTOCOL="http"
export APIM_INTEGRATION_TEST_PLATFORM_HOST="{host}"
export APIM_INTEGRATION_TEST_PLATFORM_PORT="{port}"
# user
export APIM_INTEGRATION_TEST_ORG_NAME="{your demo org}"
export APIM_INTEGRATION_TEST_ORG_API_USR="{api username}"
export APIM_INTEGRATION_TEST_ORG_API_PWD="{api user password}"

env | grep APIM

###
