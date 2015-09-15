// Shared behavior, for sorting algorithms

var assert = require('assert');

exports.sortsBasicCases = function(sortingAlgorithm) {

  context('Sorting an array of distinct integers', function() {

    var testArr = [6,1,9,3,2,8,4,7,5,0];

    it('sorts ascendingly', function() {
      assert.deepEqual(
        sortingAlgorithm(testArr),
        [0,1,2,3,4,5,6,7,8,9]
      );
    });

  });

  context('Sorting an array of letters', function() {

    var testArr = 'sortexample'.split('');

    it('sorts ascendingly', function() {
      assert.deepEqual(
        sortingAlgorithm(testArr),
        ['a', 'e', 'e', 'l', 'm', 'o', 'p', 'r', 's', 't', 'x']
      );
    });

  });
};
