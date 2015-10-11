var assert = require('assert');
var BST    = require('../../').search.BinarySearchTree;

describe('BinarySearchTree', function() {

  describe('the root', function() {
    var bst = new BST();
    it('has a root node of null', function() {
      assert.equal(bst.root, null);
    });
  });

  describe('#put', function() {
    var bst = new BST();
    it('adds a node to a tree', function() {
      var expected = {
        key: 'kingston',
        val: 'velociraptor',
        left: null,
        right: null,
        count: 1
      };
      bst.put('kingston', 'velociraptor');
      assert.deepEqual(bst.root, expected);
    });
    context('after adding 2 more nodes', function() {
      before('add some nodes', function() {
        bst.put('japan', 'wallaby');
        bst.put('lancaster', 'urchin');
      });
      it('the root has a count of 3', function() {
        // itself plus 2 child nodes
        assert.equal(bst.root.count, 3);
      });
      it('the root has this left node', function() {
        var leftNode = {
          key: 'japan',
          val: 'wallaby',
          left: null,
          right: null,
          count: 1
        };
        assert.deepEqual(bst.root.left, leftNode);
      });
      it('the root has this right node', function() {
        var rightNode = {
          key: 'lancaster',
          val: 'urchin',
          left: null,
          right: null,
          count: 1
        };
        assert.deepEqual(bst.root.right, rightNode);
      });
    });
  });

  describe('#get', function() {
    var bst = new BST();
    it('returns the node', function() {
      var expected = {
        key: 'key',
        val: 'val',
        left: null,
        right: null,
        count: 1
      };
      bst.put('key', 'val');
      assert.deepEqual(bst.get('key'), expected);
    });
    it('returns null when key is not in any node in the tree', function() {
      assert.equal(bst.get('not here mate'), null);
    });
  });

  describe('#delete', function() {

    context('removing a node with no children', function() {
      var bst = new BST();
      var pathToParent;
      var pathToTarget;
      before('insert some nodes', function() {
        bst.put(5, 'five');
        bst.put(2, 'two');
        bst.put(1, 'one');
        bst.put(8, 'eight');
        bst.put(4, 'four');
        pathToParent = bst.root.left;
        pathToTarget = bst.root.left.right;
      });

      context('before removal', function() {
        it('target node has key of 4', function() {
          assert.equal(pathToTarget.key, 4);
        });
        it('target node has no left child', function() {
          assert.equal(pathToTarget.left, null);
        });
        it('target node has no right child', function() {
          assert.equal(pathToTarget.right, null);
        });
        it('parent node points to the target node', function() {
          assert.equal(pathToParent.right.key, 4);
        });
        it('tree root has a count of 5', function() {
          assert.equal(bst.root.count, 5);
        });
      });

      context('removal', function() {
        it('removes the node', function() {
          bst.delete(4);
          assert.equal(bst.get(4), null);
        });
      });

      context('after removal', function() {
        it('parent node now points to null', function() {
          assert.equal(pathToParent.right, null);
        });
        it('tree root now has a count of 4', function() {
          assert.equal(bst.root.count, 4);
        });
      });

    });

    context('removing a node with 1 child', function() {
      var bst = new BST();
      var pathToParent;
      var pathToTarget;
      before('insert some nodes', function() {
        bst.put(5, 'five');
        bst.put(2, 'two');
        bst.put(1, 'one');
        bst.put(8, 'eight');
        pathToParent = bst.root;
        pathToTarget = bst.root.left;
      });

      context('before removal', function() {
        it('target node has a key of 2', function() {
          assert.equal(pathToTarget.key, 2);
        });
        it('target node has a left child with key 1', function() {
          assert.equal(pathToTarget.left.key, 1);
        });
        it('target node has no right child', function() {
          assert.equal(pathToTarget.right, null);
        });
        it('parent node points to the target node', function() {
          assert.equal(pathToParent.left.key, 2);
        });
        it('tree root has a count of 4', function() {
          assert.equal(bst.root.count, 4);
        });
      });

      context('removal', function() {
        it('removes the node', function() {
          bst.delete(2);
          assert.equal(bst.get(2), null);
        });
      });

      context('after removal', function() {
        // `pathToTarget` still refers to the removed node. Assign the same
        // path taken to removed node to its replacement node.
        var pathToReplacement;
        before('set path to replacement', function() {
          pathToReplacement = bst.root.left;
        });
        it('replacement node has a key of 1', function() {
          assert.equal(pathToReplacement.key, 1);
        });
        it('replacement node has no left child', function() {
          assert.equal(pathToReplacement.left, null);
        });
        it('replacement node has no right child', function() {
          assert.equal(pathToReplacement.right, null);
        });
        it('the parent node now points to the replacement node', function() {
          assert.equal(pathToParent.left.key, 1);
        });
        it('tree root now has a count of 3', function() {
          assert.equal(bst.root.count, 3);
        });
      });
    });

    context('removing a node with 2 children', function() {

      var bst = new BST();
      var pathToParent;
      var pathToTarget;
      before('insert some nodes', function() {
        // a balanced tree, with depth of 3
        bst.put(5, 'five');
        bst.put(2, 'two');
        bst.put(1, 'one');
        bst.put(4, 'four');
        bst.put(8, 'eight');
        bst.put(7, 'seven');
        bst.put(9, 'nine');
        pathToParent = bst.root;
        pathToTarget = bst.root.right;
      });

      context('before removal', function() {
        it('target node has a key of 8', function() {
          assert.equal(pathToTarget.key, 8);
        });
        it('target node has a left child with key 7', function() {
          assert.equal(pathToTarget.left.key, 7);
        });
        it('target node has a right child with key 9', function() {
          assert.equal(pathToTarget.right.key, 9);
        });
        it('parent node points to the target node', function() {
          assert.equal(pathToParent.right.key, 8);
        });
        it('tree root has a count of 7', function() {
          assert.equal(bst.root.count, 7);
        });
      });
      context('removal', function() {
        it('removes the node', function() {
          bst.delete(8);
          assert.equal(bst.get(8), null);
        });
      });
      context('after removal', function() {
        // `pathToTarget` still refers to the removed node. Assign the same
        // path taken to removed node to its replacement node.
        var pathToReplacement;
        before('set path to replacement', function() {
          pathToReplacement = bst.root.right;
        });
        it('replacement node has a key of 9', function() {
          assert.equal(pathToReplacement.key, 9);
        });
        it('replacement node has left child with key of 7', function() {
          assert.equal(pathToReplacement.left.key, 7);
        });
        it('replacement node has no right child', function() {
          assert.equal(pathToReplacement.right, null);
        });
        it('parent node now points to the replacement node', function() {
          assert.equal(pathToParent.right.key, 9);
        });
        it('tree root now has a count of 6', function() {
          assert.equal(bst.root.count, 6);
        });
      });
    });
  });

  describe('#contains', function() {
    var bst = new BST();
    it('returns true if there is a value paired with the key', function() {
      bst.put('a', 'value of a');
      assert(bst.contains('a'));
    });
    it('returns false if there is not a value paired with the key', function() {
      assert(!bst.contains('b'));
    });
  });

  describe('#keys', function() {
    var bst = new BST();
    before('add some keys', function() {
      bst.put(30, '');
      bst.put(18, '');
      bst.put(99, '');
      bst.put(16, '');
      bst.put(42, '');
    });
    it('returns an array of all the keys in the table', function() {
      assert.deepEqual(bst.keys(), [16,18,30,42,99]);
    });
    it('returns a range of keys (inclusive) beginning to middle', function() {
      assert.deepEqual(bst.keys(0, 3), [16,18,30,42]);
    });
    it('returns a range of keys (inclusive) middle to end', function() {
      assert.deepEqual(bst.keys(1), [18,30,42,99]);
    });
    it('returns a range of keys (inclusive) middle to middle', function() {
      assert.deepEqual(bst.keys(1, 3), [18,30,42]);
    });
  });

  describe('#isEmpty', function() {
    it('returns true when there are no keys', function () {
      var bst = new BST();
      assert(bst.isEmpty());
    });
    it('returns false when there are some keys', function () {
      var bst = new BST();
      bst.put('a', 'value of a');
      bst.put('b', 'value of b');
      bst.put('c', 'value of c');
      assert(!bst.isEmpty());
    });
  });

  describe('#size', function() {
    var bst = new BST();
    bst.put('a', 'value of a');
    bst.put('b', 'value of b');
    bst.put('c', 'value of c');
    it('has a size of 3', function() {
      assert.equal(bst.size(), 3);
    });
  });

  describe('#min', function() {
    var bst = new BST();
    before('add some keys', function() {
      bst.put('c', '');
      bst.put('b', '');
      bst.put('a', '');
      bst.put('e', '');
      bst.put('d', '');
    });
    it('returns the smallest key', function() {
      assert.equal(bst.min(), 'a');
    });
    context('an empty tree', function() {
      var empty = new BST();
      it('returns null', function() {
        assert.equal(empty.min(), null);
      });
    });
  });

  describe('#max', function() {
    var bst = new BST();
    before('add some keys', function() {
      bst.put('c', '');
      bst.put('b', '');
      bst.put('a', '');
      bst.put('e', '');
      bst.put('d', '');
    });
    it('returns the largest key', function() {
      assert.equal(bst.max(), 'e');
    });
    context('an empty tree', function() {
      var empty = new BST();
      it('returns null', function() {
        assert.equal(empty.max(), null);
      });
    });
  });

  describe('#deleteMin', function() {
    // TODO: what about deleting a min with no children? The algorithm specifies
    // to remove the link to min by swapping the link to min with the right link
    // of the min.
    // Try this with very unbalanced trees. (ie: nodes inserted in order...)
    // TODO: what decrementing counts for each touched node?
    var bst = new BST();
    before('add some keys', function() {
      bst.put('e', '');
      bst.put('d', '');
      bst.put('c', '');
      bst.put('b', '');
      bst.put('a', '');
    });
    context('before deleting minimum key', function() {
      it('each node has this value for its count property', function() {
        assert.equal(bst.get('a').count, 1);
        assert.equal(bst.get('b').count, 2);
        assert.equal(bst.get('c').count, 3);
        assert.equal(bst.get('d').count, 4);
        assert.equal(bst.get('e').count, 5);
      });
      it('these nodes point to the right places', function() {
        assert.equal(bst.get('a').left, null);
        assert.equal(bst.get('b').left.key, 'a');
      });
      it('has a size of 5', function() {
        assert.equal(bst.size(), 5);
      });
      it('has a min of a', function() {
        assert.equal(bst.min(), 'a');
      });
    });
    context('deleting minimum key', function() {
      it('deletes the smallest key', function() {
        bst.deleteMin();
        assert.equal(bst.get('a'), null);
      });
    });
    context('after deleting minimum key', function() {
      it('each node has this value for its count property', function() {
        assert.equal(bst.get('b').count, 1);
        assert.equal(bst.get('c').count, 2);
        assert.equal(bst.get('d').count, 3);
        assert.equal(bst.get('e').count, 4);
      });
      it('now this node points to null', function() {
        assert.equal(bst.get('b').left, null);
      });
      it('has a size of 4', function() {
        assert.equal(bst.size(), 4);
      });
      it('now has a min of b', function() {
        assert.equal(bst.min(), 'b');
      });
    });
  });

  describe('#deleteMax', function() {
    // same as first TODO item from deleteMin, but switching sides
    // TODO: what decrementing counts for each touched node?
    var bst = new BST();
    before('add some keys', function() {
      bst.put('a', '');
      bst.put('b', '');
      bst.put('c', '');
      bst.put('d', '');
      bst.put('e', '');
    });
    context('before deleting maximum key', function() {
      it('each node has this value for its count property', function() {
        assert.equal(bst.get('e').count, 1);
        assert.equal(bst.get('d').count, 2);
        assert.equal(bst.get('c').count, 3);
        assert.equal(bst.get('b').count, 4);
        assert.equal(bst.get('a').count, 5);
      });
      it('these nodes point to the right places', function() {
        assert.equal(bst.get('e').right, null);
        assert.equal(bst.get('d').right.key, 'e');
      });
      it('has a size of 5', function() {
        assert.equal(bst.size(), 5);
      });
      it('has a max of e', function() {
        assert.equal(bst.max(), 'e');
      });
    });
    context('deleting maximum key', function() {
      it('deletes the largest key', function() {
        bst.deleteMax();
        assert.equal(bst.get('e'), null);
      });
    });
    context('after deleting maximum key', function() {
      it('each node has this value for its count property', function() {
        assert.equal(bst.get('d').count, 1);
        assert.equal(bst.get('c').count, 2);
        assert.equal(bst.get('b').count, 3);
        assert.equal(bst.get('a').count, 4);
      });
      it('now this node points to null', function() {
        assert.equal(bst.get('d').right, null);
      });
      it('has a size of 4', function() {
        assert.equal(bst.size(), 4);
      });
      it('now has a max of d', function() {
        assert.equal(bst.max(), 'd');
      });
    });
  });

  describe('#floor', function() {
    var bst = new BST();
    before('add some keys', function() {
      bst.put(30, 'thirty');
      bst.put(20, 'twenty');
      bst.put(10, 'ten');
      bst.put(50, 'fifty');
      bst.put(40, 'forty');
    });
    it('returns largest key <= a given key', function() {
      assert.equal(bst.floor(25), 20);
    });
    context('keys ranked lower than min key', function() {
      it('returns null', function() {
        assert.equal(bst.floor(9), null);
      });
    });
    context('keys matching some existing key', function() {
      it('returns the key', function() {
        assert.equal(bst.floor(30), 30);
      });
    });
  });

  describe('#ceiling', function() {
    var bst = new BST();
    before('add some keys', function() {
      bst.put(30, 'thirty');
      bst.put(20, 'twenty');
      bst.put(10, 'ten');
      bst.put(50, 'fifty');
      bst.put(40, 'forty');
    });
    it('returns smallest key >= a given key', function() {
      assert.equal(bst.ceiling(25), 30);
    });
    context('keys ranked higher than max key', function() {
      it('returns null', function() {
        assert.equal(bst.ceiling(51), null);
      });
    });
  });

  describe('#rank', function() {
    var bst = new BST();
    before('add some keys', function() {
      bst.put('S', '');
      bst.put('E', '');
      bst.put('A', '');
      bst.put('R', '');
      bst.put('C', '');
      bst.put('H', '');
      bst.put('M', '');
      bst.put('X', '');
    });
    context('for a key that is in table', function() {
      it('returns number of keys smaller than the given key', function() {
        assert.equal(bst.rank('S'), 6);
        assert.equal(bst.rank('E'), 2);
        assert.equal(bst.rank('A'), 0);
        assert.equal(bst.rank('R'), 5);
        assert.equal(bst.rank('C'), 1);
        assert.equal(bst.rank('H'), 3);
        assert.equal(bst.rank('M'), 4);
        assert.equal(bst.rank('X'), 7);
      });
    });
    context('for a key that is not in table', function() {
      it('confirms that the key is not in the table', function() {
        assert.equal(bst.get('D'), null);
      });
      it('returns number of keys smaller than given key', function() {
        assert.equal(bst.rank('D'), 2);
      });
    });
  });

  describe('#select', function() {
    var bst = new BST();
    before('add some keys', function() {
      bst.put('S', '');
      bst.put('E', '');
      bst.put('A', '');
      bst.put('R', '');
      bst.put('C', '');
      bst.put('H', '');
      bst.put('M', '');
      bst.put('X', '');
    });
    it('returns the key of a given rank', function() {
      assert.equal(bst.select(6), 'S');
      assert.equal(bst.select(2), 'E');
      assert.equal(bst.select(0), 'A');
      assert.equal(bst.select(5), 'R');
      assert.equal(bst.select(1), 'C');
      assert.equal(bst.select(3), 'H');
      assert.equal(bst.select(7), 'X');
      assert.equal(bst.select(4), 'M');
    });
    it('returns null when rank is out of bounds', function() {
      assert.equal(bst.select(-1), null);
    });
    it('returns null when rank is out of bounds', function() {
      assert.equal(bst.select(8), null);
    });
  });

  describe('#traverse', function() {
    var bst = new BST();
    before('populate tree', function() {
      bst.put(10, 'dieci');
      bst.put(6,  'sei');
      bst.put(14, 'quattordice');
      bst.put(8,  'otto');
      bst.put(4,  'quattro');
      bst.put(16, 'diecisei');
      bst.put(12, 'dodice');
    });
    context('pre-order traversal', function() {
      it('visits the nodes in pre-order', function() {
        var ord = [10,6,4,8,14,12,16];
        assert.deepEqual(bst.traverse({order: 'preOrder'}), ord);
      });
    });
    context('in-order traversal', function() {
      it('visits the nodes in-order', function() {
        var ord = [4,6,8,10,12,14,16];
        assert.deepEqual(bst.traverse({order: 'inOrder'}), ord);
      });
    });
    context('post-order traversal', function() {
      it('visits the nodes in post-order', function() {
        var ord = [4,8,6,12,16,14,10];
        assert.deepEqual(bst.traverse({order: 'postOrder'}), ord);
      });
    });
    context('breadth-first traversal', function() {
      it('visits the nodes level-by-level, left-to-right', function() {
        var ord = [10,6,14,4,8,12,16];
        assert.deepEqual(bst.traverse({order: 'breadthFirst'}), ord);
      });
    });
  });

});
