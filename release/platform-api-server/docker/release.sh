#!/usr/bin/env bash

scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));


############################################################################################################################
# Run

echo " >>> Npm install ..."
  cd $scriptDir
  runScript="npm install"
  $runScript
  code=$?;
  if [[ $code != 0 ]]; then echo ">>> ERROR - code=$code - $runScript' - $scriptName"; exit 1; fi
echo " >>> Success."

echo " >>> Build Docker Image ..."
  cd $scriptDir
  runScript="npm run build"
  $runScript
  code=$?;
  if [[ $code != 0 ]]; then echo ">>> ERROR - code=$code - $runScript' - $scriptName"; exit 1; fi
echo " >>> Success."

echo " >>> Publish Docker Image ..."
  echo ">>> ERROR - publish the image to docker hub now "; exit 1;
  runScript="xxx"
  $runScript
  code=$?;
  if [[ $code != 0 ]]; then echo ">>> ERROR - code=$code - $runScript' - $scriptName"; exit 1; fi
echo " >>> Success."


# echo " >>> Starting release of platform-api-openapi ..."
#   cd $scriptDir
#   runScript="npm publish"
#   # runScript="npm publish --dry-run"
#   $runScript
#   code=$?; if [[ $code != 0 ]]; then echo ">>> ERROR - code=$code - $runScript' - $scriptName"; exit 1; fi
# echo " >>> Success."


###
# The End.
