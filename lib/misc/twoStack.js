/**
 * Implement Dijkstra's two-stack algorithm for solving infix expressions
 * ie: `(1 + ((2 + 3) * (4 * 5)))`
 */
var Stack = require('../../').ds.StackLL;

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

module.exports = function(exp) {
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
      numbers.add(parseInt(m));
      i += m.length;
    } else if (reOps.test(exp[i])) {
      operators.add(exp[i]);
      i++;
    } else if (exp[i] === ')') {
      // Pop two from `numbers` array, pop one `operators` array.
      // Apply the operation.
      // Return result back to `numbers` array.
      var n1 = numbers.remove().val;
      var n2 = numbers.remove().val;
      var op = operators.remove().val;
      var result = doMath([n1, n2], op);
      numbers.add(result);
      i++;
    } else {
      i++; // ignore
    }
  }
  return numbers.head.val;
};
