var assert = require('assert');
var sorts = require('../../').sorts;
var commonBehavior = require('./_commonSortingBehavior.js');

describe('Quick Sort', function() {
  var quickSort = sorts.quickSort;
  commonBehavior.sortsBasicCases(quickSort);

  describe('sorting a shuffled array of 100 distinct integers', function() {
    var shuffle = require('../../lib/misc/shuffle.js');
    var h = require('../../lib/sorting/helpers.js');

    // Generate an array of distinct integers, shuffle it & save to variable.
    // The reason for saving to a variable is that the `shuffle` method
    // depletes the original array.
    var arr = [];
    for (var i = 1; i <= 100; i++) { arr.push(i); }
    var shuffled = shuffle(arr);

    context('setup', function() {
      it('confirms the array is NOT sorted', function() {
        assert(!h.sorted(shuffled));
      });
    });

    context('verify', function() {
      it('sorts array && checks length > 0', function() {
        // Because of some scoping issues I was running into, I'm choosing
        // to sort the array only once, inside of this example. Sorting
        // outside of this example leads to some annoying side-effects.
        // One of them was, `quickSort` depleting the array, `shuffled`. The
        // returned result is saved into one variable & two assertions are
        // run in the same `it` block to avoid having to run `quickSort` twice.
        var sorted = quickSort(shuffled);
        assert(h.sorted(sorted));
        assert(sorted.length > 0);
      });
    });
  });
});
