#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Environment Variables

  if [ -z "$APIM_SOLACE_PLATFORM_API_PROJECT_HOME" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_SOLACE_PLATFORM_API_PROJECT_HOME"; exit 1; fi
  if [ -z "$APIM_INTEGRATION_TEST_HOME" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_HOME"; exit 1; fi

############################################################################################################################
# Run

# npx openapi --input ../../server/common/api.yml --output ../lib/generated/openapi --client node

apiYamlFile="$APIM_SOLACE_PLATFORM_API_PROJECT_HOME/api-implementation/server/common/api.yml"
outputDir="$APIM_INTEGRATION_TEST_HOME/../lib/generated/openapi"

echo ">>> Generating platform openapi client ..."
  runScript="npx openapi --input $apiYamlFile --output $outputDir --client node"
  $runScript
  code=$?;
  if [[ $code != 0 ]]; then echo " >>> ERROR - code=$code - runScript='$runScript' - $scriptName"; exit 1; fi
echo ">>> Success";

###
# The End.
