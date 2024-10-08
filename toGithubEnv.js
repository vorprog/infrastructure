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
  fs.appendFileSync(process.env.GITHUB_ENV, `${process.argv[2]}<<${delimiter}\n${data}\n${delimiter}`);

  const content = fs.readFileSync("github.env");
  const state = JSON.parse(content.toString());
  state[process.argv[2]] = data;
});
