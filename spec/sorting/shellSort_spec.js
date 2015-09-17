var assert = require('assert');
var sorts = require('../../').sorts;
var commonBehavior = require('./_commonSortingBehavior.js');

describe('Shell Sort', function() {
  var shellSort = sorts.shellSort;
  commonBehavior.sortsBasicCases(shellSort);
});
