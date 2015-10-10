var assert = require('assert');

var RedBlackTree = require('../../').search.RedBlackTree;
var sharedStuff = require('./_redBlackTree_sharedStuff.js');

describe('RedBlackTree', function () {
  describe('the root', function() {
    var rbt = new RedBlackTree();
    it('by default, has a root node of null', function() {
      assert.equal(rbt.root, null);
    });
  });

  describe('#get', function() {
    var rbt = new RedBlackTree();
    it('returns the node', function() {
      var expected = {
        key: 'klezmer',
        val: 'violin',
        left: null,
        right: null,
        count: 1,
        color: false // color of parent link
      };
      rbt.put('klezmer', 'violin');
      assert.deepEqual(rbt.get('klezmer'), expected);
    });
    it('returns null when key is not in any node in the tree', function() {
      assert.equal(rbt.get('not here mate'), null);
    });
  });

  describe('#put', function() {

    context('adding a root node', function() {
      var rbt = new RedBlackTree();
      it('adds the root to a tree', function() {
        var expected = {
          key: 'klezmer',
          val: 'violin',
          left: null,
          right: null,
          count: 1,
          color: false
        };
        rbt.put('klezmer', 'violin');
        assert.deepEqual(rbt.root, expected);
      });
      it('link to potential parent is black, not red', function() {
        assert.equal(rbt.root.color, false);
      });
    });

    context('inserting into a 2-node', function() {

      context('to the left of root', function() {
        var rbt = new RedBlackTree();
        before('add the root', function() {
          rbt.put('bebop', 'alto sax');
        });

        context('before adding a node', function() {
          var expectedRoot = {
            key: 'bebop',
            val: 'alto sax',
            left: null,
            right: null,
            count: 1,
            color: false
          };
          it('this is the root', function() {
            assert.deepEqual(rbt.root, expectedRoot);
          });
        });

        context('adding a node', function() {
          it('adds a 2nd node', function() {
            rbt.put('avant-garde', 'vuvuzuela');
          });
        });

        context('after adding a node', function() {
          var expectedLeftNode = {
            key: 'avant-garde',
            val: 'vuvuzuela',
            left: null,
            right: null,
            count: 1,
            color: true
          };
          var expectedRoot = {
            key: 'bebop',
            val: 'alto sax',
            left: expectedLeftNode,
            right: null,
            count: 2,
            color: false
          };
          it('this is the updated root node', function() {
            assert.deepEqual(rbt.root, expectedRoot);
          });
        });

      });

      context('when root key is less than key of new node', function() {

        var rbt = new RedBlackTree();
        before('add the root', function() {
          rbt.put('avant-garde', 'chime');
        });

        context('before adding a node', function() {
          var expectedRoot = {
            key: 'avant-garde',
            val: 'chime',
            left: null,
            right: null,
            count: 1,
            color: false
          };
          it('this is the root node', function() {
            assert.deepEqual(rbt.root, expectedRoot);
          });
        });

        context('adding a node', function() {
          it('adds a 2nd node', function() {
            rbt.put('bluegrass', 'steel-string guitar');
          });
        });

        context('after adding a node', function() {
          var expectedLeftNode = {
            key: 'avant-garde',
            val: 'chime',
            left: null,
            right: null,
            count: 1,
            color: true
          };
          var expectedRoot = {
            key: 'bluegrass',
            val: 'steel-string guitar',
            left: expectedLeftNode,
            right: null,
            count: 2,
            color: false
          };
          it('now, this is the root node', function() {
            assert.deepEqual(rbt.root, expectedRoot);
          });
        });
      });

    });

    context('inserting into a 3-node', function() {

      // These are templates of mocks for comparing nodes in the tree.
      // They're passed in to the `generateThreeNode` helper method.
      var baseNodeA = {
        key: 'ambient',
        val: '',
        left: null,
        right: null,
        count: 1,
        color: false
      };
      var baseNodeB = {
        key: 'bluegrass',
        val: '',
        left: null,
        right: null,
        count: 1,
        color: false
      };
      var baseNodeC = {
        key: 'cool jazz',
        val: '',
        left: null,
        right: null,
        count: 1,
        color: false
      };

      context('when new node is larger than both nodes', function() {

        var rbt = new RedBlackTree();

        before('add a 3-node at root', function() {
          rbt.put('bluegrass', '');
          rbt.put('ambient', '');
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
            rbt.put('cool jazz', '');
          });
        });

        context('after adding the node', function() {
          sharedStuff.expectedOutcomes(rbt);
        });
      });

      context('when new node is smaller than both nodes', function() {

        var rbt = new RedBlackTree();

        before('add a 3-node at root', function() {
          rbt.put('bluegrass', '');
          rbt.put('cool jazz', '');
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
            rbt.put('ambient', '');
          });
        });

        context('after adding the node', function() {
          sharedStuff.expectedOutcomes(rbt);
        });
      });

      context('when new node is in between than both nodes', function() {

        var rbt = new RedBlackTree();
        before('add a 3-node at root', function() {
          rbt.put('ambient', '');
          rbt.put('cool jazz', '');
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
            rbt.put('bluegrass', '');
          });
        });

        context('after adding the node', function() {
          sharedStuff.expectedOutcomes(rbt);
        });

      });

    });

  });
});
