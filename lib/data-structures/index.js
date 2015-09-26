var stack = require('./stack.js');
var queue = require('./queue.js');

module.exports = {
  LinkedList: require('./linkedList.js'),
  StackArr:   stack.StackArr,
  StackLL:    stack.StackLL,
  QueueLL:    queue.QueueLL,
  QuickFind:  require('./quickFind.js'),
  QuickUnion: require('./quickUnion.js')
};
