var ds    = require('./lib/data-structures');
var sorts = require('./lib/sorting');

// export data structures
module.exports.ds = {
  LinkedList: ds.LinkedList,
  StackArr:   ds.StackArr,
  StackLL:    ds.StackLL,
  QueueLL:    ds.QueueLL,
  QuickFind:  ds.QuickFind,
  QuickUnion: ds.QuickUnion
};

// export sorting algorithms
module.exports.sorts = {
  insertionSort:  sorts.insertionSort,
  mergeSort:      sorts.mergeSort,
  mergeSort_bottomUp:      sorts.mergeSort_bottomUp,
  quickSort:      sorts.quickSort,
  quickSort_3way: sorts.quickSort_3way,
  selectionSort:  sorts.selectionSort,
  shellSort:      sorts.shellSort
};
