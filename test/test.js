const assert = require('assert');
const index = require('../index.js');
const html = require('../html.js');

describe('Just testing', function() {
  it('It should say Bruce', function() {
    assert.equal(index.catName, 'Bruce');
  });
  it('It should = 3', function() {
    assert.equal(index.total, '3');
  });
  it('It should = 5', function() {
    assert.equal(index.sum(3, 2), '5');
  });
});

describe('exports', function() {
  describe('css color scheme', function() {
    it('Should be the same', function() {
      const actual = index.getColor('green');
      assert.equal(actual.text, '#ffffff');

      // assert.equal(index.cssColorScheme, html.cssColorScheme);
    });
  });

  // describe('function call', function() {
  //   it('be the same', function() {
  //     assert.equal(index.promptColor(), '<pending>');
  //   });
  // });
});
