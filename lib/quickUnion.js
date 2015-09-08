var inherits = require('inherits');

var QuickFind = require('./quickFind.js');

inherits(QuickUnion, QuickFind);

function QuickUnion(n) {
  QuickFind.call(this, n);
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
 * @param p [Integer], another object
 * @return [null], doesn't return anything
 */
QuickUnion.prototype.union = function (p, q) {
  var i = this.findRoot(p);
  var j = this.findRoot(q);
  if (i === j) { return; }
  this.ids[i] = j;
  this.count--;
};

module.exports = QuickUnion;
