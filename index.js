'use strict';
// const access_token = 'cH043aLStmyJD40QiAPYAuy7jmih9e8jLL4yPgIKrHWcAwPe'; // for a html-pdf writer I am not using currently (Restpack)
const axios = require('axios');
const util = require('util');
const inquirer = require('inquirer');
const fs = require('fs');
const writeFile = fs.writeFile;
const html = require('./html');
const pdfcrowd = require('pdfcrowd');
const open = require('open');
const client = new pdfcrowd.HtmlToPdfClient(
  'agtravis',
  'd9fb3ab8c1c69de1aebd894830f1f176'
);
// const readFileAsync = util.promisify(readFile);
const writeFileAsync = util.promisify(writeFile);

getGitJson();

// for testing
const catName = 'Bruce';
const total = sum(1, 2);
function sum(a, b) {
  return a + b;
}
//

async function getGitJson() {
  try {
    const { username } = await promptUser();
    const { color } = await promptColor();
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const response2 = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    let repos = [];
    for (let i = 0; i < response2.data.length; ++i) {
      repos.push(response2.data[i].name);
      // repos['repo' + i] = response2.data[i].name;
    }
    repos = JSON.stringify(repos);
    // console.log(repos);
    const response3 = await axios.get(
      `https://api.github.com/users/${username}/starred`
    );
    let stargazers_total_count = 0;
    for (let i = 0; i < response3.data.length; ++i) {
      stargazers_total_count += response3.data[i].stargazers_count;
    }
    const userInfo = {
      imageSrc: response.data.avatar_url,
      name: response.data.name,
      location: response.data.location,
      profileURL: response.data.html_url,
      blog: response.data.blog,
      bio: response.data.bio,
      numRepos: response.data.public_repos,
      numFollowers: response.data.followers,
      numStars: stargazers_total_count,
      numFollowing: response.data.following
    };
    let cssColorScheme;
    switch (color) {
      case 'green':
        cssColorScheme = {
          text: '#ffffff',
          darkBackground: '#004d0d',
          mediumBackground: '#388645',
          photoBorder: '#a3bb1d'
        };
        break;
      case 'red':
        cssColorScheme = {
          text: '#ffffff',
          darkBackground: '#b60606',
          mediumBackground: '#ac5353',
          photoBorder: '#da9619'
        };
        break;
      case 'black':
        cssColorScheme = {
          text: '#ffffff',
          darkBackground: '#000000',
          mediumBackground: '#696969',
          photoBorder: '#af0a8b'
        };
        break;
      default:
        cssColorScheme = {
          text: '#ffffff',
          darkBackground: '#26175a',
          mediumBackground: '#5f64d3',
          photoBorder: '#73448c'
        };
    }
    const styles = html.generateCSS(cssColorScheme);
    const index = html.generateHTML(userInfo, cssColorScheme, username, repos);
    await writeFileAsync(`styles.css`, styles, `utf8`);
    await writeFileAsync(`test.html`, index, 'utf8');
    toPDF(`test.html`, userInfo); // comment out to not use credits for testing
  } catch (err) {
    console.error(err);
  }
}

function promptUser() {
  return inquirer.prompt({
    type: 'input',
    message: 'Enter a username',
    name: 'username'
  });
}

function promptColor() {
  return inquirer.prompt({
    type: 'list',
    message: 'What color schema would you like?',
    choices: ['default', 'green', 'red', 'black'],
    name: 'color'
  });
}

function toPDF(file, userInfo) {
  client.convertFileToFile(file, `${userInfo.name}.pdf`, function(
    err,
    fileName
  ) {
    if (err) return console.error('Pdfcrowd Error: ' + err);
    console.log('Success: the file was created ' + fileName);
    open(`${userInfo.name}.pdf`, { wait: true });
  });
}

module.exports = {
  total: total,
  promptColor: promptColor,
  sum: sum,
  catName: catName,
  cssColorScheme: this.cssColorScheme
};
