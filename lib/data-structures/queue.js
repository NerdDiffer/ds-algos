/**
 * Linked-List implementation of a Queue
 */
function QueueLL() {
  this.head = null;
  this.last = null;
  this.size = 0;
}

// add element to END of queue, increment size
QueueLL.prototype.enqueue = function(node) {
  var qNode = new QNode(node);

  if (this.isEmpty()) {
    this.head = qNode;
    this.tail = qNode;
    return ++this.size;
  }
  var oldTail = this.tail;
  this.tail = qNode;
  this.tail.next = oldTail;
  return ++this.size;
};

// remove element from FRONT of queue, decrement size
QueueLL.prototype.dequeue = function() {
  if (this.isEmpty()) { return; }
  if (this.size === 1) {
    var oldHead = this.head;
    this.head = null;
    this.tail = null;
    this.size--;
    return oldHead;
  }
  // starting at tail, find node which points to head
  var cursor = findPenultimate(this.tail);
  // save reference to old head, because it'll be returned later
  var oldHead = cursor.next;
  // set `this.head` to current node
  this.head = cursor;
  // make `this.head.next` point to null
  this.head.next = null;
  // decrement size
  this.size--;
  // return reference to old head
  return oldHead;
};

QueueLL.prototype.isEmpty = function() {
  return this.size === 0;
};

function QNode(val) {
  this.data = val;
  this.next = null;
}

/**
 * Find node which *points* to the head.
 * @param cursor, pass in the tail node of a Queue object
 * @return, the node which points to a the node which points to null.
 *   Or returns undefined if the queue size is 0 or 1.
 *   Or returns the passed-in cursor there is no next node
 */
function findPenultimate(cursor) {
  // if the size is 0 or 1, return undefined
  if (cursor === null || cursor.next === null) { return; }
  // while the next node of the next node is not null...
  while (cursor.next.next !== null) {
    cursor = cursor.next;
  }

  return cursor;
}

module.exports.QueueLL = QueueLL;
