// This file includes two implementations of a Stack

/**
 * Linked-List implementation of a Stack
 */
function StackLL() {
  this.head = null;
}

StackLL.prototype.push = function(val) {
  var oldHead = this.head;
  this.head = new Node(val, oldHead);
};

StackLL.prototype.pop = function() {
  var val = this.head;
  this.head = this.head.next;
  return val;
};

StackLL.prototype.isEmpty = function() {
  return this.head === null;
};

StackLL.prototype.size = function() {
  if (this.isEmpty()) { return 0; }

  var n = 1;
  var c = this.head;

  while(c.next !== null) {
    c = c.next;
    n++;
  }

  return n;
};

/**
 * Node constructor
 * An 'inner class', only used in the linked-list implementation of Stack
 * @param val, [String] the string data to store in this node
 * @param next, [Object] a reference to the next node in the list
 */
function Node(val, next) {
  this.val  = val;
  this.next = next;
}

/**
 * Array implementation of a Stack
 * Stores its items in an array
 * `n` is the count of items in the array
 */
function StackArr() {
  this.s = [];
  this.n = 0;
}

StackArr.prototype.push = function(val) {
  this.s[this.n++] = val;
};

StackArr.prototype.pop = function() {
  this.n--;
  return this.s.pop();
};

StackArr.prototype.isEmpty = function() {
  return this.n === 0;
};

module.exports.StackArr = StackArr;
module.exports.StackLL  = StackLL;
