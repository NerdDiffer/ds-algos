var ts = require('total-sorta');
var inherits = require('inherits');
var BinarySearchTree = require('./binarySearchTree.js');

inherits(IntervalSearchTree, BinarySearchTree);

function IntervalSearchTree() {
  BinarySearchTree.call(this);
}

/**
 * Add an interval node into the symbol table, update the `max` of each node
 * as it is touched.
 * @param lo, starting point for node
 * @param hi, endpoint for node
 * @param val, value for the node
 */
IntervalSearchTree.prototype.put = function(lo, hi, val) {
  this.root = put_r(this.root, lo, hi, val);

  function put_r(x, lo, hi, val) {
    if (x === null) {
      var interval = new Interval(lo, hi, val);
      return interval;
    }

    var cmp = ts.compare(lo, x.lo);

    if (cmp < 0) {
      x.left  = put_r(x.left,  lo, hi, val);
    } else if (cmp > 0) {
      x.right = put_r(x.right, lo, hi,  val);
    } else {
      x.val = val;
    }

    x.updateMax();
    return x;
  }
};

IntervalSearchTree.prototype.get = function(lo, hi) {
  var x = this.root;

  while (x !== null) {
    if (IntervalSearchTree.overlaps([x.lo, x.hi], [lo, hi])) {
      return x;
    } else if (x.left === null) {
      x = x.right;
    } else if (ts.less(x.left.max, lo)) {
      x = x.right;
    } else {
      x = x.left;
    }
  }

  return null;
};

/**
 * Takes two 1-dimensional intervals & determine whether they overlap or not
 * @param intervalP, [Array] a set of low point & high point
 * @param intervalQ, [Array] a set of low point & high point
 * @return boolean, true if they overlap, otherwise false.
 */
IntervalSearchTree.overlaps = function(intervalP, intervalQ) {
  var p0 = intervalP[0];
  var p1 = intervalP[1];
  var q0 = intervalQ[0];
  var q1 = intervalQ[1];

  return Math.max(p0, q0) <= Math.min(p1, q1);
};

/**
 * A node for an IntervalSearchTree object.
 * Represents a line between lo & hi.
 * @param lo, starting point for an interval
 * @param hi, endpoint for an interval
 * @param val, the value for the node
 */
function Interval(lo, hi, val) {
  this.lo = lo;
  this.hi = hi;
  this.val = val;
  this.left = null;
  this.right = null;
  // the highest endpoint (`hi`) of any node inside a subtree rooted beneath
  // the current node. Set to `hi` of current node by default.
  this.max = hi;
}

// update value of `max` property by looking at `max` of itself, left & right
// nodes & setting the highest value to `max`.
Interval.prototype.updateMax = function() {
  var left =  (this.left === null  ? 0 : this.left.max);
  var right = (this.right === null ? 0 : this.right.max);
  this.max = Math.max(this.max, left, right);
};

module.exports = IntervalSearchTree;
