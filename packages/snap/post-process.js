const fs = require('fs');
const pathUtils = require('path');
const snapConfig = require('./snap.config.json');

const bundlePath = pathUtils.join(snapConfig.dist, snapConfig.outfileName);

let bundleString = fs.readFileSync(bundlePath, 'utf8');

// Alias `window` as `self`
bundleString = 'var self = window;\n'.concat(bundleString);

// Remove useless "stdlib" argument from bignumber.js asm module
bundleString = bundleString
  .replace(
    `module.exports = function decodeAsm (stdlib, foreign, buffer) {`,
    `module.exports = function decodeAsm (foreign, buffer) {`,
  )
  .replace(
    /stdlib\./gu,
    '',
  );

// Remove readonly assignment 
bundleString = bundleString.replace(`Gp[iteratorSymbol] = function() {
    return this;
  };`, '');

// Remove 'use asm' tokens; they cause pointless console warnings
bundleString = bundleString.replace(
  /^\s*'use asm';?\n?/gmu,
  '',
);

fs.writeFileSync(bundlePath, bundleString);
