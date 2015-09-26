var inherits = require('inherits');
var LinkedList = require('./linkedList.js');

inherits(StackLL, LinkedList);

/**
 * Linked-List implementation of a Stack
 */
function StackLL() {
  this.head = null;
  LinkedList.call(this);
}

// Since a linked-list can only start operations from the front, consider
// the 'top' of the stack to be the beginning of the data structure.
StackLL.prototype.add    = LinkedList.prototype.unshift;
StackLL.prototype.remove = LinkedList.prototype.shift;

/**
 * Array implementation of a Stack
 * Stores its items in an array
 * `n` is the count of items in the array
 */
function StackArr() {
  this.s = [];
  this.n = 0;
}

StackArr.prototype.add = function(val) {
  this.s[this.n++] = val;
};

StackArr.prototype.remove = function() {
  this.n--;
  return this.s.pop();
};

StackArr.prototype.isEmpty = function() {
  return this.n === 0;
};

module.exports.StackArr = StackArr;
module.exports.StackLL  = StackLL;
