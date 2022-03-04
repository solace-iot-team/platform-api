#
# Template for setting secrets in environment
#
# cp template.source.env.secrets.sh source.env.secrets.sh
# vi source.env.secrets.sh
#  ... enter secrets
#

export PLATFORM_API_TEST_PLATFORM_ADMIN_USER="{user}"
export PLATFORM_API_TEST_PLATFORM_ADMIN_PASSWORD="{password}"
export PLATFORM_API_TEST_SOLACE_CLOUD_URL="https://api.solace.cloud/api/v0"
export PLATFORM_API_TEST_SOLACE_CLOUD_TOKEN="{solace-cloud-token}"
export PLATFORM_API_TEST_SOLACE_EVENT_PORTAL_URL="https://api.solace.cloud/api/v0/eventPortal"
export PLATFORM_API_TEST_SOLACE_EVENT_PORTAL_TOKEN="{solace-event-portal-token}"
