/**
 * Quick sort
 */

var h = require('./helpers.js');
var shuffle = require('../misc/shuffle.js');

function partition (arr, lo, hi) {
  var i = lo;      // Moves left to right
  var j = hi + 1;  // Moves right to left
  var v = arr[lo]; // Partitioning item

  while(true) {

    // Find item on left side to swap
    while (h.less(arr[++i], v)) {
      if (i === hi) { break; }
    }

    // Then find item on right side to swap
    while (h.less(v, arr[--j])) {
      if (j === lo) { break; }
    }
    // Then check if pointers cross
    if (i >= j) { break; }

    // Swap
    h.exch(arr, i, j);
  }

  // Swap partitioning item `v` with `arr[j]`
  h.exch(arr, lo, j);

  return j;
}

// Once array is partitioned, recursively sort each sub-array
function sort (arr, lo, hi) {
  if (hi <= lo) return;
  var j = partition(arr, lo, hi);
  // Recursively sort each side
  sort(arr, lo, j - 1);
  sort(arr, j + 1, hi);
}

module.exports = function (arr) {
  // The `shuffle` method will deplete the original array, but build a randomly-
  // ordered array. So, be sure to save its return value.
  var shuffled = shuffle(arr);
  sort(shuffled, 0, shuffled.length - 1);
  return shuffled;
};
