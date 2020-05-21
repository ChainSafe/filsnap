var isReady = function() {
  // always false, when true it will try and use non-existent functions
  return false;
};

var waitReady = function() {
  // always immediate true, our process is done
  return Promise.resolve(true);
};

module.exports.isReady = isReady;
module.exports.waitReady = waitReady;