var assert = require('assert');
var sorts = require('../../').sorts;

describe('Selection Sort', function() {
  var selectionSort = sorts.selectionSort;

  context('Sorting an array of distinct integers', function() {

    var testArr = [6,1,9,3,2,8,4,7,5,0];

    it('sorts ascendingly', function() {
      assert.deepEqual(
        selectionSort(testArr),
        [0,1,2,3,4,5,6,7,8,9]
      );
    });

  });
});
