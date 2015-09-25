/**
 * Merge sort
 */

var h = require('./helpers.js');

function merge(arr, lo, mid, hi) {
  // make a copy of `arr`
  var aux = arr.slice();

  var i = lo;      // index in 1st half of `arr`
  var j = mid + 1; // index in 2nd half of `arr`

  for (var k = lo; k <= hi; k++) {
    if (i > mid) {       // if 1st half is exhausted...
      arr[k] = aux[j++];
    } else if (j > hi) { // if 2nd half is exhausted...
      arr[k] = aux[i++];
    } else if (h.less(aux[j], aux[i])) { // otherwise add lowest value between
      arr[k] = aux[j++];                 // the two array halves and increment
    } else {                             // index from array half you add from
      arr[k] = aux[i++];
    }
  }
}

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
