var QuickFind = require('../../lib/quickFind.js');
var h = require('../helpers.js');

var test = require('tape');
var _ = require('lodash');

test('QuickFind', function(t) {
  t.plan(6);

  t.test('valid values for n', function(u) {
    u.plan(3);

    u.throws(function() { return new QuickFind(-1); },
             new Error(),
             'Throws error if n is less than 0');
  
    u.throws(function() { return new QuickFind(1.1); },
             new Error(),
             'Throws error if n is not an integer');

    u.doesNotThrow(function() { return new QuickFind(0); },
                   new Error(),
                   'integer 0 is a valid value for n');
  });

  var obj = new QuickFind(5);

  t.test('#ids', function(u) {
    u.plan(3);
    u.ok(_.isArray(obj.ids), '#ids is an array');
    u.equal(obj.ids.length, 5, '#ids has a length of 5');
    u.ok(h.areTwoArraysEqual(obj.ids, [0,1,2,3,4]), 'produces this array');
  });

  t.test('#count', function(u) {
    u.plan(1);
    u.equal(obj.count, 5, 'returns 5');
  });

  t.test('#connected', function(u) {
    u.plan(2);
    u.ok(_.isFunction(obj.connected), 'there is a function named #connected');
    u.notOk(obj.connected(1,2), 'objects 1 & 2 are not connected');
  });

  t.test('#union', function(u) {
    u.plan(3);
    u.ok(_.isFunction(obj.union), 'there is a function named #union');
    console.log('about to perform union(1, 2)');
    obj.union(1,2);
    u.ok(h.areTwoArraysEqual(obj.ids, [0,2,2,3,4]), 'moves 2 under 1');
    console.log('about to perform union(0, 4)');
    obj.union(0,4);
    u.ok(h.areTwoArraysEqual(obj.ids, [4,2,2,3,4]), 'moves 0 under 4');
  });

  t.test('combining these methods', function(u) {
    u.plan(8);

    var anotherObj = new QuickFind(10);

    u.ok(
      h.areTwoArraysEqual(anotherObj.ids, [0,1,2,3,4,5,6,7,8,9]),
      'instantiating an object with n of 10, produces this array'
    );

    u.equal(anotherObj.count, 10, 'before a union operation, has count of 10');

    console.log('about to perform union(9, 7)');
    anotherObj.union(9, 7);

    u.equal(anotherObj.count, 9, 'after a union operation, has count of 9');

    u.ok(
      h.areTwoArraysEqual(anotherObj.ids, [0,1,2,3,4,5,6,7,8,7]),
      'moves 9 under 7'
    );

    u.ok(
      anotherObj.connected(7, 9),
      'nodes 7 & 9 are connected'
    );

    u.notOk(
      anotherObj.connected(2, 8),
      'nodes 2 & 8 are not connected'
    );

    console.log('about to perform a bunch more union operations...');
    anotherObj.union(9, 5);
    anotherObj.union(4, 5);
    anotherObj.union(8, 7);
    anotherObj.union(3, 8);
    anotherObj.union(7, 0);

    u.ok(
      h.areTwoArraysEqual(anotherObj.ids, [0,1,2,0,0,0,6,0,0,0]),
      'after all these moves, produces this array'
    );

    u.equal(anotherObj.count, 4, 'after union operations, has count of 4');
  });

});
