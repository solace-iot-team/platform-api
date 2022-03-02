#!/usr/bin/env bash

scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Set environment variables

source "$scriptDir/../source.env.sh"

############################################################################################################################
# Prepare

LOG_DIR="${PLATFORM_API_TEST_LOGS_DIR:-$scriptDir/tmp/logs}"
mkdir -p $LOG_DIR
rm -rf $LOG_DIR/*

LOG_FILE="$LOG_DIR/server.log"
LOG_FILE_SCRIPT="$LOG_DIR/npm.run.test-integ.log"

FAILED=0

############################################################################################################################
# Run

runScript="npm run test:integ"
echo "Starting: $runScript ..."
$runScript > $LOG_FILE_SCRIPT 2>&1
code=$?; if [[ $code != 0 ]]; then echo ">>> ERROR - code=$code - runScript='$runScript' - $scriptName"; FAILED=1; fi

############################################################################################################################
# Check result

if [[ "$FAILED" -eq 0 ]]; then
  echo ">>> FINISHED:SUCCESS - $scriptName"
  touch "$LOG_DIR/$scriptName.SUCCESS.out"
else
  echo ">>> FINISHED:FAILED";
  echo "Scanning logs for errors & failed tests ..."
  filePattern="$LOG_FILE_SCRIPT"
  IFS=$'\n' typescript_errors=($(grep -n -r -e "TSError:" $filePattern))
  IFS=$'\n' runtime_errors=($(grep -n -r -e "ERROR " $filePattern))
  IFS=$'\n' failed_tests=($(grep -n -r -e "failing" $filePattern))
  if [ ! -z "$typescript_errors" ]; then
    echo " .. found ${#typescript_errors[@]} typescript errors"
    for item in ${typescript_errors[*]}
    do
      echo $item >> "$LOG_DIR/$scriptName.ERROR.out"
    done
  else
    echo " .. no typescript errors found"
  fi
  if [ ! -z "$runtime_errors" ]; then
    echo " .. found ${#runtime_errors[@]} runtime errors"
    for item in ${runtime_errors[*]}
    do
      echo $item >> "$LOG_DIR/$scriptName.ERROR.out"
    done
  else
    echo " .. no runtime errors found"
  fi
  if [ ! -z "$failed_tests" ]; then
    echo " .. found ${#failed_tests[@]} failed tests"
    for item in ${failed_tests[*]}
    do
      echo $item >> "$LOG_DIR/$scriptName.ERROR.out"
    done
  else
    echo " .. no failed tests found"
  fi
  exit 1
fi

############################################################################################################################
# Unset environment variables

unset_source_env

###
# Done
