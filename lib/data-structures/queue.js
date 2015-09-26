var inherits = require('inherits');
var LinkedList = require('./linkedList.js');

inherits(QueueLL, LinkedList);

/**
 * Linked-List implementation of a Queue
 */
function QueueLL() {
  this.head = null;
  this.last = null;
  LinkedList.call(this);
}

QueueLL.prototype.enqueue = LinkedList.prototype.push;
QueueLL.prototype.dequeue = LinkedList.prototype.shift;

module.exports.QueueLL = QueueLL;
