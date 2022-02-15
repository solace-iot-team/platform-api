#!/usr/bin/env bash

scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Set environment variables

apiYamlFile="$scriptDir/../server/common/api.yml"
outputDir="$scriptDir/lib/generated/openapi"

############################################################################################################################
# Run

echo ">>> Generating platform openapi client ..."

runScript="npx openapi --input $apiYamlFile --output $outputDir --client node --useOptions --exposeHeadersAndBody --exportSchemas true"
$runScript
code=$?; if [[ $code != 0 ]]; then echo " >>> ERROR - code=$code - runScript='$runScript' - $scriptName"; exit 1; fi

echo ">>> FINISHED"

###
# Done
