'use strict';
const access_token = 'cH043aLStmyJD40QiAPYAuy7jmih9e8jLL4yPgIKrHWcAwPe';

const axios = require('axios');
const util = require('util');
const inquirer = require('inquirer');
const fs = require('fs');
const writeFile = fs.writeFile;
const html = require('./html');
const pdfcrowd = require('pdfcrowd');
const open = require('open');

// create the API client instance
const client = new pdfcrowd.HtmlToPdfClient(
  'agtravis',
  'd9fb3ab8c1c69de1aebd894830f1f176'
);

// const readFileAsync = util.promisify(readFile);
const writeFileAsync = util.promisify(writeFile);

async function getGitJson() {
  try {
    const { username } = await promptUser();

    const colorChoice = await promptColor();

    // console.log(colorChoice.color); // here!

    // console.log(`https://api.github.com/users/${username}`);
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const userInfo = {
      imageSrc: response.data.avatar_url,
      name: response.data.name,
      location: response.data.location,
      profileURL: response.data.html_url,
      blog: response.data.blog,
      bio: response.data.bio,
      numRepos: response.data.public_repos,
      numFollowers: response.data.followers,
      numStars: response.data.public_gists,
      numFollowing: response.data.following
    };
    let cssColorScheme;
    switch (colorChoice.color) {
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

    // console.log(cssColorScheme);

    const styles = html.generateCSS(cssColorScheme);
    const index = html.generateHTML(userInfo, cssColorScheme);

    // console.log(styles);

    // console.log(index);
    // console.log(userInfo);

    // const content = JSON.stringify(response.data, null, 2);
    await writeFileAsync(`styles.css`, styles, `utf8`);
    await writeFileAsync(`test.html`, index, 'utf8').then(function(err) {
      if (err) {
        return console.error(err);
      }
      toPDF(`test.html`, userInfo);
    });
  } catch (err) {
    console.error(err);
  }
}

getGitJson();

function promptUser() {
  return inquirer.prompt({
    message: 'Enter a username',
    name: 'username'
  });
}

function promptColor() {
  return inquirer.prompt({
    type: 'list',
    name: 'color',
    message: 'What color schema would you like?',
    choices: ['default', 'green', 'red', 'black']
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
