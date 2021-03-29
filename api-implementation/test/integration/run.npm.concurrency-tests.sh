#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Environment Variables

  if [ -z "$APIM_INTEGRATION_TEST_LOG_DIR" ]; then echo ">>> ERROR: - $scriptName - missing env var: APIM_INTEGRATION_TEST_LOG_DIR"; exit 1; fi

############################################################################################################################
# Run

declare -a orgs=(
  "org0"
  "org1"
  "org2"
  "org3"
  "org4"
  "org5"
  "org6"
  "org7"
  "org8"
  "org9"
)
runScript="npm run test:concurrency"
MY_LOG_DIR="$APIM_INTEGRATION_TEST_LOG_DIR/test-concurreny"; rm -rf $MY_LOG_DIR/*.out

loadScriptPids=""
echo ">>> Starting concurrency tests ..."
  for org in ${orgs[@]}; do
    echo "org=$org"
    source "$scriptDir/source.env.org.sh" $org
    logFile="$MY_LOG_DIR/$scriptName.$org.out"; mkdir -p "$(dirname "$logFile")";
    # foreground
    # $runScript > $logFile 2>&1
    nohup $runScript > $logFile 2>&1 &
    loadScriptPids+=" $!"
  done

echo "pids=${loadScriptPids}"

while true; do
  wait -n || {
    code="$?"
    if [ $code = "127" ]; then
      # 127:
      # last background job has exited successfully
      # or: command was not found
      echo ">>> SUCCESS: all concurrency scripts ran successfully"
    else
      echo ">>> ERROR: 1 or more concurrency scripts failed, log files in '$MY_LOG_DIR'"
      exit 1
    fi
    break
  }
done;
