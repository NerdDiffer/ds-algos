/**
 * Generate a copy of an object that is a stand-in for some node.
 * @param keysAndVals, an object containing keys & values.
 * @return, a mock node object
 */
module.exports = function(keysAndVals) {
  function MockNode(obj) {
    // This could get ugly...
    for (var key in obj) {
      this[key] = obj[key];
    }
  }
  return new MockNode(keysAndVals);
};
