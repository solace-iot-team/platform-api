#!/usr/bin/env bash
scriptDir=$(cd $(dirname "$0") && pwd);
scriptName=$(basename $(test -L "$0" && readlink "$0" || echo "$0"));

############################################################################################################################
# Run

echo " >>> Stop server running in background ..."
  ps -eo pid,args | grep "server/index.ts" | while read pid args; do
    # echo "pid=$pid"
    kill -SIGKILL $pid > /dev/null 2>&1 || true
  done
echo " >>> Success."
exit 0

###
# The End.
