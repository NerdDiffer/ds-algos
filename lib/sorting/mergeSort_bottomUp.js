/**
 * Bottom-up merge sort, without recursion.
 * Think of entire array as pre-sorted subarrays, each of size 1.
 * Merge the subarrays of increasing sizes:
 *   - increase size at each pass, through the main array, by factor of 2.
 *     (size 2, 4, 8, 16, 32, 64....)
 * Continue until array is sorted after the last pass through the array.
 */

var merge = require('./merge.js');

function sort(arr) {
  var n = arr.length;

  for (var sz = 1; sz < n; sz *= 2) {

    for (var lo = 0; lo < (n - sz); lo += (2 * sz)) {
      var mid = lo + sz - 1;
      var hi  = Math.min(lo + sz + sz - 1, n - 1);
      merge (arr, lo, mid, hi);
    }

  }
}

module.exports = function (arr) {
  sort(arr);
  return arr;
};
