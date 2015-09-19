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

    context('adding one node', function() {
      var stack = new StackLL();
      stack.add('a');

      it('adds an item to the front of the list', function() {
        assert.deepEqual(stack.head, { val: 'a', next: null });
      });
      it('confirms the next property is null', function() {
        assert.equal(stack.head.next, null);
      });
    });
    context('adding a second node', function () {
      var stack = new StackLL();
      stack.add('a');
      stack.add('b');

      it('the size is 2 nodes', function() {
        assert.equal(stack.size(), 2);
      });
      it('the next property of new head node points to old head', function() {
        assert.deepEqual(stack.head.next, { val: 'a', next: null });
      });
      it('the next property of last node should be null', function() {
        assert.equal(stack.head.next.next, null);
      });
    });
  });

  describe('#remove', function() {
    var stack = new StackLL();
    stack.add('a');

    it('removes an item from the front of the list & returns it', function() {
      assert.deepEqual(stack.remove(), { val: 'a', next: null });
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
      stack.add('a');
      assert.equal(stack.isEmpty(), false);
    });
  });

  describe('#size', function() {
    var stack = new StackLL();

    it('returns the number of nodes in the stack', function() {
      stack.add('a');
      stack.add('b');
      stack.add('c');
      stack.add('d');
      stack.add('e');
      assert.equal(stack.size(), 5);
    });
  });

  describe('#each', function() {
    var stack = new StackLL();
    stack.add(1);
    stack.add(2);
    stack.add(3);
    it('iterates through all the nodes', function() {
      var m = [];
      stack.each(function(n) {
        m.push(n.val);
      });
      assert.deepEqual(m, [3,2,1]);
    });
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
