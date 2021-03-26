#!/usr/bin/env bash

scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));
if [ -z "$APIM_SOLACE_PLATFORM_API_PROJECT_HOME" ]; then
  _scriptDir=$(pwd)
  projectHome=${_scriptDir%/platform-api/*}
  if [[ ! $projectHome =~ "platform-api" ]]; then
    projectHome=$projectHome/platform-api
  fi
else
  projectHome=$APIM_SOLACE_PLATFORM_API_PROJECT_HOME
fi

############################################################################################################################
# Environment Variables

  export APIM_SOLACE_PLATFORM_API_PROJECT_HOME="$projectHome"
  export APIM_RELEASE_DIR="$APIM_SOLACE_PLATFORM_API_PROJECT_HOME/release"
  export APIM_RELEASE_LOG_DIR="$APIM_RELEASE_DIR/tmp/logs"
  if [ -z "$RUN_FG" ]; then export RUN_FG="false"; fi

############################################################################################################################
# Prepare

  LOG_DIR=$APIM_RELEASE_LOG_DIR; mkdir -p $LOG_DIR; rm -rf $LOG_DIR/*;

############################################################################################################################
# Scripts

declare -a releaseScripts=(
  "platform-api-openapi/release.sh"
)

############################################################################################################################
# Run

  FAILED=0

  # for testing
  # RUN_FG="true"

  for releaseScript in ${releaseScripts[@]}; do
    if [ "$FAILED" -eq 0 ]; then
      runScript="$scriptDir/$releaseScript"
      echo "starting: $runScript ..."
      if [[ "$RUN_FG" == "false" ]]; then
        logFile="$LOG_DIR/$releaseScript.out"; mkdir -p "$(dirname "$logFile")";
        "$runScript" > $logFile 2>&1
      else
        "$runScript"
      fi
      code=$?; if [[ $code != 0 ]]; then echo ">>> ERROR - code=$code - runScript='$runScript' - $scriptName"; FAILED=1; fi
    fi
  done

##############################################################################################################################
# Check for errors

if [[ "$FAILED" -eq 0 ]]; then
  echo ">>> FINISHED:SUCCESS - $scriptName"
  touch "$LOG_DIR/$scriptName.SUCCESS.out"
else
  echo ">>> FINISHED:FAILED";
  filePattern="$LOG_DIR"
  errors=$(grep -n -r -e "ERROR" $filePattern )
  if [ ! -z "$errors" ]; then
    while IFS= read line; do
      echo $line >> "$LOG_DIR/$scriptName.ERROR.out"
    done < <(printf '%s\n' "$errors")
  fi
  exit 1
fi

###
# The End.
