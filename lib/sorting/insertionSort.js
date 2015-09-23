/**
 * Insertion sort
 */

var h = require('./helpers.js');

module.exports = function (arr) {

  var i = 1;
  var n = arr.length;

  while (i < n) {
    var j = i;

    // as long as current value is less than value to immediate left,
    // continue exchanging places
    while(j > 0 && h.less(arr[j], arr[j - 1])) {
      h.exch(arr, j, (j - 1));
      j--;
    }
    i++;
  }

  return arr;
};
