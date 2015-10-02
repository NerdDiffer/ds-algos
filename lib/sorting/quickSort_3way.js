/**
 * Variation of quickSort which uses a technique called 3-way partitioning.
 * It's useful in dealing with equal keys and protecting against worst-case
 * scenarios, where the algorithm runs in quadratic time. Commonly, it is
 * equal/duplicate keys which present this.
 */
var h = require('./helpers.js');
var shuffle = require('../misc/shuffle.js');

function sort(arr, lo, hi) {
  if (hi <= lo) return;
  var lt = lo;     // Index where values < `v`
  var gt = hi;     // Index where values > `v`
  var v = arr[lo]; // Partitioning item
  var i = lo;
  while (i <= gt) {
    var cmp = h.compare(arr[i], v);
    if (cmp < 0) {          // `arr[i] < v`
      h.exch(arr, lt, i);
      lt++;
      i++;
    } else if (cmp > 0) {   // `arr[i] > v`
      h.exch(arr, i, gt);
      gt--;
    } else {                // `arr[i] == v`
      i++;
    }
  }
  // Recursively sort each side
  sort(arr, lo, lt - 1);
  sort(arr, gt + 1, hi);
}

module.exports = function(arr) {
  // The `shuffle` method will deplete the original array, but build up a
  // randomly-ordered array. So, be sure to save its return value.
  var shuffled = shuffle(arr);
  sort(shuffled, 0, shuffled.length - 1);
  return shuffled;
};
