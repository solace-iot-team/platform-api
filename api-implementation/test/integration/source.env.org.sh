
#  usage:
# source source.env.org.sh {orgName}

orgName=$1
if [ -z "$orgName" ]; then echo ">>> ERROR: orgName is empty"; return 1; fi

export APIM_INTEGRATION_TEST_ORG_NAME="$orgName"
export APIM_INTEGRATION_TEST_ORG_API_USR="org_admin_user"
export APIM_INTEGRATION_TEST_ORG_API_PWD="org_admin_user_password"

###
