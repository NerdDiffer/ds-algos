var assert = require('assert');
var IST = require('../../').search.IntervalSearchTree;
var generateMockNode = require('./_generateMockNode.js');

describe('IntervalSearchTree', function() {

  /**
   * Templates for mock nodes.
   * If you inserted them in this order:
   *   (17, 19) (5, 8) (21, 24) (4, 8) (15, 18) (7, 10) (16, 22)
   * then it would look like this:
   *
   *         (17, 19)
   *         /      \
   *     (5, 8)     (21, 24)
   *     /    \
   * (4, 8)  (15, 18)
   *         /      \
   *     (7, 10)   (16, 22)
   */
  var baseNode16 = {
    lo: 16,
    hi: 22,
    val: '',
    left: null,
    right: null,
    max: 22
  };
  var baseNode7 = {
    lo: 7,
    hi: 10,
    val: '',
    left: null,
    right: null,
    max: 10
  };
  var baseNode15 = {
    lo: 15,
    hi: 18,
    val: '',
    left: baseNode7,
    right: baseNode16,
    max: 22
  };
  var baseNode4 = {
    lo: 4,
    hi: 8,
    val: '',
    left: null,
    right: null,
    max: 8
  };
  var baseNode5 = {
    lo: 5,
    hi: 8,
    val: '',
    left: baseNode4,
    right: baseNode15,
    max: 22
  };
  var baseNode21 = {
    lo: 21,
    hi: 24,
    val: '',
    left: null,
    right: null,
    max: 24
  };
  var baseNode17 = {
    lo: 17,
    hi: 19,
    val: '',
    left: baseNode5,
    right: baseNode21,
    max: 24
  };

  describe('#put', function() {
    context('inserting all mock nodes', function() {
      // all asserts look at the same tree
      var ist = new IST();

      context('inserting node (17, 19)', function() {
        // each context block has its own copy of base node
        var mock17 = generateMockNode(baseNode17);
        before('modify the mock node', function() {
          ist.put(17, 19, '');
          // update mocks in the 'before' blocks, but only the important parts
          // you suspect will change between calls to #put
          mock17.left = null;
          mock17.right = null;
          mock17.max = 19;
        });
        it('after insertion, here is the root node', function() {
          assert.deepEqual(ist.root, mock17);
        });
      });

      context('inserting node (5, 8)', function() {
        var mock5  = generateMockNode(baseNode5);
        before('insert the two nodes & modify mocks', function() {
          ist.put(5, 8, '');
          mock5.left = null;
          mock5.right = null;
          mock5.max = 8;
        });
        it('after insertion, here is the new node', function() {
          assert.deepEqual(ist.root.left, mock5);
        });
        it('the max of the new node is 8', function() {
          assert.equal(ist.root.left.max, 8);
        });
      });

      context('inserting node (21, 24)', function() {
        var mock17 = generateMockNode(baseNode17);
        var mock21 = generateMockNode(baseNode21);
        before('insert one & modify mocks', function() {
          ist.put(21, 24, '');
          mock17.right = mock21;
          mock17.max = 24;
        });
        it('after insertion, this node is at root.right', function() {
          assert.deepEqual(ist.root.right, mock21);
        });
        it('after insertion, root.max is updated', function() {
          assert.equal(ist.root.max, 24);
        });
      });

      context('inserting node (4, 8)', function() {
        var mock17 = generateMockNode(baseNode17);
        var mock5  = generateMockNode(baseNode5);
        var mock4  = generateMockNode(baseNode4);
        before('insert one & modify mocks', function() {
          ist.put(4, 8, '');
          mock5.right = null; // right is not added yet
          mock5.max = 8;
        });
        it('after insertion, here is the new node', function() {
          assert.deepEqual(ist.root.left.left, mock4);
        });
      });

      context('inserting node (15, 18)', function() {
        var mock17 = generateMockNode(baseNode17);
        var mock5  = generateMockNode(baseNode5);
        var mock15 = generateMockNode(baseNode15);
        before('insert one & modify mocks', function() {
          ist.put(15, 18, '');
          mock15.left = null; // new node's left child not added yet
          mock15.right = null; // new node's right child not added yet
          mock15.max = 18;
        });
        it('after insertion, the max of parent of new node is 18', function() {
          assert.equal(ist.root.left.max, 18);
        });
        it('after insertion, here is the new node', function() {
          assert.deepEqual(ist.root.left.right, mock15);
        });
      });

      context('inserting node (7, 10)', function() {
        var mock7 = generateMockNode(baseNode7);
        before('insert one & modify mocks', function() {
          ist.put(7, 10, '');
        });
        it('after insertion, here is the new node', function() {
          assert.deepEqual(ist.root.left.right.left, mock7);
        });
      });

      context('inserting node (16, 22)', function() {
        var mock16 = generateMockNode(baseNode16);
        before('insert one & modify mocks', function() {
          ist.put(16, 22, '');
        });
        it('after insertion, here is the new node', function() {
          assert.deepEqual(ist.root.left.right.right, mock16);
        });
        it('it updates the max on the parent', function() {
          assert.deepEqual(ist.root.left.right.max, 22);
        });
        it('it also updates the max of the parent of the parent', function() {
          assert.deepEqual(ist.root.left.max, 22);
        });
      });

    });

  });

  describe('#get', function() {
    var ist = new IST();
    before('populate the tree', function() {
      ist.put(17, 19, '');
      ist.put(5, 8, '');
      ist.put(21, 24, '');
      ist.put(4, 8, '');
      ist.put(15, 18, '');
      ist.put(7, 10, '');
      ist.put(16, 22, '');
    });
    it('verifies root', function() {
      // A quick way to verify correctness? Well, as long as the mocks are
      // set up like the nodes in the lecture, this will work...
      assert.deepEqual(ist.get(17, 19), baseNode17);
    });
    context('intersection present', function() {
      // When the query interval intersects with an interval in the tree...
      it('returns the intersecting node', function() {
        assert.deepEqual(ist.get(23, 25), baseNode21);
      });
    });
    context('no intersection available', function() {
      // When query interval does NOT intersect any intervals in tree...
      it('returns null', function() {
        assert.deepEqual(ist.get(12, 14), null);
      });
    });
  });

  describe('#getAll', function() {
    var ist = new IST();
    before('populate the tree', function() {
      ist.put(17, 19, '');
      ist.put(5, 8, '');
      ist.put(21, 24, '');
      ist.put(4, 8, '');
      ist.put(15, 18, '');
      ist.put(7, 10, '');
      ist.put(16, 22, '');
    });
    it('returns all intersecting intervals for a given point', function() {
      var intersections = [
        [17,19], [15,18], [16,22]
      ];
      assert.deepEqual(ist.getAll(16, 22), intersections);
    });
  });

  describe('.overlaps', function() {
    var lohi = [9, 16];
    it('returns true when two intervals overlap', function() {
      assert( IST.overlaps(lohi, [7, 10]));
    });
    it('returns true when two intervals overlap', function() {
      assert( IST.overlaps(lohi, [15, 18]));
    });
    it('returns false when two intervals do not overlap', function() {
      assert(!IST.overlaps(lohi, [4, 8]));
    });
    it('returns false when two intervals do not overlap', function() {
      assert(!IST.overlaps(lohi, [5, 8]));
    });
    it('returns false when two intervals do not overlap', function() {
      assert(!IST.overlaps(lohi, [17, 19]));
    });
    it('returns false when two intervals do not overlap', function() {
      assert(!IST.overlaps(lohi, [21, 24]));
    });
  });
});
