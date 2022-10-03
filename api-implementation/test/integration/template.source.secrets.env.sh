#
# template for setting secrets in environment
#
# cp template.source.secrets.env.sh source.env.secrets.sh
# vi source.env.secrets.sh
#  ... enter secrets
# source source.secrets.env.sh
#

export APIM_INTEGRATION_TEST_PLATFORM_ADMIN_USER="{user}"
export APIM_INTEGRATION_TEST_PLATFORM_ADMIN_PASSWORD="{password}"
export APIM_INTEGRATION_TEST_SOLACE_CLOUD_URL="https://api.solace.cloud/api/v0"
export APIM_INTEGRATION_TEST_SOLACE_CLOUD_TOKEN="{solace-cloud-token}"
export APIM_INTEGRATION_TEST_SOLACE_EVENT_PORTAL_URL="{solace-event-portal-api-url}"
export APIM_INTEGRATION_TEST_SOLACE_EVENT_PORTAL_TOKEN="{solace-event-portal-token}"