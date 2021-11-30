const fs = require('fs');
const pathUtils = require('path');
const snapConfig = require('./snap.config.json')

const bundlePath = pathUtils.join(snapConfig.dist, snapConfig.outfileName)

let bundleString = fs.readFileSync(bundlePath, 'utf8');

// Remove anonymous arrow function wrapper injected by nf-snap
bundleString = bundleString.replace(/\(\) => \(\n/u, '');
bundleString = bundleString.slice(0, bundleString.lastIndexOf('\n)'));

// Remove 'use asm' token that throws a console warning
bundleString = bundleString.replace(
  `module.exports = function decodeAsm ( foreign, buffer) {\n  'use asm'\n`,
  `module.exports = function decodeAsm ( foreign, buffer) {\n`,
)

// The nf-snap transforms. Requires a fix to strip-comments to work here.
// bundleString = bundleString.replace(/self/g, "window");

// // filecoin specific fix
// bundleString = bundleString.replace(/stdlib./g, '');

// // polkadot specific fix, remove setImmediate
// bundleString = bundleString.replace("setImmediate(() => resultCb(result))", "resultCb(result)");

fs.writeFileSync(bundlePath, bundleString);
