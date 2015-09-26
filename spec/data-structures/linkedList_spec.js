// testing for singly linked list
var assert = require('assert');
var LinkedList = require('../../').ds.LinkedList;

describe('LinkedList', function() {

  describe('head', function() {
    var list = new LinkedList();

    it('first node should be null', function() {
      assert.equal(list.head, null);
    });
    it("first node should point to null", function() {
      assert.equal(list.head, null);
    });
  });

  describe('#push', function() {
    context('adding one item', function() {
      var list = new LinkedList();
      list.push('a');
      it('has a head node with val "a"', function() {
        assert.equal(list.head.val, 'a');
      });
    });
    context('adding multiple items', function() {
      var list;
      beforeEach(function() {
        list = new LinkedList();
        list.push('c');
        list.push('b');
        list.push('a');
      });
      afterEach(function() {
        list = null;
      });
      it('has a head node with val "c"', function() {
        assert.equal(list.head.val, 'c');
      });
    });
  });

  describe('#pop', function() {
    context('removing one item', function() {
      var list;
      beforeEach(function() {
        list = new LinkedList();
        list.push('a');
        list.push('b');
        list.push('c');
      });
      afterEach(function() {
        list = null;
      });
      it('returns a node with value "c"', function() {
        assert.equal(list.size(), 3);
        var n = list.pop();
        assert.equal(n.val, 'c');
      });
      it('has 3 nodes before #pop, and 2 nodes after', function() {
        assert.equal(list.size(), 3);
        list.pop();
        assert.equal(list.size(), 2);
      });
    });
  });

  describe('#unshift', function() {
    context('adding one item', function() {
      var list = new LinkedList();
      list.unshift('a');

      it('adds an item to the front of the list', function() {
        assert.deepEqual(list.head, { val: 'a', next: null });
      });
      it('confirms the next property is null', function() {
        assert.equal(list.head.next, null);
      });
    });
    context('adding a second item', function () {
      var list = new LinkedList();
      list.unshift('a');
      list.unshift('b');

      it('the size is 2 nodes', function() {
        assert.equal(list.size(), 2);
      });
      it('the next property of new head node points to old head', function() {
        assert.deepEqual(list.head.next, { val: 'a', next: null });
      });
      it('the next property of last node should be null', function() {
        assert.equal(list.head.next.next, null);
      });
    });
  });

  describe('#shift', function() {
    context('removing one item', function() {
      var list = new LinkedList();
      list.unshift('a');

      it('removes an item from the front of the list & returns it', function() {
        assert.deepEqual(list.shift(), { val: 'a', next: null });
      });
      it('the item is no longer available at front of list', function() {
        assert.equal(list.head, null);
      });
    });
  });

  describe('#findPenultimate', function() {
    var list = new LinkedList();
    list.push(1);
    list.push(2);
    list.push(3);
    it('returns the next to last node in the list', function() {
      assert.equal(list.findPenultimate().val, 2);
    });
  });

  describe('#findLast', function() {
    var list = new LinkedList();
    list.push(1);
    list.push(2);
    list.push(3);
    it('returns the last node in the list', function() {
      assert.equal(list.findLast().val, 3);
    });
  });

  describe('#isEmpty', function() {
    var list = new LinkedList();

    it('returns true when the head node is null', function() {
      assert(list.isEmpty());
    });
    it('otherwise returns false', function() {
      list.push('a');
      assert.equal(list.isEmpty(), false);
    });
  });

  describe('#size', function() {
    var list = new LinkedList();

    it('returns the number of nodes in the list', function() {
      list.push('a');
      list.push('b');
      list.push('c');
      list.push('d');
      list.push('e');
      assert.equal(list.size(), 5);
    });
  });

  describe('#each', function() {
    var list = new LinkedList();
    list.unshift(1);
    list.unshift(2);
    list.unshift(3);
    it('iterates through all the nodes', function() {
      var m = [];
      list.each(function(n) {
        m.push(n.val);
      });
      assert.deepEqual(m, [3,2,1]);
    });
  });
});
