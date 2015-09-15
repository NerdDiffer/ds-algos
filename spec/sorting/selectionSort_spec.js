var assert = require('assert');
var sorts = require('../../').sorts;
var commonBehavior = require('./_commonSortingBehavior.js');

describe('Selection Sort', function() {
  var selectionSort = sorts.selectionSort;
  commonBehavior.sortsBasicCases(selectionSort);
});
