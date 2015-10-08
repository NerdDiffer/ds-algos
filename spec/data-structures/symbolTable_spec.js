var assert = require('assert');
var SymbolTable = require('../../').ds.SymbolTable;

describe('SymbolTable', function() {
  describe('#put', function() {
    context('adding', function() {
      var st = new SymbolTable();
      it('adds a key-value pair to the table', function() {
        st.put('a', 'value of a');
        assert.equal(st.get('a'), 'value of a');
      });
      it('can also take a number as a key', function() {
        st.put(2, 'value of 2');
        assert.equal(st.get(2), 'value of 2');
      });
    });
    context('overwriting', function() {
      var st = new SymbolTable();
      it('overwrites the old value with the new value', function() {
        st.put('a', 'value of a');
        assert.equal(st.get('a'), 'value of a');
        st.put('a', 'new value of a');
        assert.equal(st.get('a'), 'new value of a');
      });
    });
    context('removing', function() {
      var st = new SymbolTable();
      it('can remove a pair from a table', function() {
        st.put('a', 'value of a');
        assert.equal(st.get('a'), 'value of a');
        st.put('a', null);
        assert(!st.hasOwnProperty('a'));
      });
    });
  });
  describe('#get', function() {
    it('returns the value when the key exists in table', function() {
      var st = new SymbolTable();
      st.put('a', 'value of a');
      assert.equal(st.get('a'), 'value of a');
    });
    it('returns null when the key does not exist', function() {
      var st = new SymbolTable();
      assert.equal(st.get('a'), null);
    });
  });
  describe('#delete', function() {
    it('removes the key & its associated value from the table', function() {
      var st = new SymbolTable();
      st.put('a', 'value of a');
      assert.equal(st.get('a'), 'value of a');
      st.delete('a');
      assert(!st.hasOwnProperty('a'));
    });
    context('if trying to delete a key which does not exist', function () {
      var st = new SymbolTable();
      it('will add a key with value null', function () {
        assert(!st.hasOwnProperty('a'));
        st.delete('a');
        assert.equal(st.get('a'), null);
      });
    });
  });
  describe('#contains', function() {
    var st = new SymbolTable();
    it('returns true if there is a value paired with the key', function() {
      st.put('a', 'value of a');
      assert(st.contains('a'));
    });
    it('returns false if there is not a value paired with the key', function() {
      assert(!st.contains('b'));
    });
  });
  describe('#keys', function() {
    var st = new SymbolTable();
    st.put('a', 'value of a');
    st.put('b', 'value of b');
    st.put('c', 'value of c');
    it('returns an array of all the keys in the table', function() {
      assert.deepEqual(st.keys(), ['a', 'b', 'c']);
    });
  });
  describe('#isEmpty', function() {
    it('returns true when there are no keys', function () {
      var st = new SymbolTable();
      assert(st.isEmpty());
    });
    it('returns false when there are some keys', function () {
      var st = new SymbolTable();
      st.put('a', 'value of a');
      st.put('b', 'value of b');
      st.put('c', 'value of c');
      assert(!st.isEmpty());
    });
  });
  describe('#size', function() {
    var st = new SymbolTable();
    st.put('a', 'value of a');
    st.put('b', 'value of b');
    st.put('c', 'value of c');
    it('has a size of 3', function() {
      assert.equal(st.size(), 3);
    });
  });
});
