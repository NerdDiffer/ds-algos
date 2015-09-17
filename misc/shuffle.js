/**
 * Knuth, or Fisher-Yates, shuffle
 */

var h = require('./helpers.js');

module.exports = function (arr) {

  var shuffled = [];

  var n = arr.length;

  while (n > 0) {
    // select random value from arr
    var val = arr[generateRandomInt(0, n - 1)];
    // remove the value from arr
    arr.splice(arr.indexOf(val), 1);
    // add the value to shuffled
    shuffled.push(val);
  }

  return shuffled;
};

/**
 * Generate a 'random'-ish whole number
 * @param min, inclusive
 * @param max, inclusive
 * @return, a random-ish number
 */
function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
