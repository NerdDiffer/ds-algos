/**
 * An in-place merge of an array.
 * Used in at least 2 variations of merge sort.
 * @param arr, the array to sort
 * @param lo, index in `arr` to traverse 1st sub-array
 * @param mid, the upper boundary of the 1st sub-array
 * @param hi, last index of `arr`
 */
module.exports.merge1 = function merge(arr, lo, mid, hi) {
  // make a copy of `arr`
  var aux = arr.slice();

  var i = lo;      // index in 1st half of `arr`
  var j = mid + 1; // index in 2nd half of `arr`

  for (var k = lo; k <= hi; k++) {
    if (i > mid) {       // if 1st half is exhausted...
      arr[k] = aux[j++];
    } else if (j > hi) { // if 2nd half is exhausted...
      arr[k] = aux[i++];
    } else if (aux[j] < aux[i]) { // otherwise add the lower value between
      arr[k] = aux[j++];          // the two array halves.
    } else {                      // if they're equal, add value from 1st half.
      arr[k] = aux[i++];
    }
  }
};

/**
 * A merging of two arrays using another algorithm derived from the pseudo-code
 * at: `http://www.algorithmist.com/index.php/Merge_sort`
 * @param a, one array
 * @param b, another array
 * @return, the two arrays merged into one
 */
module.exports.merge2 = function merge(a, b) {

  // store results of merge here, starting as empty array:
  var c = [];

  // while `a` & `b` have elements...
  while (a.length > 0 && b.length > 0) {
    if (a[0] > b [0]) {
      c.push(b.shift()); // add b[0] to end of c. remove b[0] from b
    } else {
      c.push(a.shift()); // add a[0] to end of c. remove a[0] from a
    }
  }

  // while `a` has elements...
  while (a.length > 0) {
    c.push(a.shift()); // add a[0] to end of c. remove a[0] from a
  }

  // while `b` has elements...
  while (b.length > 0) {
    c.push(b.shift()); // add b[0] to end of c. remove b[0] from b
  }

  return c;
};
