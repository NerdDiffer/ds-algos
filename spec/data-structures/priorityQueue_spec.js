var assert  = require('assert');
var index   = require('../../').ds;
var PriorityQueue = index.PriorityQueue;

describe('PriorityQueue', function() {

  describe('#insert and #deleteMax', function() {
    var pq = new PriorityQueue();
    context('adding 3, deleting max', function() {
      before('it adds 3', function() {
        pq.insert('P');
        pq.insert('Q');
        pq.insert('E');
      });
      it('before removal, has these contents', function() {
        assert.deepEqual(pq.contents, ['E', 'P', 'Q']);
      });
      it('deletion returns this key', function() {
        assert.equal(pq.deleteMax(), 'Q');
      });
      it('after removal, has these contents', function() {
        assert.deepEqual(pq.contents, ['E', 'P']);
      });
    });
    context('adding 3, deleting max', function() {
      before('it adds 3', function() {
        pq.insert('X');
        pq.insert('A');
        pq.insert('M');
      });
      it('before removal, has these contents', function() {
        assert.deepEqual(pq.contents, ['A', 'E', 'M', 'P', 'X']);
      });
      it('deletion returns this key', function() {
        assert.equal(pq.deleteMax(), 'X');
      });
      it('after removal, has these contents', function() {
        assert.deepEqual(pq.contents, ['A', 'E', 'M', 'P']);
      });
    });
    context('adding 3, deleting max', function() {
      before('it adds 3', function() {
        pq.insert('P');
        pq.insert('L');
        pq.insert('E');
      });
      it('before removal, has these contents', function() {
        assert.deepEqual(pq.contents, ['A', 'E', 'E', 'L', 'M', 'P', 'P']);
      });
      it('deletion returns this key', function() {
        assert.equal(pq.deleteMax(), 'P');
      });
      it('after removal, has these contents', function() {
        assert.deepEqual(pq.contents, ['A', 'E', 'E', 'L', 'M', 'P']);
      });
    });
  });

  describe('other methods', function() {

    var pq = new PriorityQueue();

    it('isEmpty() true when the `n` variable is 0', function() {
      assert(pq.isEmpty());
      assert.equal(pq.n, 0);
    });

    it('insert() returns the new size', function() {
      assert.equal(pq.insert('p'), 1);
      assert.equal(pq.insert('q'), 2);
      assert.equal(pq.insert('e'), 3);
      assert.equal(pq.insert('x'), 4);
      assert.equal(pq.insert('a'), 5);
      assert.equal(pq.insert('m'), 6);
      assert.equal(pq.insert('p'), 7);
      assert.equal(pq.insert('l'), 8);
      assert.equal(pq.insert('e'), 9);
    });

    it('max() returns the highest key', function() {
      assert.equal(pq.max(), 'x');
    });

    it('isEmpty() returns false when `n` is not 0', function() {
      assert(!pq.isEmpty());
      assert.equal(pq.n, 9);
    });

    it('size() returns the size', function() {
      assert.equal(pq.size(), 9);
    });

  });

});
