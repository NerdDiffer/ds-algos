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
    context('pushing one item', function() {
      var list = new LinkedList();
      list.push('a');
      it('has a head node with val "a"', function() {
        assert.equal(list.head.val, 'a');
      });
    });
    context('pushing multiple items', function() {
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
    context('popping one item', function() {
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
    // this is tested by the StackLL data structure
  });

  describe('#shift', function() {
    // this is tested by the StackLL data structure
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
});
