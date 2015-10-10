var assert = require('assert');

/**
 * Generate a copy of an object that is a stand-in for a ThreeNode.
 * @param keysAndVals, an object containing keys & values.
 * @return, a mock ThreeNode object
 */
module.exports.generateThreeNode = function(keysAndVals) {
  function ThreeNode(obj) {
    // This could get ugly...
    //for (var key in obj) {
    //  this[key] = obj[key];
    //}
    this.key = obj.key;
    this.val = obj.val;
    this.left = obj.left;
    this.right = obj.right;
    this.count = obj.count;
    this.color = obj.color;
  }
  return new ThreeNode(keysAndVals);
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
