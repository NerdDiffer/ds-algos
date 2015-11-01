var assert = require('assert');
var BinaryHeap = require('../../').ds.BinaryHeap;

describe('BinaryHeap', function() {
  var bh = new BinaryHeap();
  describe('inserting 3 & removing the max', function() {
    it('inserts P', function() {
      bh.insert('P');
      assert.deepEqual(bh.contents, [,'P']);
    });
    it('inserts Q', function() {
      bh.insert('Q');
      assert.deepEqual(bh.contents, [,'Q','P']);
    });
    it('inserts E', function() {
      bh.insert('E');
      assert.deepEqual(bh.contents, [,'Q','P','E']);
    });
    it('removes max "Q", resulting in this array', function() {
      assert.equal(bh.deleteMax(), 'Q');
      assert.deepEqual(bh.contents, [,'P','E']);
    });
  });
  describe('inserting 3 & removing the max', function() {
    it('inserts X', function() {
      bh.insert('X');
      assert.deepEqual(bh.contents, [,'X', 'E', 'P']);
    });
    it('inserts A', function() {
      bh.insert('A');
      assert.deepEqual(bh.contents, [,'X', 'E', 'P', 'A']);
    });
    it('inserts M', function() {
      bh.insert('M');
      assert.deepEqual(bh.contents, [,'X', 'M', 'P', 'A', 'E']);
    });
    it('removes max "X", resulting in this array', function() {
      assert.equal(bh.deleteMax(), 'X');
      assert.deepEqual(bh.contents, [,'P', 'M', 'E', 'A']);
    });
  });
  describe('inserting 3 & removing the max', function() {
    it('inserts P', function() {
      bh.insert('P');
      assert.deepEqual(bh.contents, [,'P', 'P', 'E', 'A', 'M']);
    });
    it('inserts L', function() {
      bh.insert('L');
      assert.deepEqual(bh.contents, [,'P', 'P', 'L', 'A', 'M', 'E']);
    });
    it('inserts E', function() {
      bh.insert('E');
      assert.deepEqual(bh.contents, [,'P', 'P', 'L', 'A', 'M', 'E', 'E']);
    });
    it('removes max "P", resulting in this array', function() {
      assert.equal(bh.deleteMax(), 'P');
      assert.deepEqual(bh.contents, [,'P', 'M', 'L', 'A', 'E', 'E']);
    });
  });
});
