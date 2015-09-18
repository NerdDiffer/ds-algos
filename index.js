var ds    = require('./lib/data-structures');
var sorts = require('./lib/sorting');

// export data structures
module.exports.ds = {
  StackArr:   ds.StackArr,
  StackLL:    ds.StackLL,
  QuickFind:  ds.QuickFind,
  QuickUnion: ds.QuickUnion
};

// export sorting algorithms
module.exports.sorts = {
  insertionSort: sorts.insertionSort,
  selectionSort: sorts.selectionSort,
  shellSort:     sorts.shellSort
};
