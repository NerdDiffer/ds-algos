/**
 * A regular symbol table with a few enhancements.
 * Uses a binary search algorithm to go through an ordered array.
 */

var inherits = require('inherits');
var ts = require('total-sorta');
var SymbolTable = require('../data-structures/symbolTable.js');

inherits(OrderedSymbolTable, SymbolTable);

function OrderedSymbolTable() {
  this.keysList = [];
  this.valsList = [];
  this.n = 0; // store count of keys
  SymbolTable.call(this);
}

/**
 * Returns the number of keys smaller than the given key.
 * The key does not even have to be part of the `keysList` array.
 * @param key, the key to compare against list of keys
 * @return, the index in keysList at which you'd find the key
 */
OrderedSymbolTable.prototype.rank = function(key) {
  var lo = 0;
  var hi = this.keysList.length - 1;

  while (lo <= hi) {
    var mid = parseInt(lo + (hi - lo) / 2);
    var cmp = ts.compare(key, this.keysList[mid]);

    if (cmp < 0) {
      hi = mid - 1;
    } else if (cmp > 0) {
      lo = mid + 1;
    } else {
      return mid;
    }
  }
  return lo;
};

/**
 * Add a key to `keysList`, add a val to `valsList`.
 * If the key already exists, then its current value is replaced.
 * Increments position of each element in `keysList` & `valsList` accordingly.
 * If the key exists and `val` is null, then removes the node from list
 * @param key, the key of the node
 * @param val, the value of the node
 */
OrderedSymbolTable.prototype.put = function(key, val) {
  // deletes node if `val` is null
  if (val === null) {
    return this.delete(key);
  }

  var ind = this.rank(key);

  if (val !== null && this.get(key) !== null) {
    this.valsList[ind] = val;
  } else {
    this.keysList = incrementInd(this.keysList, ind);
    this.valsList = incrementInd(this.valsList, ind);
    this.keysList[ind] = key;
    this.valsList[ind] = val;
    this.n++;
  }
};

/**
 * Retrieves the value of the first node whose key matches key
 * Or, returns null if the node is not in the list
 * @param key, the key to search by
 */
OrderedSymbolTable.prototype.get = function(key) {
  var ind = this.rank(key);

  if (ind < this.n && ts.compare(this.keysList[ind], key) === 0) {
    return this.valsList[ind];
  } else {
    return null;
  }
};

/**
 * Remove key & its value from table
 * @param key, the property on the object
 * @return true, if the operation succeeds
 */
OrderedSymbolTable.prototype.delete = function(key) {
  var ind = this.rank(key);
  this.keysList = decrementInd(this.keysList, ind);
  this.valsList = decrementInd(this.valsList, ind);
  this.n--;
};

/**
 * return `keysList`, in sorted order.
 * This method assumes that the keysList are already sorted....
 * If `lo` and `hi` are given, then returns an inclusive range of values from
 * the keysList.
 * If not given, then returns the entirety of keysList.
 */
OrderedSymbolTable.prototype.keys = function(lo, hi) {
  var keysList = this.keysList;

  hi = (typeof hi == 'undefined' ? keysList.length : hi);
  lo = (typeof lo == 'undefined' ? 0 : lo);

  return keysList.slice(lo, hi + 1);
};

// Returns the largest key <= to the given key
OrderedSymbolTable.prototype.floor = function(key) {
  var ind = this.rank(key);
  // early return, if `key` is smaller than minimum
  if (ind === 0) { return null; }
  ind = (ind < this.n && ts.compare(key, this.keysList[ind]) === 0 ?
         ind :     // leave `ind` as is, if `key` exists in array
         ind - 1); // otherwise, look at the next largest value in the array
  return this.keysList[ind];
};

// Returns the smallest key >= to the given key
OrderedSymbolTable.prototype.ceiling = function(key) {
  var ind = this.rank(key);
  return (ind >= this.n ? null : this.keysList[ind]);
};

// Picks the key with the given rank
OrderedSymbolTable.prototype.select = function(rank) {
  return ((rank < 0 || rank >= this.n) ? null : this.keysList[rank]);
};

// return the minimum key
OrderedSymbolTable.prototype.min = function() {
  return this.keysList[0];
};

// return the maximum key
OrderedSymbolTable.prototype.max = function() {
  return this.keysList[this.n - 1];
};

// delete the minimum key
OrderedSymbolTable.prototype.deleteMin = function() {
  var min = this.min();
  this.delete(min);
};

// delete the maximum key
OrderedSymbolTable.prototype.deleteMax = function() {
  var max = this.max();
  this.delete(max);
};

// Copies original array & mutates the copy.
// Increments the index of each array member by 1.
function incrementInd(arr, fromInd) {
  var copy = arr.slice(0);
  var i = copy.length;
  while (i >= fromInd) {
    copy[i] = copy[i - 1];
    i--;
  }
  return copy;
}

// Copies original array & mutates the copy.
// Decrements the index of each array member by 1.
function decrementInd(arr, fromInd) {
  var copy = arr.slice(0);
  var i = fromInd;
  var n = copy.length - 1;
  while (i < n) {
    // copy the next value to the current value
    copy[i] = copy[i + 1];
    i++;
  }
  return copy;
}

module.exports = OrderedSymbolTable;
