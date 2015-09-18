var assert = require('assert');

var twoStack = require('../../lib/misc/twoStack.js');

describe('Two-stack algorithm', function() {
  it('solves an expression with one digit integers', function() {
    var exp = '(1 + ((2 + 3) * (4 * 5)))';
    assert.equal(twoStack(exp), 101);
  });

  it('solves an expression with multiple-digit integers', function() {
    var exp = '(11 + ((2 + 3) * (4 * 50)))';
    assert.deepEqual(twoStack(exp), 1011);
  });
});
