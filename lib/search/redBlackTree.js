var ts = require('total-sorta');
var inherits = require('inherits');
var BinarySearchTree = require('./binarySearchTree.js');

// Treat these two variables like class-level constants.
var RED = true;
var BLACK = false;

inherits(RedBlackTree, BinarySearchTree);

/**
 * Left-Leaning Red-Black Binary Search Tree
 * What a mouthful!
 */
function RedBlackTree() {
  BinarySearchTree.call(this);
}

/**
 * Insert a node into the tree
 */
RedBlackTree.prototype.put = function(key, val) {
  this.root = put_r(this.root, key, val);
  this.root.color = BLACK;

  // insert the key-value pair into the subtree, rooted at `node`
  function put_r(node, key, val) {
    if (node === null) return new ThreeNode(key, val, RED);

    var cmp = ts.compare(key, node.key);

    if (cmp < 0) {
      node.left  = put_r(node.left,  key, val);
    } else if (cmp > 0) {
      node.right = put_r(node.right, key, val);
    } else {
      node.val = val;
    }

    // Clean up right-leaning links...

    // if it leans to the right...
    if (isRed(node.right) && !(isRed(node.left))) {
      node = rotateLeft(node); // make it lean left
    }
    // if there are 2 consecutive red links to the left side...
    if (isRed(node.left) && isRed(node.left.left)) {
      node = rotateRight(node); // balance a 4-node
    }
    // if there are red links in both directions...
    if (isRed(node.left) && isRed(node.right)) {
      flipColors(node); // finish the split of a 4-node
    }

    // Increment counts: sum of itself, plus count of nodes on both sides.
    node.count = 1 + size(node.left) + size(node.right);

    return node;
  }
};

// Elementary operations, helper methods for RedBlackTree.

/**
 * Rotate 2 nodes to the left by switching direction of red link from right to
 * left & the node with the higher key becomes parent of node with lesser key.
 * `h` is the node on the left side.
 * `x` is the node on the right side.
 * Update count, color, links for both nodes.
 * @param h, the node on the left-hand side (starts as a parent of `x` with a
 * red-link going to the right, to `x`).
 * @return, the node on the right-hand side (now a parent of `h`, with red-link
 * going to the left, at `h`)
 */
function rotateLeft(h) {
  var x = h.right;
  h.right = x.left;
  x.left = h;
  x.color = h.color;
  h.color = RED;
  x.count = h.count;
  h.count = 1 + size(h.left) + size(h.right);
  return x;
}

/**
 * Rotate 2 nodes to the right. Is the inverse operation of `rotateLeft`.
 * However, you should take note of this:
 * `x` is node on the left side.
 * `h` is node on the right side.
 * @param h, the node on the right side
 * @return, node on left
 */
function rotateRight(h) {
  var x = h.left;
  h.left = x.right;
  x.right = h;
  x.color = h.color;
  h.color = RED;
  x.count = h.count;
  h.count = 1 + size(h.left) + size(h.right);
  return x;
}

/**
 * Flips the colors of all links. From red to black, or from black to red.
 * Use when you have a node with two red links coming out of it. A node with
 * two red-links coming out of it is not acceptable, except when you have a
 * temporary 4-node.
 * So, use this when you are splitting a 4-node into two 2-nodes.
 * @param h, the parent node with two red links
 */
function flipColors(h) {
  h.color = RED;
  h.left.color = BLACK;
  h.right.color = BLACK;
}

/**
 * Node class for RedBlackTree
 * @param key, key of new node
 * @param val, value of new node
 * @param color, optional. Is set to `BLACK` by default.
 *   Pass in any truthy value to get `RED`.
 */
function ThreeNode(key, val, color) {
  color = (typeof color == 'undefined' ? BLACK : color);

  if (typeof color != 'boolean') {
    color = RED;
  }

  this.key = key;
  this.val = val;
  this.left = null;
  this.right = null;
  // number of nodes underneath the subtree rooted at this node including itself
  this.count = 1;
  this.color = color; // color of the link to parent
}

/**
 * Returns true if its link to parent is red. Otherwise, returns false.
 * Detached from ThreeNode class because it'll be used in situations where you
 * don't always know if the node is `null` or not.
 */
function isRed(node) {
  return (node === null ? false : node.color === RED);
}

// return `count` of a node
function size(node) {
  return (node === null ? 0 : node.count);
}

module.exports = RedBlackTree;
