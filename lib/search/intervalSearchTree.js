var ts = require('total-sorta');

/**
 * An interval search tree using one-dimensional intervals.
 * It's just like a binary search tree, but instead of searching & inserting by
 * keys, you utilize an interval. In this implementation, an interval is a
 * 1-dimensional line defined by a starting point `lo` and an end point `hi`.
 */
function IntervalSearchTree() {
  this.root = null;
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
    if (x === null) { return new Interval(lo, hi, val); }

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

/**
 * Return an interval from the tree which intersects the coordinates passed in
 * as a parameter (lo, hi). Uses the helper method `overlaps` to determine
 * an intersection between two points.
 * @param lo, the starting point of a query interval
 * @param hi, the ending point of a query interval
 * @return, an interval from the tree that intersects the query interval.
 * Or null if no match is found.
 */
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
 * Return all intervals that intersect a given interval (lo, hi)
 */
IntervalSearchTree.prototype.getAll = function(lo, hi) {

  var intersections = [];

  getAll_r(this.root, intersections, lo, hi);

  return intersections;

  /**
   * Recursively search for intersecting intervals in the tree while collecting
   * them in an array.
   * @param x, a root node
   * @param list, the array to collect intersections
   * @param lo, starting point of interval
   * @param hi, endpoint of interval
   */
  function getAll_r(x, list, lo, hi) {
    // If root is null, return
    if (x === null) return;

    // If this interval overlaps, push it
    if (IntervalSearchTree.overlaps([x.lo, x.hi], [lo, hi])) {
      intersections.push([x.lo, x.hi]);
    }

    // If ((left is not null) & highest endpoint in left subtree is greater than
    // or equal to the query's lo point (x.left.max >= lo))...
    if (x.left !== null && !ts.less(x.left.max, lo)) {
      // then search left side
      getAll_r(x.left, list, lo, hi);
    }

    // If ((right is not null) & highest endpoint of left subtree is less than
    // the query's lo point (x.left.max < lo))...
    if (x.right !== null && ts.less(x.left.max, lo)) {
      // then search right side
      getAll_r(x.right, list, lo, hi);
    }
  }

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
  // Highest endpoint (`hi`) of any node inside a subtree rooted beneath the
  // current node. Set to `hi` by default.
  this.max = hi;
}

/**
 * Update value of `max` property by comparing the `max` values of itself, left
 * and right nodes. Then setting the highest value to `max`.
 */
Interval.prototype.updateMax = function() {
  var left  = (this.left  === null ? 0 : this.left.max);
  var right = (this.right === null ? 0 : this.right.max);
  this.max = Math.max(this.max, left, right);
};

module.exports = IntervalSearchTree;
