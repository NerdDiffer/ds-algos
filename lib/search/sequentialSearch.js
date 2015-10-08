/**
 * Sequential search with linked list & symbol table.
 * The nodes of the inner, linked list hold keys & values.
 */

var inherits = require('inherits');
var SymbolTable = require('../data-structures/symbolTable.js');

inherits(SequentialSearch, SymbolTable);

function SequentialSearch() {
  this.list = new LinkedList();
  SymbolTable.call(this);
}

/**
 * Add a key-value pair to the beginning of the linked list.
 * If the key already exists in the list, then its current value is replaced.
 * If the key exists and `val` is null, then removes the node from list
 * @param key, the key of the node
 * @param val, the value of the node
 */
SequentialSearch.prototype.put = function(key, val) {
  if (this.list.find(key) && val === null) {
    this.delete(key);
  }
  var found = this.list.find(key);
  if (typeof found == 'undefined') {
    this.list.unshift(key, val);
  } else {
    found.val = val;
  }
};

/**
 * Retrieves the value of the first node which matches the value
 * Or, returns null if the node is not in the list
 * @param key, the key to search by
 */
SequentialSearch.prototype.get = function(key) {
  var found = this.list.find(key);
  if (!found) { return null; }
  return found.val;
};

// find the node by its key
// then delete the node from the list
SequentialSearch.prototype.delete = function(key) {
  this.list.remove(key);
};

/**
 * Iterate through all the nodes of the inner linked list
 * while collecting the key of each node. Return the collected keys.
 */
SequentialSearch.prototype.keys = function() {
  var keys = [];
  var cursor = this.list.head;
  while (cursor !== null) {
    keys.push(cursor.key);
    cursor = cursor.next;
  }
  return keys;
};

/**
 * `el` constructor.
 * Used in the linked list inside of a SequentialSearch data structure.
 * @param key, [String], key
 * @param val, [String], the string data to store in this element
 */
function El(key, val) {
  this.key = key;
  this.val = val;
  this.next = null;
}

/**
 * LinkedList, for SequentialSearch, uses the local `El` constructor.
 */
function LinkedList() {
  this.head = null;
  this.tail = null;
  this.n = 0; // keep track of number of nodes
}

// add a node to the beginning of the list & increment `n`
LinkedList.prototype.unshift = function(key, val) {
  var el = new El(key, val);
  var old = this.head;
  this.head = el;
  this.head.next = old;
  return ++this.n;
};

// remove a node from beginning of the list, decrement `n` & return node
LinkedList.prototype.shift = function() {
  // exit early if there are no nodes in list
  if (this.n <= 0) { return; }

  var old = this.head;
  this.head = old.next;
  this.n--;
  return old;
};

/**
 * Remove a node from anywhere in the linked list, by searching its key
 * Decrements `n`
 */
LinkedList.prototype.remove = function(key) {
  // special case: if key matches head of list
  if (this.head.key === key) {
    this.shift();
    return true;
  }
  var found = this.findNext(key);
  if (typeof found == 'undefined') {
    return false;
  } else {
    var removed = found.next;
    found.next = removed.next;
    this.n--;
    return true;
  }
};

/**
 * Find the first node which matches the key
 * @param key, the key to search by
 * @return, the node if it's found. undefined if it's not found.
 */
LinkedList.prototype.find = function(key) {
  var cursor = this.head;
  while (cursor !== null) {
    if (cursor.key === key) {
      return cursor;
    }
    cursor = cursor.next;
  }
  // only gets here if no nodes in list have a matching key
  return undefined;
};

/**
 * Find the node which *points* to the node you want
 * @param key, the key to search by
 * @return, the node if it's found. undefined if it's not found.
 */
LinkedList.prototype.findNext = function(key) {
  var cursor = this.head;
  while (cursor.next !== null) {
    if (cursor.next.key === key) {
      return cursor;
    }
    cursor = cursor.next;
  }
  // only gets here if no nodes in list point to a node with the key
  return undefined;
};

module.exports = SequentialSearch;
