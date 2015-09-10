var QuickUnion     = require('../../').QuickUnion;
var QuickFind      = require('../../').QuickFind;
var sharedBehavior = require('../sharedBehavior.js');

var assert = require('assert');

describe('QuickUnion', function() {

  var obj = new QuickUnion(5);

  describe('inheritance from QuickFind', function() {
    sharedBehavior.demonstratesInheritance(obj, QuickUnion, QuickFind);
  });

  describe('combining methods', function() {
    var anotherObj = new QuickUnion(10);

    describe('after one call to union', function() {
      anotherObj.union(4, 3);

      it('has 9 connected components', function() {
        assert.equal(anotherObj.count, 9);
      });

      it('has this array after union operation', function() {
        assert.deepEqual(anotherObj.ids, [0,1,2,3,3,5,6,7,8,9]);
      });
    });

    describe('after more calls to union', function() {

      it('has this array after union operation', function() {
        anotherObj.union(3, 8);
        assert.deepEqual(anotherObj.ids, [0,1,2,8,3,5,6,7,8,9]);
      });

      it('has this array after union operation', function() {
        anotherObj.union(6, 5);
        assert.deepEqual(anotherObj.ids, [0,1,2,8,3,5,5,7,8,9]);
      });

      it('has this array after union operation', function() {
        anotherObj.union(9, 4);
        assert.deepEqual(anotherObj.ids, [0,1,2,8,3,5,5,7,8,8]);
      });

      it('has this array after union operation', function() {
        anotherObj.union(2, 1);
        assert.deepEqual(anotherObj.ids, [0,1,1,8,3,5,5,7,8,8]);
      });

      it('has this array after union operation', function() {
        anotherObj.union(8, 9);
        assert.deepEqual(anotherObj.ids, [0,1,1,8,3,5,5,7,8,8]);
      });

      it('has this array after union operation', function() {
        anotherObj.union(5, 0);
        assert.deepEqual(anotherObj.ids, [0,1,1,8,3,0,5,7,8,8]);
      });

      it('has this array after union operation', function() {
        anotherObj.union(7, 2);
        assert.deepEqual(anotherObj.ids, [0,1,1,8,3,0,5,1,8,8]);
      });

      it('has this array after union operation', function() {
        anotherObj.union(6, 1);
        assert.deepEqual(anotherObj.ids, [1,1,1,8,3,0,5,1,8,8]);
      });

      it('has this array after union operation', function() {
        anotherObj.union(1, 0);
        assert.deepEqual(anotherObj.ids, [1,1,1,8,3,0,5,1,8,8]);
      });
    });
  });
});
