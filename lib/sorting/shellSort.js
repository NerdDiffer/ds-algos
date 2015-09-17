/**
 * Shell sort
 */

var help = require('./helpers.js'); // don't name this module `h`.

module.exports = function(arr) {
  var n = arr.length;
  var k = 1;
  var h = 1;

  // do the Knuth thing to set `h`: incrementing by `3x + 1`
  while (k < Math.floor(n / 3)) {
    h = 3 * h + 1;
    k++;
  }

  // h-sort the array
  while (h >= 1) {
    // this is insertion sort, but swapping by every `h` value instead of by 1
    for (var i = h; i < n; i++) {
      for (var j = i; j >= h && help.less(arr[j], arr[j - h]); j -= h) {
        help.exch(arr, j, j - h);
      }
    }
    h = Math.floor(h / 3); // move on to next `h` increment
  }

  return arr;
};
