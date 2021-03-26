#!/usr/bin/env bash

scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Run

echo " >>> Starting release of platform-api-openapi ..."
  cd $scriptDir
  # releaseScript="npm publish --dry-run"
  releaseScript="npm publish"
  $releaseScript
  code=$?;
  if [[ $code == 2 ]]; then
    echo ">>> nothing to do, version up to date - code=$code - $releaseScript' - $scriptName";
  elif [[ $code != 0 ]]; then
    echo ">>> ERROR - code=$code - $releaseScript' - $scriptName"; exit 1;
  fi
echo " >>> Success."


###
# The End.
