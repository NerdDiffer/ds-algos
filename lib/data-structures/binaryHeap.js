var inherits = require('inherits');
var PriorityQueue = require('./priorityQueue.js');
var h = require('../sorting/helpers');

inherits(BinaryHeap, PriorityQueue);

/**
 * A max-oriented binary heap where the 'root' is the highest value.
 * Heap order: values in the parent keys > the values in the child keys.
 */
function BinaryHeap() {
  PriorityQueue.call(this);
}

BinaryHeap.prototype.insert = function(val) {
  this.contents[++this.n] = val;
  swim(this.contents, this.n);
};

BinaryHeap.prototype.deleteMax = function() {
  var max = this.contents[1];
  this.contents[1] = this.contents.pop();
  this.n--;
  sink(this.contents);
  return max;
};

BinaryHeap.prototype.max = function() {
  return this.contents[1];
};

/**
 * When a child's key becomes larger than a parent's key,
 * exchange child's key with the parent key until heap order is restored.
 * @param arr, the array
 * @param i, an index in the `contents` array.
 */
function swim(arr, i) {
  var half = function(k) { return Math.floor(k / 2); };
  var parent = half(i);

  while (i > 1 && h.more(arr[i], arr[parent])) {
    h.exch(arr, i, parent);
    i = parent;
    parent = half(i);
  }
}

/**
 * Compare the value at arr[1] to its children.
 * If the value is less than one of its children, then exchange their places.
 * Continue until the value is greater than all of its children.
 */
function sink(arr) {
  var i = 1;
  var newVal = arr[i];
  var len = arr.length;

  while (true) {
    // `newInd` stores new position of an element. but only if needed.
    var newInd = null;
    // get the indices of child elements relative to the value at index `i`
    var ltInd = 2 * i;
    var rtInd = ltInd + 1;

    // if current element has a left child...
    if (ltInd < len) {
      var ltVal = arr[ltInd];
      // if the child is > its parent (`newVal`), then signal an exchange.
      if (ltVal > newVal) { newInd = ltInd; }
    }
    // likewise, do for the right side as you did to the left side...
    if (rtInd < len) {
      var rtVal = arr[rtInd];
      // only update value if you did not already set value for `newInd` when
      // you looked at the left child
      var _newInd_ = (newInd === null ? newVal : arr[ltInd]);
      if (rtVal > _newInd_) { newInd = rtInd; }
    }

    // if `newVal` can remain where it is (you did NOT set a value to `newInd`)
    if (newInd === null) {
      // then get the hell outta here!
      break;
    } else {
      // then exchange it & continue. I chose not to use `h.exch` because there
      // are 3 indices to consider instead of 2.
      arr[i] = arr[newInd];
      arr[newInd] = newVal;
      i = newInd;
    }
  }
}

module.exports = BinaryHeap;
