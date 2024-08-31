#!/bin/env bash
read -r input
EOF=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
echo "$1>>$EOF
$input
$EOF" >> $GITHUB_ENV
