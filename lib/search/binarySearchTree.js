var ts = require('total-sorta');
var inherits = require('inherits');

var SymbolTable = require('../data-structures/symbolTable.js');
// A queue is used internally for breadth-first traversal
var Queue = require('../data-structures/queue.js').QueueLL;

inherits(BinarySearchTree, SymbolTable);

function BinarySearchTree() {
  this.root = null;
  SymbolTable.call(this);
}

/**
 * Returns the node containing the key.
 * Or returns null if it's not found.
 * @param key, the key to search for
 * @return, the node with the key, or null.
 */
BinarySearchTree.prototype.get = function(key) {
  var x = this.root;

  while(x !== null) {
    var cmp = ts.compare(key, x.key);

    if (cmp < 0) {
      x = x.left;
    } else if (cmp > 0) {
      x = x.right;
    } else {
      return x;
    }
  }

  return null;
};

/**
 * Associates a value with a key
 * @param key, the key to assign to the node
 * @param val, the value to assign to the node
 */
BinarySearchTree.prototype.put = function(key, val) {
  this.root = put_r(this.root, key, val);

  /**
   * Inserts a node in a tree by searching for the key & then inserting where
   * the search returns null.
   * Also, increment the `count` property on each node as it's touched
   * @param x, a reference to the root of a tree
   * @param key, the key to assign to the node
   * @param val, the value to assign to the node
   */
  function put_r(x, key, val) {
    if (x === null) { return new El(key, val); }

    var cmp = ts.compare(key, x.key);

    if (cmp < 0) {
      x.left  = put_r(x.left,  key, val);
    } else if (cmp > 0) {
      x.right = put_r(x.right, key, val);
    } else {
      x.val = val;
    }

    // sum of itself, plus count of nodes on both sides.
    x.count = 1 + size(x.left) + size(x.right);
    return x;
  }
};

/**
 * Delete a node from the tree by its key
 * If the node has 2 children, its replacement node is the next largest node.
 *   IOW: the node with smallest key in the right subtree (take the ceiling of
 *   the key in the node to delete).
 * 1. save link to node to be deleted `t`
 * 2. set `x` to point to successor min(t.right)
 * 3. set right link of `x` (which points to all keys larger than `x`), to
 * `deleteMin(t.right)`, which is the link to BST containing all keys larger
 * than `x` after the deletion.
 * 4. set left link of `x` (used to be null) to `t.left`. (all the keys that are
 * less than deleted key and less than its successor)
 *
 * Update count of each node via tail recursion...
 */
BinarySearchTree.prototype.delete = function(key) {
  delete_r(this.root, key);

  function delete_r(x, key) {
    if (x === null) return x;

    var cmp = ts.compare(key, x.key);

    if (cmp < 0) {
      x.left  = delete_r(x.left,  key);
    } else if (cmp > 0) {
      x.right = delete_r(x.right, key);
    } else {
      if (x.right === null) return x.left;
      if (x.left  === null) return x.right;

      // replace with successor
      var t = x; // save reference to node to delete
      // set new values for current node, `x`
      x = min_r(t.right);
      // delete minimum value in right subtree of `t`, set the parent of the
      // right subtree's minimum value (the one you will delete in call to
      // `deleteMin`)
      x.right = deleteMin_r(t.right);
      x.left  = t.left;
    }

    // decrement count of nodes underneath each touched subtree
    x.count = size(x.left) + size(x.right) + 1;
    return x;
  }

  // get minimum node, starting at `el`
  function min_r(el) {
    return (el.left === null ? el : min_r(el.left));
  }

  // delete node with smallest key, starting at `el`
  // returns a reference to the deleted node's parent?
  function deleteMin_r(el) {
    if (el.left === null) { return el.right; }
    el.left = deleteMin_r(el.left);
    el.count = size(el.left) + size(el.right) + 1;
    return el;
  }
};

// Return minimum key
BinarySearchTree.prototype.min = function() {
  // go left until you hit null
  var cursor = this.root;
  if (cursor === null) return cursor;
  while (cursor.left !== null) {
    cursor = cursor.left;
  }
  return cursor.key;
};

// Return maximum key
BinarySearchTree.prototype.max = function() {
  // go right until you hit null
  var cursor = this.root;
  if (cursor === null) return cursor;
  while (cursor.right !== null) {
    cursor = cursor.right;
  }
  return cursor.key;
};

// Delete the node with minimum key
BinarySearchTree.prototype.deleteMin = function() {
  var parentOfMin;

  // Find min node by going left until you hit null.
  // Not using '#min' because that only returns the key, I need the whole node.
  function getMin(root) {
    var cursor = root;
    if (cursor === null) return cursor;
    while (cursor.left !== null) {
      // just before finding min, save reference to its parent
      if (cursor.left.left === null) { parentOfMin = cursor; }
      // decrement counts of current node (decrement by assigning one less than
      // this class' usual operation for incrementing by 1)
      cursor.count = size(cursor.left) + size(cursor.right);
      cursor = cursor.left;
    }
    return cursor;
  }

  var min = getMin(this.root);

  // replace the link to the minimum with its right link
  parentOfMin.left = min.right;
};

// Delete the node with maximum key
BinarySearchTree.prototype.deleteMax = function() {
  var parentOfMax;

  // Find max node by going right until you hit null.
  // Not using '#max' because that only returns the key, I need the whole node.
  function getMax(root) {
    var cursor = root;
    if (cursor === null) return cursor;
    while (cursor.right !== null) {
      // just before finding max, save reference to its parent
      if (cursor.right.right === null) { parentOfMax = cursor; }
      // decrement counts of current node (decrement by assigning one less than
      // this class' usual operation for incrementing by 1)
      cursor.count = size(cursor.left) + size(cursor.right);
      cursor = cursor.right;
    }
    return cursor;
  }

  var max = getMax(this.root);

  // replace the link to the maximum with its left link
  parentOfMax.right = max.left;
};

// Perform an inorder traversal to collect all keys
BinarySearchTree.prototype.keys = function(lo, hi) {
  var keys = [];

  keys_r(this.root);

  function keys_r(root) {
    if (root !== null) {
      // visit all keys to left
      keys_r(root.left);
      // visit the root
      keys.push(root.key);
      // visit all keys to right
      keys_r(root.right);
    }
  }

  hi = (typeof hi == 'undefined' ? keys.length : hi);
  lo = (typeof lo == 'undefined' ? 0 : lo);

  return keys.slice(lo, hi + 1);
};

// Returns the largest key <= to the given key
BinarySearchTree.prototype.floor = function(key) {
  var x = floor_r(this.root, key);

  return (x === null ? x : x.key);

  function floor_r(root, key) {
    if (root === null) return root;

    var cmp = ts.compare(key, root.key);

    if (cmp < 0) {
      // If given key is < root's key, then go left.
      return floor_r(root.left, key);
    } else if (cmp > 0) {
      // Then explore right side.
      // If the result is NOT null,
      //   then return the result (from some previous stack frame).
      // If it is null, then return the current root.
      var t = floor_r(root.right, key);
      return (t !== null ? t : root);
    } else {
      // If they are equal, then return current root.
      return root;
    }
  }
};

// Returns the smallest key >= to the given key
BinarySearchTree.prototype.ceiling = function(key) {
  var x = ceiling_r(this.root, key);

  return (x === null ? x : x.key);

  function ceiling_r(root, key) {
    if (root === null) return root;

    var cmp = ts.compare(key, root.key);

    if (cmp > 0) {
      // If given key is > root's key, then go right.
      return ceiling_r(root.right, key);
    } else if (cmp < 0) {
      // Then explore left side.
      // If the result is NOT null,
      //   then return the result (from some previous stack frame).
      // If it is null, then return the current root.
      var t = ceiling_r(root.left, key);
      return (t !== null ? t : root);
    } else {
      // If they are equal, then return current root.
      return root;
    }
  }
};

/**
 * How many keys are less than the current key?
 *   IOW: how many keys are in this tree's left sub-tree?
 */
BinarySearchTree.prototype.rank = function(key) {
  return rank_r(this.root, key);

  function rank_r(root, key) {
    if (root === null) return root;

    var cmp = ts.compare(key, root.key);

    if (cmp < 0) {
      // then go left & return rank of key in left subtree
      return rank_r(root.left, key);
    } else if (cmp > 0) {
      //  count of nodes in left subtree +
      //             1 (the current key) +
      //    rank of key on right subtree
      return size(root.left) + 1 + rank_r(root.right, key);
    }  else {
      // return count of nodes on left side
      return size(root.left);
    }
  }
};

// Returns a key of a given rank
BinarySearchTree.prototype.select = function(rank) {
  // early returns for out-of-bounds input
  if (rank < 0 || rank >= size(this.root)) {
    return null;
  }

  return select_r(this.root, rank);

  function select_r(root, rank) {
    if (root === null) return root;

    // get # of keys to left because we're interested in keys < current key
    var t = size(root.left);
    var cmp = ts.compare(rank, t);

    if (cmp < 0) {
      // if given rank is smaller than `t`, then go to left subtree
      return select_r(root.left, rank);
    } else if (cmp > 0) {
      // if the given rank is larger than `t`,
      // then go to right subtree to get a rank of (rank - `t` - 1)
      return select_r(root.right, (rank - t - 1));
    } else {
      return root.key;
    }
  }
};

/**
 * Traverse nodes in some order. pre-order, in-order, post-order, breadth-first.
 * @param opt, an object with an 'order' key with one of these values:
 *   'preOrder', 'postOrder', 'inOrder', 'breadthFirst'
 * @return, an array of keys in the traversal order
 */
BinarySearchTree.prototype.traverse = function(opt) {
  var keys = [];
  var order = opt && opt.order;

  switch (order) {
    case 'preOrder':
      // root, left children, right children
      function preOrder(root) {
        if (root !== null) {
          keys.push(root.key);
          preOrder(root.left);
          preOrder(root.right);
        }
      }
      preOrder(this.root);
      break;
    case 'inOrder':
      // left children, root, right children
      function inOrder(root) {
        if (root !== null) {
          inOrder(root.left);
          keys.push(root.key);
          inOrder(root.right);
        }
      }
      inOrder(this.root);
      break;
    case 'postOrder':
      // left children, right children, root
      function postOrder(root) {
        if (root !== null) {
          postOrder(root.left);
          postOrder(root.right);
          keys.push(root.key);
        }
      }
      postOrder(this.root);
      break;
    case 'breadthFirst':
      keys = breadthFirst(this.root);
      break;
  }
  return keys;
};

/**
 * Perform a bread-first traversal. For each level, go left to right.
 * Uses an internal queue to track BST nodes. You can access the BST node via
 * the `data` property of a node in the queue.
 * @param root, the place in the tree to start
 * @return, an array of keys, in the order visited
 */
function breadthFirst(root) {
  // early return if tree is empty
  if (root === null) { return null; }

  var queue = new Queue();
  var keys = []; // collect keys here

  queue.enqueue(root);

  while(!queue.isEmpty()) {
    // the `data` property in the queue's node has the entire BST node
    var cursor = queue.dequeue().data;
    keys.push(cursor.key);
    if (cursor.left !== null)  { queue.enqueue(cursor.left); }
    if (cursor.right !== null) { queue.enqueue(cursor.right); }
  }

  return keys;
}

// Report the count property on a node, as long as the node is not null.
function size(x) {
  return (x === null ? 0 : x.count);
}

/**
 * `el` constructor.
 * An inner class, used in binary search tree implementations.
 * @param key, [String], key
 * @param val, [String], the string data to store in this element
 */
function El(key, val) {
  this.key = key;
  this.val = val;
  this.left = null;
  this.right = null;
  // number of nodes underneath the subtree rooted at this node including itself
  this.count = 1;
}

module.exports = BinarySearchTree;
