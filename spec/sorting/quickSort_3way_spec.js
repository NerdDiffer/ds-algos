var assert = require('assert');
var sorts = require('../../').sorts;
var commonBehavior = require('./_commonSortingBehavior.js');

describe('Quick Sort with 3-way partitioning', function() {
  var quickSort_3way = sorts.quickSort_3way;
  commonBehavior.sortsBasicCases(quickSort_3way);

  describe('sorting an array of 100 integers, with several duplicates', function() {
    var h = require('../../lib/sorting/helpers.js');

    // Generate an array of random integers between -4 & 5.
    // Shuffle it & save to variable.
    var arr = [];
    for (var i = 1; i <= 100; i++) {
      var n = generateRandomInt(-4, 5);
      arr.push(n);
    }
    // Because these numbers are more or less, randomized, shuffling the array
    // would (very likely) not be useful.
    context('setup', function() {
      it('confirms the array is NOT sorted', function() {
        assert(!h.sorted(arr));
      });
    });

    context('verify', function() {
      it('sorts array && checks length > 0', function() {
        var sorted = quickSort_3way(arr);
        assert(h.sorted(sorted));
        assert(sorted.length > 0);
      });
    });
  });
});

/**
 * Generate a 'random'-ish whole number
 * @param min, inclusive
 * @param max, inclusive
 * @return, a random-ish number
 */
function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
