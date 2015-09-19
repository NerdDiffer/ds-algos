function LinkedList() {
  this.head = null;
}

/**
 * Add an item to the end of a linked list
 * @param val, the value to add to the item
 */
LinkedList.prototype.push = function(val) {

  var e = new El(val);

  if (this.isEmpty()) {
    this.head = e;
    return;
  } else {
    // find last item...point its next property to new item
    var tail = this.findLast();
    tail.next = e;
  }
};

/**
 * Remove an item from end of a linked list
 * @return, the recently removed item
 */
LinkedList.prototype.pop = function() {

  if (this.isEmpty()) { return null; }

  var penultimate = this.findPenultimate();

  var tail = penultimate.next;
  penultimate.next = null; // the penultimate node is now the ultimate node
  return tail;             // traditionally, the removed element is returned

  function findPenultimate() {
  }
};

/**
 * Add an item to the beginning of a linked list
 * @param val, the value to add to the item
 */
LinkedList.prototype.unshift = function(val) {
  var oldHead = this.head;
  this.head = new El(val);
  this.head.next = oldHead;
};

/**
 * Remove an item from the beginning of a linked list
 * @return, the recently removed item
 */
LinkedList.prototype.shift = function() {
  var oldHead = this.head;
  this.head = this.head.next;
  return oldHead;
};

LinkedList.prototype.isEmpty = function() {
  return this.head === null;
};

LinkedList.prototype.size = function() {
  if (this.isEmpty()) { return 0; }

  var n = 1;
  var c = this.head;

  while(c.next !== null) {
    c = c.next;
    n++;
  }

  return n;
};

LinkedList.prototype.each = function(fn) {
  fn = (typeof fn !== 'function') ? console.log : fn;

  var c = this.head;

  while(c !== null) {
    fn(c);
    c = c.next;
  }
};

LinkedList.prototype.findPenultimate = function() {
  var c = this.head;

  if (this.isEmpty()) { return c; }

  while (c.next.next !== null) {
    c = c.next;
  }
  return c;
};

LinkedList.prototype.findLast = function() {
  var c = this.head;

  if (this.isEmpty()) { return c; }

  while (c.next !== null) {
    c = c.next;
  }

  return c;
};

/**
 * `el` constructor.
 * An 'inner class', usually used in linked list implementations.
 * @param val, [String] the string data to store in this element
 */
function El (val) {
  this.val = val;
  this.next = null;
}

module.exports = LinkedList;
