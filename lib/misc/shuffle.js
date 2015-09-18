/**
 * Knuth, or Fisher-Yates, shuffle
 */

module.exports = function (arr) {

  var shuffled = [];

  var n = arr.length;

  while (n) {
    // select random value from arr
    var val = arr[generateRandomInt(0, n - 1)];
    // remove the value from arr
    arr.splice(arr.indexOf(val), 1);
    // add the value to shuffled
    shuffled.push(val);
    // update `n` to new array length or die of an infinite loop
    n = arr.length;
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
