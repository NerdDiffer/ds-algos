var index    = require('../../');
var StackLL  = index.StackLL;
var StackArr = index.StackArr;

var assert = require('assert');

describe('Stack: linked-list implementation', function() {

  it('upon initialization, the head node is null', function() {
    var stack = new StackLL();
    assert.equal(stack.head, null);
  });

  describe('#push', function() {
    var stack = new StackLL();

    it('adds an item to the front of the list', function() {
      stack.push('a');
      assert.deepEqual(stack.head, { val: 'a', next: null });
    });
  });

  describe('#pop', function() {
    var stack = new StackLL();
    stack.push('a');

    it('removes an item from the front of the list & returns it', function() {
      assert.deepEqual(stack.pop(), { val: 'a', next: null });
    });
    it('the item is no longer available at front of list', function() {
      assert.equal(stack.head, null);
    });
  });

  describe('#isEmpty', function() {
    var stack = new StackLL();

    it('returns true when the head node is null', function() {
      assert(stack.isEmpty());
    });
    it('otherwise returns false', function() {
      stack.push('a');
      assert.equal(stack.isEmpty(), false);
    });
  });

  describe('#size', function() {
    var stack = new StackLL();

    it('returns the number of nodes in the stack', function() {
      stack.push('a');
      stack.push('b');
      stack.push('c');
      stack.push('d');
      stack.push('e');
      assert.equal(stack.size(), 5);
    });
  });

});

describe('Stack: array implementation', function() {
  describe('#push', function() {
    var stack = new StackArr();
    stack.push('a');

    it('adds items to end of array', function() {
      assert.deepEqual(stack.s, ['a']);
    });

    it('increments the value of `n`', function() {
      assert.equal(stack.n, 1);
    });
  });

  describe('#pop', function() {
    var stack = new StackArr();
    stack.push('1st item');
    stack.push('2nd item');
    stack.push('3rd item');

    it('returns an item from the array', function() {
      assert.deepEqual(stack.pop(), '3rd item');
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
      stack.push('a');
      assert.equal(stack.isEmpty(), false);
    });
  });
});
