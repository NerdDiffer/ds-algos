var QuickFind = require('../../').QuickFind;

var assert = require('assert');
var _ = require('lodash');

describe('QuickFind', function() {

  describe('valid values for n', function() {

    it('throws error if n is less than 0', function() {
      assert.throws(function() { return new QuickFind(-1); });
    });
  
    it('throws error if n is not an integer', function() {
      assert.throws(function() { return new QuickFind(1.1); });
    });

    it('does not throw error when n is 0', function() {
      assert.doesNotThrow(function() { return new QuickFind(0); });
    });

  });

  var obj = new QuickFind(5);

  describe('#ids', function() {

    it('returns an array', function() {
      assert(_.isArray(obj.ids), '#ids is an array');
    });

    it('#ids has a length of 5', function() {
      assert.equal(obj.ids.length, 5);
    });

    it('produces this array', function() {
      assert.deepEqual(obj.ids, [0,1,2,3,4]);
    });

  });

  describe('#count', function() {
    it('returns an array', function() {
      assert.equal(obj.count, 5);
    });
  });

  describe('#connected', function() {

    it('there is a function named #connected', function() {
      assert(_.isFunction(obj.connected));
    });

    it('objects 1 & 2 are NOT connected', function() {
      assert(!obj.connected(1,2));
    });
  });

  describe('#union', function() {
    it('there is a function named #union', function() {
      assert(_.isFunction(obj.union));
    });

    it('moves 2 under 1', function() {
      obj.union(1,2);
      assert.deepEqual(obj.ids, [0,2,2,3,4]);
    });

    it('moves 0 under 4', function() {
      obj.union(0,4);
      assert.deepEqual(obj.ids, [4,2,2,3,4]);
    });

  });

  describe('combining these methods', function() {
    var anotherObj = new QuickFind(10);

    it('instantiating an object with n of 10, produces this array', function() {
      assert.deepEqual(anotherObj.ids, [0,1,2,3,4,5,6,7,8,9]);
    });

    context('before one union operation', function() {
      it('has count of 10', function() {
        assert(anotherObj.count, 10);
      });
    });

    context('after one union operation', function() {
      beforeEach('perform a union(9, 7)', function() {
        anotherObj.union(9, 7);
      });

      it('has count of 9', function() {
        assert(anotherObj.count, 9);
      });

      it('moves 9 under 7', function() {
        assert.deepEqual(anotherObj.ids, [0,1,2,3,4,5,6,7,8,7]);
      });

      it('confirms nodes 7 & 9 are connected', function() {
        assert(anotherObj.connected(7, 9));
      });

      it('confirms nodes 2 & 8 are NOT connected', function() {
        assert(!anotherObj.connected(2, 8));
      });
    });

    context('after performing a bunch more union operations...', function() {
      beforeEach('perform a bunch of union operations', function() {
        anotherObj.union(9, 5);
        anotherObj.union(4, 5);
        anotherObj.union(8, 7);
        anotherObj.union(3, 8);
        anotherObj.union(7, 0);
      });

      it('produces this array', function() {
        assert.deepEqual(anotherObj.ids, [0,1,2,0,0,0,6,0,0,0]);
      });

      it('has a count of 4', function() {
        assert.equal(anotherObj.count, 4);
      });

    });

  });

});
