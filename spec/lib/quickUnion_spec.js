var QuickUnion     = require('../../').QuickUnion;
var QuickFind      = require('../../').QuickFind;
var sharedBehavior = require('../sharedBehavior.js');

var assert = require('assert');

describe('QuickUnion', function() {

  var obj = new QuickUnion(5);

  describe('inheritance from QuickFind', function() {
    sharedBehavior.demonstratesInheritance(obj, QuickUnion, QuickFind);
  });

  describe('distinguishing between weighted quick union', function() {

    it('should have `weighted` value of false', function() {
      assert(!obj.weighted);
    });

    it('should NOT have a `sizes` property', function() {
      assert(!obj.hasOwnProperty('sizes'));
    });

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

describe('weighted QuickUnion', function() {

  var obj = new QuickUnion(5, true);

  describe('two properties of weighted quick union', function() {

    it('should have `weighted` value of true', function() {
      assert(obj.weighted);
    });

    it('should have a `sizes` property', function() {
      assert(obj.hasOwnProperty('sizes'));
    });

  });

  describe('combining methods', function() {

    var obj = new QuickUnion(10, true);

    describe('states after union(4, 7)', function() {

      sharedBehavior.theseStatesAfterUnionOp(
        obj,
        [4, 7],
        [0,1,2,3,4,5,6,4,8,9],
        [1,1,1,1,2,1,1,1,1,1],
        9
      );

    });

    describe('states after union(2, 0)', function() {

      sharedBehavior.theseStatesAfterUnionOp(
        obj,
        [2, 0],
        [2,1,2,3,4,5,6,4,8,9],
        [1,1,2,1,2,1,1,1,1,1],
        8
      );

    });

    describe('states after union(5, 6)', function() {

      sharedBehavior.theseStatesAfterUnionOp(
        obj,
        [5, 6],
        [2,1,2,3,4,5,5,4,8,9],
        [1,1,2,1,2,2,1,1,1,1],
        7
      );

    });

    describe('states after union(7, 9)', function() {

      sharedBehavior.theseStatesAfterUnionOp(
        obj,
        [7, 9],
        [2,1,2,3,4,5,5,4,8,4],
        [1,1,2,1,3,2,1,1,1,1],
        6
      );

    });

    describe('states after union(8, 3)', function() {

      sharedBehavior.theseStatesAfterUnionOp(
        obj,
        [8, 3],
        [2,1,2,8,4,5,5,4,8,4],
        [1,1,2,1,3,2,1,1,2,1],
        5
      );

    });

    describe('states after union(3, 2)', function() {

      sharedBehavior.theseStatesAfterUnionOp(
        obj,
        [3, 2],
        [2,1,8,8,4,5,5,4,8,4],
        [1,1,2,1,3,2,1,1,4,1],
        4
      );

    });

    describe('states after union(4, 6)', function() {

      sharedBehavior.theseStatesAfterUnionOp(
        obj,
        [4, 6],
        [2,1,8,8,4,4,5,4,8,4],
        [1,1,2,1,5,2,1,1,4,1],
        3
      );

    });

    describe('states after union(8, 4)', function() {

      sharedBehavior.theseStatesAfterUnionOp(
        obj,
        [8, 4],
        [2,1,8,8,4,4,5,4,4,4],
        [1,1,2,1,9,2,1,1,4,1],
        2
      );

    });

    describe('states after union(3, 1)', function() {

      sharedBehavior.theseStatesAfterUnionOp(
        obj,
        [3, 1],
        [2,4,8,8,4,4,5,4,4,4],
        [1,1,2,1,10,2,1,1,4,1],
        1
      );

    });
  });
});
