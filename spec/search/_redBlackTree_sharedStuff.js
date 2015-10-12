var assert = require('assert');

var generateMockNode = require('./_generateMockNode.js');

// wrapper for the generic node generation method. I'm too lazy to change calls
// in the RedBlackTree specs right now...
module.exports.generateThreeNode = function(keysAndVals) {
  return generateMockNode(keysAndVals);
};

/**
 * Perform three assertions on a RedBlackTree after it has a new node inserted
 * into an existing 3-node root.
 * @param rbt, the RedBlackTree instance to test
 */
module.exports.expectedOutcomes = function(rbt) {

  var expectedLeftNode = {
    key: 'ambient',
    val: 'anvil',
    left: null,
    right: null,
    count: 1,
    color: false
  };
  var expectedRightNode = {
    key: 'cool jazz',
    val: 'clarinet',
    left: null,
    right: null,
    count: 1,
    color: false
  };
  var expectedRoot = {
    key: 'bluegrass',
    val: 'banjo',
    left: expectedLeftNode,
    right: expectedRightNode,
    count: 3,
    color: false
  };

  it('now, this is the root node', function() {
    assert.deepEqual(rbt.root, expectedRoot);
  });
  // having the 2 following specs may be a little redundant, but gives
  // me finer control over reviewing what's wrong.
  it('the left node', function() {
    assert.deepEqual(rbt.root.left, expectedLeftNode);
  });
  it('the right node', function() {
    assert.deepEqual(rbt.root.right, expectedRightNode);
  });
};
