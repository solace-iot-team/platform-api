#!/usr/bin/env bash

scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Set environment variables

apiYamlFile="${PLATFORM_API_PROJECT_HOME:-$scriptDir/../..}/server/common/api.yml"
outputDir="${PLATFORM_API_TEST_HOME:-$scriptDir}/../lib/generated/openapi"

############################################################################################################################
# Run

echo ">>> Generating platform openapi client ..."

runScript="npx openapi --input $apiYamlFile --output $outputDir --client node"
$runScript
code=$?; if [[ $code != 0 ]]; then echo " >>> ERROR - code=$code - runScript='$runScript' - $scriptName"; exit 1; fi

echo ">>> FINISHED"

###
# Done
