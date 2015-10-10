var assert = require('assert');

var RedBlackTree = require('../../').search.RedBlackTree;
var sharedStuff = require('./_redBlackTree_sharedStuff.js');

describe('RedBlackTree', function () {

  // These are templates of mocks for comparing nodes in the tree.
  // They're passed in to the `generateThreeNode` helper method.
  var baseNodeA = {
    key: 'ambient',
    val: 'anvil',
    left: null,
    right: null,
    count: 1,
    color: false
  };
  var baseNodeB = {
    key: 'bluegrass',
    val: 'banjo',
    left: null,
    right: null,
    count: 1,
    color: false
  };
  var baseNodeC = {
    key: 'cool jazz',
    val: 'clarinet',
    left: null,
    right: null,
    count: 1,
    color: false
  };

  describe('the root', function() {
    var rbt = new RedBlackTree();
    it('by default, has a root node of null', function() {
      assert.equal(rbt.root, null);
    });
  });

  describe('#get', function() {
    var rbt = new RedBlackTree();
    it('returns the node', function() {
      rbt.put('bluegrass', 'banjo');
      assert.deepEqual(rbt.get('bluegrass'), baseNodeB);
    });
    it('returns null when key is not in any node in the tree', function() {
      assert.equal(rbt.get('not here mate'), null);
    });
  });

  describe('#put', function() {

    context('adding a root node', function() {
      var rbt = new RedBlackTree();
      it('adds the root to a tree', function() {
        rbt.put('cool jazz', 'clarinet');
        assert.deepEqual(rbt.root, baseNodeC);
      });
      it('link to potential parent is black, not red', function() {
        assert.equal(rbt.root.color, false);
      });
    });

    context('inserting into a 2-node', function() {

      context('to the left of root', function() {

        var rbt = new RedBlackTree();
        var mockA = sharedStuff.generateThreeNode(baseNodeA);
        var mockB = sharedStuff.generateThreeNode(baseNodeB);

        before('add the root', function() {
          rbt.put('bluegrass', 'banjo');
        });

        context('before adding a node', function() {
          it('this is the root', function() {
            assert.deepEqual(rbt.root, mockB);
          });
        });

        context('adding a node', function() {
          it('adds a 2nd node', function() {
            rbt.put('ambient', 'anvil');
          });
        });

        context('after adding a node', function() {
          before('update mock nodes', function() {
            mockB.left = mockA;
            mockB.count = 2;
            mockA.color = true;
          });
          it('this is the updated root node', function() {
            assert.deepEqual(rbt.root, mockB);
          });
        });

      });

      context('when root key is less than key of new node', function() {

        var rbt = new RedBlackTree();
        var mockA = sharedStuff.generateThreeNode(baseNodeA);
        var mockB = sharedStuff.generateThreeNode(baseNodeB);

        before('add the root', function() {
          rbt.put('ambient', 'anvil');
        });

        context('before adding a node', function() {
          it('this is the root node', function() {
            assert.deepEqual(rbt.root, mockA);
          });
        });

        context('adding a node', function() {
          it('adds a 2nd node', function() {
            rbt.put('bluegrass', 'banjo');
          });
        });

        context('after adding a node', function() {
          before('update mock nodes', function() {
            mockB.left = mockA;
            mockB.count = 2;
            mockA.color = true;
          });
          it('this is the updated root node', function() {
            assert.deepEqual(rbt.root, mockB);
          });
        });
      });

    });

    context('inserting into a 3-node', function() {

      context('when new node is larger than both nodes', function() {

        var rbt = new RedBlackTree();

        before('add a 3-node at root', function() {
          rbt.put('bluegrass', 'banjo');
          rbt.put('ambient', 'anvil');
        });

        context('before adding a new node', function() {
          var nodeB = sharedStuff.generateThreeNode(baseNodeB);
          var nodeA = sharedStuff.generateThreeNode(baseNodeA);

          before('update test copies', function() {
            nodeB.left = nodeA;
            nodeB.count = 2;
            nodeA.color = true;
          });
          it('this is the higher node in the 3-node', function() {
            assert.deepEqual(rbt.root, nodeB);
          });
          it('this is the lower node in the 3-node', function() {
            assert.deepEqual(rbt.root.left, nodeA);
          });
        });

        context('adding a node', function() {
          it('adds a new node higher than both nodes', function() {
            rbt.put('cool jazz', 'clarinet');
          });
        });

        context('after adding the node', function() {
          sharedStuff.expectedOutcomes(rbt);
        });
      });

      context('when new node is smaller than both nodes', function() {

        var rbt = new RedBlackTree();

        before('add a 3-node at root', function() {
          rbt.put('bluegrass', 'banjo');
          rbt.put('cool jazz', 'clarinet');
        });

        context('before adding a new node', function() {
          var nodeC = sharedStuff.generateThreeNode(baseNodeC);
          var nodeB = sharedStuff.generateThreeNode(baseNodeB);

          before('update test copies', function() {
            nodeC.left = nodeB;
            nodeC.count = 2;
            nodeB.color = true;
          });
          it('this is the higher node in the 3-node', function() {
            assert.deepEqual(rbt.root, nodeC);
          });
          it('this is the lower node in the 3-node', function() {
            assert.deepEqual(rbt.root.left, nodeB);
          });
        });

        context('adding a node', function() {
          it('adds a new node higher than both nodes', function() {
            rbt.put('ambient', 'anvil');
          });
        });

        context('after adding the node', function() {
          sharedStuff.expectedOutcomes(rbt);
        });
      });

      context('when new node is in between both nodes', function() {

        var rbt = new RedBlackTree();
        before('add a 3-node at root', function() {
          rbt.put('ambient', 'anvil');
          rbt.put('cool jazz', 'clarinet');
        });

        context('before adding a new node', function() {
          var nodeC = sharedStuff.generateThreeNode(baseNodeC);
          var nodeA = sharedStuff.generateThreeNode(baseNodeA);
          before('update test copies', function() {
            nodeC.left = nodeA;
            nodeC.count = 2;
            nodeA.color = true;
          });
          it('this is the higher node in the 3-node', function() {
            assert.deepEqual(rbt.root, nodeC);
          });
          it('this is the lower node in the 3-node', function() {
            assert.deepEqual(rbt.root.left, nodeA);
          });
        });

        context('adding a node', function() {
          it('adds a new node higher than both nodes', function() {
            rbt.put('bluegrass', 'banjo');
          });
        });

        context('after adding the node', function() {
          sharedStuff.expectedOutcomes(rbt);
        });

      });

    });

  });
});
