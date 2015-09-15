var assert = require('assert');
var sorts = require('../../').sorts;
var commonBehavior = require('./_commonSortingBehavior.js');

describe('Insertion Sort', function() {
  var insertionSort = sorts.insertionSort;
  commonBehavior.sortsBasicCases(insertionSort);
});
