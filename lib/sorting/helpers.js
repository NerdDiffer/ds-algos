/**
 * Some reusables for sorting
 */

/**
 * Generic comparison function. Good for:
 * two integers, two floating points, two strings
 * @param v, 1st value
 * @param w, 2nd value
 * @return, -1 if v < w
 *           1 if v > w
 *           0 if v == w
 */
var compare = function(v, w) {
  if (v < w)      { return -1; }
  else if (v > w) { return  1; }
  else            { return  0; }
};

/**
 * Is item `v` less than item `w`?
 * @param v
 * @param w
 * @param fn, optional callback which returns negative integer if v < w
 *                                    returns 0 if v === w
 *                                    return positive integer if v > w
 *   by default: will be the `compare` function in this module
 * @return [Boolean]
 */
var less = function(v, w, fn) {
  fn = (typeof fn === 'undefined' ? compare : fn);

  return fn(v, w) < 0;
};

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

/**
 * Is the array sorted?
 * @param arr, [Array] the array you want to test!
 * @param fn, optional, the criteria to compare one array value to previous
 *   by default: will be the `compare` function in this module
 * @return [Boolean]
 */
var sorted = function(arr, fn) {
  fn = (typeof fn === 'undefined' ? compare : fn);

  return arr.every(function(v, i, a) {
    return ( i === 0 ? true : less(a[i - 1], v, fn) );
  });
};

module.exports = {
  compare: compare,
  less: less,
  exch: exch,
  sorted: sorted
};
