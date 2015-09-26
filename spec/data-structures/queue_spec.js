var index    = require('../../').ds;
var QueueLL = index.QueueLL;
var assert  = require('assert');

describe('Queue: linked-list implementation', function() {

  describe('inheritance from LinkedList', function() {
    var queue = new QueueLL();
    var LinkedList = index.LinkedList;
    var sharedBehavior = require('../sharedBehavior.js');
    sharedBehavior.demonstratesInheritance(queue, QueueLL, LinkedList);
  });

  describe('upon initialization', function() {
    var queue = new QueueLL();
    it('the head node is null', function() {
      assert.equal(queue.head, null);
    });
    it('the tail node is null', function() {
      assert.equal(queue.tail, null);
    });
  });

  describe('#enqueue', function() {
    // this is the same as `LinkedList#push`
  });

  describe('#dequeue', function() {
    // this is the same as `LinkedList#shift`
  });
});
