var h = require('./helpers.js');

/**
 * An in-place merge of an array.
 * Used in at least 2 variations of merge sort.
 * @param arr, the array to sort
 * @param lo, index in `arr` to traverse 1st sub-array
 * @param mid, the upper boundary of the 1st sub-array
 * @param hi, last index of `arr`
 */
module.exports = function merge(arr, lo, mid, hi) {
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
};
