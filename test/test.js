const assert = require('assert');
// const index = require('../index.js');
const html = require('../html.js');

describe('css color scheme', function() {
  it('should be the same', function() {
    const actual = html.getColorScheme('default');
    assert.equal(actual.mediumBackground, '#5f64d3');
  });
  it('should be the same', function() {
    const actual = html.getColorScheme('green');
    assert.equal(actual.mediumBackground, '#388645');
  });
  it('should be the same', function() {
    const actual = html.getColorScheme('black');
    assert.equal(actual.photoBorder, '#af0a8b');
  });
  it('should be the same', function() {
    const actual = html.getColorScheme('red');
    assert.equal(actual.text, '#ffffff');
  });
  it('should be the same, with default switch case', function() {
    const actual = html.getColorScheme('not an option');
    assert.equal(actual.darkBackground, '#26175a');
  });
  it('should be the same, with default switch case', function() {
    const actual = html.getColorScheme(null);
    assert.equal(actual.darkBackground, '#26175a');
  });
  it('should be the same, with default switch case', function() {
    const actual = html.getColorScheme(undefined);
    assert.equal(actual.darkBackground, '#26175a');
  });
  it('should be the same, with default switch case', function() {
    const actual = html.getColorScheme(123456);
    assert.equal(actual.darkBackground, '#26175a');
  });
});
