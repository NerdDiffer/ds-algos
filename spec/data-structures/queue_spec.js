var index    = require('../../').ds;
var QueueLL = index.QueueLL;
var assert  = require('assert');

describe('Queue: linked-list implementation', function() {

  describe('upon initialization', function() {
    var queue = new QueueLL();
    it('the head node is null', function() {
      assert.equal(queue.head, null);
    });
    it('the tail node is null', function() {
      assert.equal(queue.tail, null);
    });
    it('has a size of 0', function() {
      assert.equal(queue.size, 0);
    });
    it('is empty', function() {
      assert(queue.isEmpty());
    });
  });

  describe('#isEmpty', function() {
    context('when queue is empty', function() {
      var queue = new QueueLL();
      it('returns true', function() {
        assert(queue.isEmpty());
      });
      it('returns true if the size is 0', function() {
        assert.equal(queue.isEmpty(), queue.size === 0);
      });
      it('will return false if size is less than 0', function () {
        // so, be careful with the way you decrement the `size` property,
        // particularly in #dequeue
        queue.size = -1;
        assert(!queue.isEmpty());
      });
    })
    context('when queue is not empty', function() {
      var queue = new QueueLL();
      before('add one node', function() {
        queue.enqueue(1);
      });
      it('returns false', function() {
        assert(!queue.isEmpty());
      });
      it('returns false when there is at least 1 node', function() {
        assert.equal(queue.isEmpty(), queue.size === 0);
      });
    });
  });

  describe('#enqueue', function() {
    context('adding one node', function() {
      var queue = new QueueLL();
      var el = { data: 1, next: null };
      before('add one', function() {
        queue.enqueue(1);
      });
      it('increments the size by 1', function() {
        assert.equal(queue.size, 1);
      });
      it('has a head node deeply equal to new node', function() {
        assert.deepEqual(queue.head, el);
      });
      it('has a tail node deeply equal to new node', function() {
        assert.deepEqual(queue.tail, el);
      });
    });
    context('adding several nodes', function() {
      var queue = new QueueLL();
      before('add three nodes', function() {
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
      });
      var mock1 = { data: 1, next: null };
      var mock2 = { data: 2, next: mock1 };
      var mock3 = { data: 3, next: mock2 };
      it('each call increments the size', function() {
        assert.equal(queue.size, 3);
      });
      it('the head node deeply equals this object', function() {
        assert.deepEqual(queue.head, mock1);
      });
      it('FWIW, has this node in the middle', function() {
        assert.deepEqual(queue.tail.next, mock2);
      });
      it('the tail node deeply equals this object', function() {
        assert.deepEqual(queue.tail, mock3);
      });
      it('returns the size', function() {
        assert.equal(queue.enqueue(4), 4);
      });
    });
  });

  describe('#dequeue', function() {
    context('if empty', function () {
      var queue = new QueueLL();
      it('returns undefined', function() {
        assert.equal(queue.dequeue(), undefined);
      });
      it('is empty', function() {
        assert(queue.isEmpty());
      });
    })
    context('with 1 node', function () {
      var queue = new QueueLL();
      var mock = { data: 1, next: null };
      before('add one node', function() {
        queue.enqueue(1);
      });
      context('before removal', function () {
        it('the head is deeply equal to this node', function() {
          assert.deepEqual(queue.head, mock);
        });
        it('the tail is the same as the head ', function() {
          assert.equal(queue.tail, queue.head);
        });
        it('has a size of 1', function() {
          assert.equal(queue.size, 1);
        });
      });
      context('removal', function () {
        it('returns the removed node', function() {
          assert.deepEqual(queue.dequeue(), mock);
        });
      });
      context('after removal', function () {
        it('now the head is null', function() {
          assert.deepEqual(queue.head, null);
        });
        it('which would also make the tail null', function() {
          assert.deepEqual(queue.tail, null);
        });
        it('has a size of 0', function() {
          assert.equal(queue.size, 0);
        });
      });
    });
    context('with 2+ nodes', function () {
      var queue = new QueueLL();
      var mockHead = { data: 1, next: null };
      var mockTail = { data: 2, next: mockHead };
      before('add two nodes', function() {
        queue.enqueue(1);
        queue.enqueue(2);
      });
      context('before removal', function () {
        it('the head is deeply equal to this node', function() {
          assert.deepEqual(queue.head, mockHead);
        });
        it('the tail is deeply equal to this node', function() {
          assert.deepEqual(queue.tail, mockTail);
        });
        it('has a size of 2', function() {
          assert.equal(queue.size, 2);
        });
      });
      context('removal', function () {
        it('returns the removed node', function() {
          assert.deepEqual(queue.dequeue(), mockHead);
        });
      });
      context('after removal', function () {
        var mock = { data: 2, next: null };
        it('has a size of 1', function() {
          assert.equal(queue.size, 1);
        });
        it('the head is now deeply equal to this node', function() {
          assert.deepEqual(queue.head, mock);
        });
        it('which would make the tail the same as the head', function() {
          assert.equal(queue.tail, queue.head);
        });
      });
    });
  });
});
