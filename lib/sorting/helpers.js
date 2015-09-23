/**
 * Some reusables for sorting
 */

var ts = require('total-sorta');

/**
 * Swaps two items of an array
 * @param arr, the array
 * @param i, the index of one item
 * @param j, the index of another item
 */
var exch = function(arr, i, j) {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

module.exports = {
  compare: ts.compare,
  less:    ts.less,
  more:    ts.more,
  sorted:  ts.sorted,
  exch:    exch
};
