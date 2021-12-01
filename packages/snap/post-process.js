const fs = require('fs');
const pathUtils = require('path');
const snapConfig = require('./snap.config.json')

const bundlePath = pathUtils.join(snapConfig.dist, snapConfig.outfileName)

let bundleString = fs.readFileSync(bundlePath, 'utf8');

// Remove anonymous arrow function wrapper injected by mm-snap
bundleString = bundleString.replace(/\(\) => \(\n/u, '');
bundleString = bundleString.slice(0, bundleString.lastIndexOf('\n)'));

// Remove 'use asm' token that throws a console warning
bundleString = bundleString.replace(
  `module.exports = function decodeAsm ( foreign, buffer) {\n  'use asm'\n`,
  `module.exports = function decodeAsm ( foreign, buffer) {\n`,
)

fs.writeFileSync(bundlePath, bundleString);
