/**
 * Selection sort
 */

var h = require('./helpers.js');

module.exports = function (arr) {

  var i = 0;
  var n = arr.length;

  while (i < n) {
    // the remaining array
    var rem = arr.slice(i);
    // the minimum of remaining array
    var min = findMin(rem);
    // the index of the main array, where you'd find the min value of the
    // remaining array
    var minInd = rem.indexOf(min) + i;
    // swap values of the entire array, in-place
    h.exch(arr, i, minInd);
    i++;
  }

  return arr;
};

// find minimum value in an array
function findMin(arr) {
  if (arr.length === 0) {
    return;
  } else if (arr.length === 1) {
    return arr[0];
  } else {
    var min = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (h.less(arr[i], min)) {
        min = arr[i];
      }
    }
    return min;
  }
}
