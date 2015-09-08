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
