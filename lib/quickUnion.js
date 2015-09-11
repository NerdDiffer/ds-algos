var inherits = require('inherits');

var QuickFind = require('./quickFind.js');

inherits(QuickUnion, QuickFind);

/**
 * To make this data structure use the 'weighted' quick-union algorithm,
 * pass in `true` for the 2nd parameter. Passing in `false` or don't pass in
 * anything at all, to use the regular quick-union data structure.
 * @param n, [Integer]. Number of nodes
 * @param weighted [Boolean], use weighted quick-union.
 */
function QuickUnion(n, weighted) {
  QuickFind.call(this, n);

  if (typeof weighted === 'undefined') {
    this.weighted = false;
  } else {
    this.weighted = true;

    // keep track of the number of nodes in each tree rooted at each node
    this.sizes = (function setSizes(x) {
      var i = 0;
      var sizes = [];
      while (i < x) {
        sizes.push(1);
        i++;
      }
      return sizes;
    })(n);
  }
}

/**
 * Chase the parent pointers until you reach the root
 * (depth of i array accesses)
 */
QuickUnion.prototype.findRoot = function(i) {
  while (i !== this.ids[i]) {
    i = this.ids[i];
  }
  return i;
};

/**
 * Check if two objects have the same root
 * In other words, check if they are in the same connected components
 * (depth of p & q array accesses)
 * @param p [Integer], one object
 * @param p [Integer], another object
 * @return [Boolean]
 */
QuickUnion.prototype.connected = function(p, q) {
  return this.findRoot(p) === this.findRoot(q);
};

/**
 * Change root of `p` to point to root of `q`
 * (depth of p & q array accesses)
 * @param p [Integer], one object
 * @param q [Integer], another object
 * @return [null], doesn't return anything
 */
QuickUnion.prototype.union = function (p, q) {
  var rootP = this.findRoot(p);
  var rootQ = this.findRoot(q);

  if (rootP === rootQ) { return; }

  if (!this.weighted) {
    // Regular quick union
    this.ids[rootP] = rootQ;
  } else {
    // Weighted quick union:
    //   - Make the root of the smaller tree point to root of larger tree.
    //   - Update the `sizes` array.
    if (this.sizes[rootP] < this.sizes[rootQ]) {
      this.ids[rootP] = rootQ;
      this.sizes[rootQ] += this.sizes[rootP];
    } else {
      this.ids[rootQ] = rootP;
      this.sizes[rootP] += this.sizes[rootQ];
    }
  }
  this.count--;
};

module.exports = QuickUnion;
