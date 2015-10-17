/**
 * Top-down merge sort, with recursion.
 */

var merges = require('./merge.js');

module.exports.mergeSort1 = function (arr) {

  var aux = arr.slice();
  var merge = merges.merge1;
  sort(arr, aux, 0, arr.length - 1);
  return arr;

  function sort(arr, aux, lo, hi) {
    if (hi <= lo) { return; }
    var mid = parseInt(lo + (hi - lo) / 2);

    // recursively, sort the 2 array halves
    sort (arr, aux, lo, mid);
    sort (arr, aux, mid + 1, hi);

    // then merge them!
    merge(arr, lo, mid, hi);
  }

};

module.exports.mergeSort2 = function(arr) {

  var merge = merges.merge2;
  return sort(arr);

  function sort (arr) {
    var n = arr.length;
    if (n === 1) return arr; // an array of one element is sorted

    // get starting point of the 2nd half of array
    var midInd = parseInt(n / 2);

    // divide the array in half
    var list1 = arr.slice(0, midInd);
    var list2 = arr.slice(midInd, n);

    // recursively sort each half
    list1 = sort(list1);
    list2 = sort(list2);

    return merge(list1, list2);
  }

};
