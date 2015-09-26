var index    = require('../../').ds;
var StackLL  = index.StackLL;
var StackArr = index.StackArr;

var assert = require('assert');

describe('Stack: linked-list implementation', function() {

  describe('inheritance from LinkedList', function() {
    var stack = new StackLL();
    var LinkedList = index.LinkedList;
    var sharedBehavior = require('../sharedBehavior.js');
    sharedBehavior.demonstratesInheritance(stack, StackLL, LinkedList);
  });

  describe('upon initialization', function() {
    it('the head node is null', function() {
      var stack = new StackLL();
      assert.equal(stack.head, null);
    });
  });

  describe('#add', function() {
    // this is the same as `LinkedList#unshift`
  });

  describe('#remove', function() {
    // this is the same as `LinkedList#shift`
  });

});

describe('Stack: array implementation', function() {
  describe('#add', function() {
    var stack = new StackArr();
    stack.add('a');

    it('adds items to end of array', function() {
      assert.deepEqual(stack.s, ['a']);
    });

    it('increments the value of `n`', function() {
      assert.equal(stack.n, 1);
    });
  });

  describe('#remove', function() {
    var stack = new StackArr();
    stack.add('1st item');
    stack.add('2nd item');
    stack.add('3rd item');

    it('returns an item from the array', function() {
      assert.deepEqual(stack.remove(), '3rd item');
    });
    it('confirms that the array does not have that removed item', function() {
      assert.deepEqual(stack.s, ['1st item', '2nd item']);
    });
    it('decrements the value of `n`', function() {
      assert.equal(stack.n, 2);
    });
  });

  describe('#isEmpty', function() {
    var stack = new StackArr();

    it('returns true when `n` is 0', function() {
      assert(stack.isEmpty());
    });
    it('otherwise returns false', function() {
      stack.add('a');
      assert.equal(stack.isEmpty(), false);
    });
  });
});
