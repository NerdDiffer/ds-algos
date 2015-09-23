var helpers = require('../../lib/sorting').helpers;
var assert = require('assert');

describe('Helper functions for sorting', function() {

  describe('exch', function() {
    it('mutates contents of the original array', function() {
      var arr = ['a', 'b', 'c'];
      helpers.exch(arr, 0, 2);
      helpers.exch(arr, 1, 2);
      assert.notDeepEqual(arr, ['a', 'b', 'c']);
    });
    it('swaps positions of two array elements', function() {
      var arr = ['a', 'b', 'c'];
      helpers.exch(arr, 0, 1);
      assert.equal(arr[0], 'b');
      assert.equal(arr[1], 'a');
      assert.equal(arr[2], 'c');
    });
  });
});
