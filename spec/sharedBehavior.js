// Store shared behavior in here

var assert = require('assert');

/**
 * Demonstrate very basic object inheritance by examining an object and two
 * constructor functions.
 * @param childObj, an instance of the childConst
 * @param childConst, the Child 'class' constructor
 * @param parentConst, the Parent 'class' constructor
 */
exports.demonstratesInheritance = function(childObj, childConst, parentConst) {

  describe('constructors', function() {
    it('constructor of the child object is the child constructor', function() {
      assert.equal(childObj.constructor, childConst);
    });

    it('constructor super-constructor is the parent constructor', function() {
      assert.equal(childObj.constructor.super_, parentConst);
    });
  });

  describe('prototypes', function() {

    it('prototype of the child object is prototype of the child constructor', function() {
      assert.equal(Object.getPrototypeOf(childObj), childConst.prototype);
    });

    it('prototype of the prototype of the child object is the prototype of the parent constructor', function() {
      assert.equal(
        Object.getPrototypeOf(Object.getPrototypeOf(childObj)),
        parentConst.prototype
      );
    });

  });

};

/**
 * Verifying states of 3 properties of a weighted QuickUnion object after
 * one call to `#union`
 * @param wquObj, [Object] the weighted QuickUnion object
 * @param twoNodes, [Array] values of the 2 parameters to pass to wquObj#union
 * @param ids, [Array] the `ids` array you expect the obj to have afterwards
 * @param sizes, [Array] the `sizes` array you expect the obj to have afterwards
 * @param count, [Integer] the number of connected components you expect the
 *   obj to have afterwards
 */
exports.theseStatesAfterUnionOp = function(wquObj, twoNodes, ids, sizes, count) {

  beforeEach(function() { wquObj.union(twoNodes[0], twoNodes[1]); });

  it('has this `ids` array', function() {
    assert.deepEqual(wquObj.ids, ids);
  });

  it('has this `sizes` array', function() {
    assert.deepEqual(wquObj.sizes, sizes);
  });

  it('has this many connected components', function() {
    assert.equal(wquObj.count, count);
  });
};
