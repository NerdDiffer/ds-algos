var assert = require('assert');
var OrderedSymbolTable = require('../../').search.OrderedSymbolTable;

describe('OrderedSymbolTable', function() {

  describe('#put', function() {

    context('adding', function() {
      var ost = new OrderedSymbolTable();

      before('add some nodes', function() {
        ost.put('d', '');
        ost.put('e', '');
        ost.put('f', '');
      });

      context('before adding to the middle', function() {
        it('has this order', function() {
          assert.deepEqual(ost.keysList, ['d', 'e', 'f']);
        });
      });
      context('after adding to the middle', function() {
        before('add more nodes', function() {
          ost.put('a', '');
          ost.put('b', '');
          ost.put('c', '');
        });
        it('has this order', function() {
          assert.deepEqual(ost.keysList, ['a', 'b', 'c', 'd', 'e', 'f']);
        });
      });
    });

    context('overwriting', function() {
      var ost = new OrderedSymbolTable();

      before('add a node', function() {
        ost.put('a', 'value of a');
      });
      context('before, check some conditions', function() {
        it('has a node with this value', function() {
          assert.equal(ost.get('a'), 'value of a');
        });
        it('there is 1 node', function() {
          assert.equal(ost.size(), 1);
        });
      });
      context('after', function() {
        it('overwrites the old value with the new value', function() {
          ost.put('a', 'new value of a');
          assert.equal(ost.get('a'), 'new value of a');
        });
        it('there is still 1 node', function() {
          assert.equal(ost.size(), 1);
        });
      });
    });

    context('removing', function() {
      var ost = new OrderedSymbolTable();

      it('can remove a pair from the list', function() {
        ost.put('a', 'value of a');
        assert.equal(ost.get('a'), 'value of a');
        ost.put('a', null);
        assert.equal(ost.get('a'), null);
      });
    });

  });

  describe('#get', function() {
    it('returns the value when the key exists in table', function() {
      var ost = new OrderedSymbolTable();
      ost.put('a', 'value of a');
      assert.equal(ost.get('a'), 'value of a');
    });
    it('returns null when the key does not exist', function() {
      var ost = new OrderedSymbolTable();
      assert.equal(ost.get('a'), null);
    });
  });

  describe('#rank', function() {
    context('for a key that is in table', function() {
      var ost = new OrderedSymbolTable();
      before('add some keys', function() {
        ost.put('a', 'value of a');
        ost.put('b', 'value of b');
        ost.put('c', 'value of c');
      });
      it('returns number of keys, smaller than the given key', function() {
        assert.equal(ost.rank('c'), 2);
      });
    });
    context('for a key that is not in table', function() {
      var ost = new OrderedSymbolTable();
      before('add some keys', function() {
        ost.put('a', 'value of a');
        ost.put('b', 'value of b');
      });
      it('returns number of keys, smaller than the given key', function() {
        assert.equal(ost.rank('c'), 2);
      });
    });
  });

  describe('#delete', function() {
    it('removes the key & its associated value from the list', function() {
      var ost = new OrderedSymbolTable();
      ost.put('a', 'value of a');
      assert.equal(ost.get('a'), 'value of a');
      ost.delete('a');
      assert.equal(ost.get('a'), null);
    });
  });

  describe('#contains', function() {
    var ost = new OrderedSymbolTable();
    it('returns true if there is a value paired with the key', function() {
      ost.put('a', 'value of a');
      assert(ost.contains('a'));
    });
    it('returns false if there is not a value paired with the key', function() {
      assert(!ost.contains('b'));
    });
  });

  describe('#keys', function() {
    var ost = new OrderedSymbolTable();
    before('add some keys', function() {
      ost.put('a', 'value of a');
      ost.put('b', 'value of b');
      ost.put('c', 'value of c');
      ost.put('d', 'value of d');
      ost.put('e', 'value of e');
    });
    it('returns an array of all the keys in the table', function() {
      assert.deepEqual(ost.keys(), ['a', 'b', 'c', 'd', 'e']);
    });
    it('returns a range of keys (inclusive) beginning to middle', function() {
      assert.deepEqual(ost.keys(0, 3), ['a', 'b', 'c', 'd']);
    });
    it('returns a range of keys (inclusive) middle to end', function() {
      assert.deepEqual(ost.keys(1), ['b', 'c', 'd', 'e']);
    });
    it('returns a range of keys (inclusive) middle to middle', function() {
      assert.deepEqual(ost.keys(1, 3), ['b', 'c', 'd']);
    });
  });

  describe('#isEmpty', function() {
    it('returns true when there are no keys', function () {
      var ost = new OrderedSymbolTable();
      assert(ost.isEmpty());
    });
    it('returns false when there are some keys', function () {
      var ost = new OrderedSymbolTable();
      ost.put('a', 'value of a');
      ost.put('b', 'value of b');
      ost.put('c', 'value of c');
      assert(!ost.isEmpty());
    });
  });

  describe('#size', function() {
    var ost = new OrderedSymbolTable();
    ost.put('a', 'value of a');
    ost.put('b', 'value of b');
    ost.put('c', 'value of c');
    it('has a size of 3', function() {
      assert.equal(ost.size(), 3);
    });
  });

  describe('#min', function() {
    var ost = new OrderedSymbolTable();
    before('add some keys', function() {
      ost.put('c', '');
      ost.put('b', '');
      ost.put('a', '');
      ost.put('e', '');
      ost.put('d', '');
    });
    it('returns the smallest key', function() {
      assert.equal(ost.min(), 'a');
    });
    context('an empty symbol table', function() {
      var empty = new OrderedSymbolTable();
      it('returns null', function() {
        assert.equal(empty.min(), null);
      });
    });
  });

  describe('#max', function() {
    var ost = new OrderedSymbolTable();
    before('add some keys', function() {
      ost.put('c', '');
      ost.put('b', '');
      ost.put('a', '');
      ost.put('e', '');
      ost.put('d', '');
    });
    it('returns the largest key', function() {
      assert.equal(ost.max(), 'e');
    });
    context('an empty symbol table', function() {
      var empty = new OrderedSymbolTable();
      it('returns null', function() {
        assert.equal(empty.max(), null);
      });
    });
  });

  describe('#deleteMin', function() {
    var ost = new OrderedSymbolTable();
    before('add some keys', function() {
      ost.put('c', '');
      ost.put('b', '');
      ost.put('a', '');
      ost.put('e', '');
      ost.put('d', '');
    });
    it('deletes the smallest key', function() {
      assert.equal(ost.min(), 'a');
      ost.deleteMin();
      assert.equal(ost.get('a'), null);
    });
  });

  describe('#deleteMax', function() {
    var ost = new OrderedSymbolTable();
    before('add some keys', function() {
      ost.put('c', '');
      ost.put('b', '');
      ost.put('a', '');
      ost.put('e', '');
      ost.put('d', '');
    });
    it('deletes the largest key', function() {
      assert.equal(ost.max(), 'e');
      ost.deleteMax();
      assert.equal(ost.get('e'), null);
    });
  });

  describe('#floor', function() {
    var ost = new OrderedSymbolTable();
    before('add some keys', function() {
      ost.put(30, 'thirty');
      ost.put(20, 'twenty');
      ost.put(10, 'ten');
      ost.put(50, 'fifty');
      ost.put(40, 'forty');
    });
    it('returns largest key <= a given key', function() {
      assert.equal(ost.floor(25), 20);
    });
    context('keys ranked lower than min key', function() {
      it('returns null', function() {
        assert.equal(ost.floor(9), null);
      });
    });
    context('keys matching some existing key', function() {
      it('returns the key', function() {
        assert.equal(ost.floor(30), 30);
      });
    });
  });

  describe('#ceiling', function() {
    var ost = new OrderedSymbolTable();
    before('add some keys', function() {
      ost.put(30, 'thirty');
      ost.put(20, 'twenty');
      ost.put(10, 'ten');
      ost.put(50, 'fifty');
      ost.put(40, 'forty');
    });
    it('returns smallest key >= a given key', function() {
      assert.equal(ost.ceiling(25), 30);
    });
    context('keys ranked higher than max key', function() {
      it('returns null', function() {
        assert.equal(ost.ceiling(51), null);
      });
    });
  });

  describe('#select', function() {
    var ost = new OrderedSymbolTable();
    before('add some keys', function() {
      ost.put('c', '');
      ost.put('b', '');
      ost.put('a', '');
      ost.put('e', '');
      ost.put('d', '');
    });
    it('returns the key of a given rank', function() {
      assert.equal(ost.select(2), 'c');
    });
    it('returns null when rank is out of bounds', function() {
      assert.equal(ost.select(-1), null);
    });
    it('returns null when rank is out of bounds', function() {
      assert.equal(ost.select(10), null);
    });
  });

});
