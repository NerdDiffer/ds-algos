var ts = require('total-sorta');

// an ordered priority queue
function PriorityQueue() {
  this.contents = [];
  this.n = 0;
}

// Insert a key into the end of priority queue
PriorityQueue.prototype.insert = function(key) {
  var i = this.n - 1;

  // Increment index of each array value to make room for new key
  while (i >= 0 && ts.less(key, this.contents[i])) {
    this.contents[i + 1] = this.contents[i];
    i--;
  }

  this.contents[i + 1] = key;
  return ++this.n;
};

// Remove the highest key & return it
PriorityQueue.prototype.deleteMax = function(key) {
  if (this.isEmpty()) { return; }
  this.n--;
  return this.contents.pop();
};

// Return true if PQ is empty. Otherwise, false.
PriorityQueue.prototype.isEmpty = function() {
  return this.n === 0;
};

// Return highest key
PriorityQueue.prototype.max = function() {
  return this.contents[this.n - 1];
};

// Return number of entries in the priority queue
PriorityQueue.prototype.size = function() {
  return this.n;
};

module.exports = PriorityQueue;
