/**
 * Initialization of QuickFind: pass in number of nodes, an integer `n`.
 * `n` should be >= 0 and should be an integer
 * @param n [Integer], number of nodes you want in this data structure
 * @return, a QuickFind object
 * @throws, an error if `n` is not an integer greater than or equal to 0
 */
function QuickFind(n) {
  if ((parseInt(n) !== n) || (n < 0)) {
    throw new Error('n must be an integer greater than or equal to 0');
  }

  // keeps track of number of connected components
  this.count = n;

  // set value of ids array upon initialization
  this.ids = (function setIds(x) {
    var i = 0;
    var ids = [];
    while (i < x) {
      ids.push(i);
      i++;
    }
    return ids;
  })(n);
}

/**
 * Are two objects within the same connected component?
 * @param p [Integer], one object
 * @param p [Integer], another object
 * @return  [Boolean], true if 2 objects in same component. otherwise false.
 */
QuickFind.prototype.connected = function(p, q) {
  return this.ids[p] === this.ids[q];
};

/**
 * Add a connection between two objects
 * Change all entries with `ids[p]` to `ids[q]`.
 * At most, `2N + 2` array accesses.
 * @param p [Integer], one object
 * @param q [Integer], another object
 * @return  [null], doesn't return anything
 */
QuickFind.prototype.union = function (p, q) {
  var pid = this.ids[p];
  var qid = this.ids[q];

  if (pid === qid) { return; }

  for (var i = 0; i < this.ids.length; i++) {
    if (this.ids[i] === pid) {
      this.ids[i] = qid;
    }
  }
  this.count--;
};

module.exports = QuickFind;
