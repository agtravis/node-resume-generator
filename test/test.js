const assert = require('assert');
// const index = require('../index.js');
const html = require('../html.js');
const chai = require('chai');

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

describe('async functions', () => {
  const username = 'agtravis';

  it('should match name', async () => {
    const expected = 'Alexander George Travis';
    const actual = await html.getUserJSON(username);
    assert.equal(actual.data.name, expected);
  });

  it('the repos return should be an array', async () => {
    const actual = await html.getUserJSONRepos(username);
    chai.expect(actual.data).to.be.an('array');
  });

  it('get stars should return a number', async () => {
    const actual = await html.getStars(username);
    chai.expect(actual).to.be.a('number');
  });

  it('array of repos should have this number of repos in it', async () => {
    const repos = await html.getUserJSONRepos(username);
    const repoArrStr = html.fillRepoArray(repos);
    const repoArr = JSON.parse(repoArrStr);
    assert.equal(repos.data.length, repoArr.length);
  });

  it('should return the correct amount of properties (10)', async () => {
    const response = await html.getUserJSON(username);
    const stars = await html.getStars(username);
    const userJSON = html.getUsableJSON(response, stars);
    assert.equal(Object.keys(userJSON).length, 10);
  });
});
