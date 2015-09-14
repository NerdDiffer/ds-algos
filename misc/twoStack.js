/**
 * Implement Dijkstra's two-stack algorithm for solving infix expressions
 * ie: `(1 + ((2 + 3) * (4 * 5)))`
 */
var Stack = require('../').StackLL;
var assert = require('assert');

function doMath(nums, operator) {
  if (operator === '+') {
    return nums[0] + nums[1];
  } else if (operator === '-') {
    return nums[1] - nums[0];
  } else if (operator === '*') {
    return nums[0] * nums[1];
  } else if (operator === '/') {
    return nums[1] / nums[0];
  } else {
    return;
  }
}

var twoStack = function(exp) {
  // this could also be done with regular JS arrays...
  var numbers = new Stack();
  var operators = new Stack();
  var i = 0;

  var skip = /(\(|\s)/;     // match opening paren or a space
  var reNum = /(\d)+/;      // match at least one digit
  var reOps = /[\*\/\-\+]/; // match an arithmetic operator

  while (i < exp.length) {
    if (skip.test(exp[i])) {
      i++; // ignore
    } else if (reNum.test(exp[i])) {
      // Grab as many numbers as you can from the match array.
      // Matches are returned as strings. so make it an integer again.
      // Increment by the number of digits in the match
      var m = reNum.exec(exp.slice(i))[0];
      numbers.push(parseInt(m));
      i += m.length;
    } else if (reOps.test(exp[i])) {
      operators.push(exp[i]);
      i++;
    } else if (exp[i] === ')') {
      // Pop two from `numbers` array, pop one `operators` array.
      // Apply the operation.
      // Return result back to `numbers` array.
      var n1 = numbers.pop().val;
      var n2 = numbers.pop().val;
      var op = operators.pop().val;
      var result = doMath([n1, n2], op);
      numbers.push(result);
      i++;
    } else {
      i++; // ignore
    }
  }
  return numbers.head.val;
};

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
