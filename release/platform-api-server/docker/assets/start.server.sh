#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

echo " >>> Starting server ..."
  cd $scriptDir
  runScript="node dist/server/index.js"
  $runScript
  if [[ $? != 0 ]]; then echo " >>> ERROR: starting server"; exit 1; fi
echo " >>> Success."

###
# The End.
