const assert = require('assert');
const index = require('../index.js');
const html = require('../html.js');

describe('bruce', function() {
  it('It should say Bruce', function() {
    assert.equal(index.catName, 'Bruce');
  });
});

describe('sum function', function() {
  describe('sum function variable', function() {
    it('It should = 3', function() {
      assert.equal(index.total, '3');
    });
  });

  describe('sum function itself', function() {
    it('It should = 5', function() {
      assert.equal(index.sum(3, 2), '5');
    });
  });
});

describe('exports', function() {
  describe('css color scheme', function() {
    it('be the same', function() {
      assert.equal(index.cssColorScheme, html.cssColorScheme);
    });
  });

  describe('function call', function() {
    it('be the same', function() {
      assert.equal(index.promptColor(), '<pending>');
    });
  });
});
