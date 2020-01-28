var assert = require('assert');
var index = require('../index.js');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('string', function() {
  describe('bruce', function() {
    it('It should say Bruce', function() {
      assert.equal('bruce', 'bruce');
    });
  });
});

describe('sum function', function() {
  describe('sum function', function() {
    it('It should = 3', function() {
      assert.equal(index.total, '3');
    });
  });
});
