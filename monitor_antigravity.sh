#!/bin/bash
# monitor_antigravity.sh
# Monitors memory usage of Antigravity processes and warns/restarts if needed.

THRESHOLD_MB=4096   # 4GB (The Cap)
WARN_PERCENT=70     # 70%
LOG_PERCENT=80      # 80%
CRIT_PERCENT=90     # 90%

WARN_LEVEL=$((THRESHOLD_MB * WARN_PERCENT / 100))
LOG_LEVEL=$((THRESHOLD_MB * LOG_PERCENT / 100))
CRIT_LEVEL=$((THRESHOLD_MB * CRIT_PERCENT / 100))

LOG_FILE="antigravity_monitor.log"

echo "Starting Antigravity Memory Monitor..."
echo "Cap: ${THRESHOLD_MB}MB | Warn: ${WARN_LEVEL}MB | Crit: ${CRIT_LEVEL}MB"
echo "Logging to: $LOG_FILE"

while true; do
    # Find processes matching Antigravity (excluding this script and grep)
    # Sum RSS? No, usually per-process limit applies to each. We check max individual RSS.
    
    # Get the process with max RSS
    TOP_PROC=$(ps -ax -o pid,rss,command | grep -i "antigravity" | grep -v "grep" | grep -v "monitor_antigravity.sh" | sort -nr -k 2 | head -n 1)
    
    if [ -n "$TOP_PROC" ]; then
        PID=$(echo "$TOP_PROC" | awk '{print $1}')
        RSS_KB=$(echo "$TOP_PROC" | awk '{print $2}')
        RSS_MB=$((RSS_KB / 1024))
        CMD=$(echo "$TOP_PROC" | awk '{$1=""; $2=""; print $0}' | xargs)

        TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

        if [ "$RSS_MB" -ge "$CRIT_LEVEL" ]; then
            MSG="[CRITICAL] PID $PID using ${RSS_MB}MB (Target: ${THRESHOLD_MB}MB). Risk of Freeze!"
            echo "$TIMESTAMP $MSG" | tee -a "$LOG_FILE"
            # Optional: Restart if configured. For now, just alert loud.
            # kill -HUP $PID 2>/dev/null
        elif [ "$RSS_MB" -ge "$LOG_LEVEL" ]; then
             MSG="[HIGH] PID $PID using ${RSS_MB}MB."
             echo "$TIMESTAMP $MSG" >> "$LOG_FILE"
        elif [ "$RSS_MB" -ge "$WARN_LEVEL" ]; then
             MSG="[WARN] PID $PID using ${RSS_MB}MB."
             echo "$TIMESTAMP $MSG"
        fi
    fi
    
    sleep 10
done
