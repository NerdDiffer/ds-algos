var ds    = require('./lib/data-structures');
var sorts = require('./lib/sorting');

// export data structures
module.exports.ds = {
  LinkedList: ds.LinkedList,
  StackArr:   ds.StackArr,
  StackLL:    ds.StackLL,
  QuickFind:  ds.QuickFind,
  QuickUnion: ds.QuickUnion
};

// export sorting algorithms
module.exports.sorts = {
  insertionSort: sorts.insertionSort,
  mergeSort:     sorts.mergeSort,
  quickSort:     sorts.quickSort,
  selectionSort: sorts.selectionSort,
  shellSort:     sorts.shellSort
};
