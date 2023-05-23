#!/usr/bin/env node
const crypto = require('crypto');
const fs = require('fs');

var stdin = process.openStdin();
var data = "";

stdin.on('data', function(chunk) {
  data += chunk;
});

stdin.on('end', function() {
  console.log(data);
  let delimiter = `EOF_${crypto.randomBytes(20).toString('hex')}_EOF`;
  fs.appendFileSync('$GITHUB_ENV', `${delimiter}\n${data}\n${delimiter}\n`);
  fs.cpSync('$GITHUB_ENV', 'github.env');
});
