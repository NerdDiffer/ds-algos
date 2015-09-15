var lib = require('./lib');
var sorts = require('./lib/sorting');

module.exports = {
  StackArr:   lib.StackArr,
  StackLL:    lib.StackLL,
  QuickFind:  lib.QuickFind,
  QuickUnion: lib.QuickUnion
};

module.exports.sorts = {
  insertionSort: sorts.insertionSort,
  selectionSort: sorts.selectionSort
};
