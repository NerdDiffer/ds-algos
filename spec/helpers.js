/**
 * Compares two arrays, determines if they both have same contents
 */
function areTwoArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  } else {
    return arr1.every(function(val, ind, arr) {
      return arr2.indexOf(val) >= 0;
    });
  }
}

module.exports = {
  areTwoArraysEqual: areTwoArraysEqual
};
