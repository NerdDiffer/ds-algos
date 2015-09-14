var helpers = require('../../lib/sorting').helpers;
var assert = require('assert');

describe('Helper functions for sorting', function() {

  describe('compare', function() {
    context('comparing integers', function() {
      it('returns -1 if the 1st number is < the 2nd number', function() {
        assert.equal(helpers.compare(-10, 10), -1);
      });
      it('returns  1 if the 1st number is > the 2nd number', function() {
        assert.equal(helpers.compare(10, -10), 1);
      });
      it('returns  0 if the 1st number is == the 2nd number', function() {
        assert.equal(helpers.compare(10, 10), 0);
      });
    });
    context('comparing floating point numbers', function() {
      it('returns -1 if the 1st number is < the 2nd number', function() {
        assert.equal(helpers.compare(-1.0005, -1.00049), -1);
      });
      it('returns  1 if the 1st number is > the 2nd number', function() {
        assert.equal(helpers.compare(1.1000049, 1.1000048), 1);
      });
      it('returns  0 if the 1st number is == the 2nd number', function() {
        assert.equal(helpers.compare(1.0003, 1.0003), 0);
      });
    });
    context('comparing strings', function() {
      context('single-character strings', function() {
        context('both letters same case', function() {
          it('returns -1 if the 1st letter is < the 2nd letter', function() {
            assert.equal(helpers.compare('a', 'b'), -1);
          });
          it('returns  1 if the 1st letter is > the 2nd letter', function() {
            assert.equal(helpers.compare('z', 'y'), 1);
          });
          it('returns  0 if the 1st letter is == the 2nd letter', function() {
            assert.equal(helpers.compare('m', 'm'), 0);
          });
        });
        context('one letter upper-case, other letter lower-case', function() {
          it('considers upper-case letters < lower-case letters', function() {
            assert.equal(helpers.compare('a', 'B'), 1);
            assert.equal(helpers.compare('Z', 'y'), -1);
            assert.equal(helpers.compare('M', 'm'), -1);
          });
        });
      });
      context('multiple-character strings', function() {
        context('all letters same case', function() {
          it('returns -1 if the 1st word is < the 2nd word', function() {
            assert.equal(helpers.compare('aardvark', 'apple'), -1);
          });
          it('returns  1 if the 1st word is > the 2nd word', function() {
            assert.equal(helpers.compare('apple', 'aardvark'), 1);
          });
          it('returns  0 if the 1st word is == the 2nd word', function() {
            assert.equal(helpers.compare('apple', 'apple'), 0);
          });
        });
      });
    });
  });

  describe('less', function() {
    it('returns true  if the 1st value is < the 2nd value', function() {
      assert(helpers.less(-10, 10));
    });
    it('returns false if the 1st value is > the 2nd value', function() {
      assert.equal(helpers.less(10, -10), false);
    });
    it('returns false if the 1st value is == the 2nd value', function() {
      assert.equal(helpers.less(10, 10), false);
    });
    context('overriding the default criteria', function() {
      it('allows you to redefine the criteria at runtime', function() {
        assert(helpers.less(10, -10, function(v, w) {
          if (v > w)      { return -1; }
          else if (v < w) { return  1; }
          else            { return  0; }
        }));
      });
    });
  });

  describe('exch', function() {
    it('swaps positions of two array elements', function() {
      var arr = ['a', 'b', 'c'];
      helpers.exch(arr, 0, 1);
      assert.equal(arr[0], 'b');
      assert.equal(arr[1], 'a');
      assert.equal(arr[2], 'c');
    });
  });

  describe('sorted', function() {
    it('returns true if the array is sorted', function() {
      var arr = ['a', 'b', 'c'];
      assert(helpers.sorted(arr));
    });
    it('returns false if the array is not sorted', function() {
      var arr = ['c', 'b', 'a'];
      assert.equal(helpers.sorted(arr), false);
    });
    context('overriding the default sort criteria', function() {
      it('allows you to redefine the sorting criteria at runtime', function() {
        var arr = ['c', 'b', 'a'];
        assert(helpers.sorted(arr, function(v, w) {
          if (v > w)      { return -1; }
          else if (v < w) { return  1; }
          else            { return  0; }
        }));
      });
    });
  });

});
