var assert = require('assert');
var SequentialSearch = require('../../').search.SequentialSearch;

describe('SequentialSearch', function() {

  describe('#put', function() {

    context('adding', function() {
      var ss = new SequentialSearch();

      context('before', function() {
        it('the linked list has 0 nodes', function() {
          assert.equal(ss.list.n, 0);
        });
      });
      context('after', function() {
        it('adds a key-value pair to the table', function() {
          ss.put('a', 'value of a');
          assert.equal(ss.get('a'), 'value of a');
        });
        it('the linked list now has 1 node', function() {
          assert.equal(ss.list.n, 1);
        });
      });
    });

    context('overwriting', function() {
      var ss = new SequentialSearch();

      before('add a node', function() {
        ss.put('a', 'value of a');
      });
      context('before, check some conditions', function() {
        it('has a node with this value', function() {
          assert.equal(ss.get('a'), 'value of a');
        });
        it('the linked list has 1 node', function() {
          assert.equal(ss.list.n, 1);
        });
      });
      context('after', function() {
        it('overwrites the old value with the new value', function() {
          ss.put('a', 'new value of a');
          assert.equal(ss.get('a'), 'new value of a');
        });
        it('the linked list still has 1 node', function() {
          assert.equal(ss.list.n, 1);
        });
      });
    });

    context('removing', function() {
      var ss = new SequentialSearch();

      it('can remove a pair from the list', function() {
        ss.put('a', 'value of a');
        assert.equal(ss.get('a'), 'value of a');
        ss.put('a', null);
        assert.equal(ss.get('a'), null);
      });
    });

  });

  describe('#get', function() {
    it('returns the value when the key exists in table', function() {
      var ss = new SequentialSearch();
      ss.put('a', 'value of a');
      assert.equal(ss.get('a'), 'value of a');
    });
    it('returns null when the key does not exist', function() {
      var ss = new SequentialSearch();
      assert.equal(ss.get('a'), null);
    });
  });

  describe('#delete', function() {
    it('removes the key & its associated value from the list', function() {
      var ss = new SequentialSearch();
      ss.put('a', 'value of a');
      assert.equal(ss.get('a'), 'value of a');
      ss.delete('a');
      assert.equal(ss.get('a'), null);
    });
  });

  describe('#contains', function() {
    var ss = new SequentialSearch();
    it('returns true if there is a value paired with the key', function() {
      ss.put('a', 'value of a');
      assert(ss.contains('a'));
    });
    it('returns false if there is not a value paired with the key', function() {
      assert(!ss.contains('b'));
    });
  });

  describe('#keys', function() {
    var ss = new SequentialSearch();
    ss.put('a', 'value of a');
    ss.put('b', 'value of b');
    ss.put('c', 'value of c');
    it('returns an array of all the keys in the table', function() {
      assert.deepEqual(ss.keys(), ['c', 'b', 'a']);
    });
  });

  describe('#isEmpty', function() {
    it('returns true when there are no keys', function () {
      var ss = new SequentialSearch();
      assert(ss.isEmpty());
    });
    it('returns false when there are some keys', function () {
      var ss = new SequentialSearch();
      ss.put('a', 'value of a');
      ss.put('b', 'value of b');
      ss.put('c', 'value of c');
      assert(!ss.isEmpty());
    });
  });

  describe('#size', function() {
    var ss = new SequentialSearch();
    ss.put('a', 'value of a');
    ss.put('b', 'value of b');
    ss.put('c', 'value of c');
    it('has a size of 3', function() {
      assert.equal(ss.size(), 3);
    });
  });

});
