/**
 * Top-down merge sort, with recursion.
 */

var merge = require('./merge.js');

function sort(arr, aux, lo, hi) {
  if (hi <= lo) { return; }
  var mid = parseInt(lo + (hi - lo) / 2);

  // recursively, sort the 2 array halves
  sort (arr, aux, lo, mid);
  sort (arr, aux, mid + 1, hi);

  // then merge them!
  merge(arr, lo, mid, hi);
}

module.exports = function (arr) {
  var aux = arr.slice();
  sort(arr, aux, 0, arr.length - 1);
  return arr;
};
