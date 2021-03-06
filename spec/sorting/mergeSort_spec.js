var assert = require('assert');
var sorts = require('../../').sorts;

var commonBehavior = require('./_commonSortingBehavior.js');
var h = require('../../lib/sorting/helpers.js');
var shuffle = require('../../lib/misc/shuffle.js');

describe('Merge Sort, Top-Down, Recursive implementations', function() {

  context('First implementation', function() {
    var mergeSort = sorts.mergeSort.mergeSort1;
    commonBehavior.sortsBasicCases(mergeSort);

    describe('sorting a shuffled array of 100 distinct integers', function() {
      var arr = [];
      for (var i = 1; i <= 100; i++) { arr.push(i); }
      var sh = shuffle(arr);

      context('setup', function() {
        it('confirms the array is NOT sorted', function() {
          // OK, except for 1 in every `100!` times...
          assert(!h.sorted(sh));
        });
      });

      context('verify', function() {
        it('sorts the array', function() {
          mergeSort(sh);
          assert(h.sorted(sh));
        });
      });
    });
  });

  context('Second implementation', function() {
    var mergeSort = sorts.mergeSort.mergeSort2;
    commonBehavior.sortsBasicCases(mergeSort);

    describe('sorting a shuffled array of 100 distinct integers', function() {
      var arr = [];
      for (var i = 1; i <= 100; i++) { arr.push(i); }
      var sh = shuffle(arr);

      context('setup', function() {
        it('confirms the array is NOT sorted', function() {
          // OK, except for 1 in every `100!` times...
          assert(!h.sorted(sh));
        });
      });

      context('verify', function() {
        it('sorts the array', function() {
          assert(mergeSort(sh));
        });
      });
    });
  });
});

describe('Merge Sort, Bottom-Up, Iterative implementation', function() {
  var mergeSort = sorts.mergeSort_bottomUp;
  commonBehavior.sortsBasicCases(mergeSort);

  describe('sorting a shuffled array of 100 distinct integers', function() {
    var arr = [];
    for (var i = 1; i <= 100; i++) { arr.push(i); }
    var sh = shuffle(arr);

    context('setup', function() {
      it('confirms the array is NOT sorted', function() {
        // OK, except for 1 in every `100!` times...
        assert(!h.sorted(sh));
      });
    });

    context('verify', function() {
      it('sorts the array', function() {
        mergeSort(sh);
        assert(h.sorted(sh));
      });
    });
  });
});
