'use strict';
// const access_token = 'cH043aLStmyJD40QiAPYAuy7jmih9e8jLL4yPgIKrHWcAwPe'; // for an html-pdf writer I am not using currently (Restpack)
const axios = require('axios');
const util = require('util');
const fs = require('fs');
const writeFile = fs.writeFile;
const html = require('./html');
const pdfcrowd = require('pdfcrowd');
const open = require('open');
const client = new pdfcrowd.HtmlToPdfClient(
  'agtravis',
  'd9fb3ab8c1c69de1aebd894830f1f176'
);
const writeFileAsync = util.promisify(writeFile);

getGitJson();

async function getGitJson() {
  try {
    const { username } = await html.promptUser();
    const { color } = await html.promptColor();
    const response = await html.getUserJSON(username);
    const response2 = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    let repos = [];
    for (let i = 0; i < response2.data.length; ++i) {
      repos.push(response2.data[i].name);
    }
    repos = JSON.stringify(repos);
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
    const cssColorScheme = html.getColorScheme(color);
    const styles = html.generateCSS(cssColorScheme);
    const index = html.generateHTML(userInfo, cssColorScheme, username, repos);
    await writeFileAsync(`styles.css`, styles, `utf8`);
    await writeFileAsync(`${userInfo.name}.html`, index, 'utf8');
    // toPDF(`${userInfo.name}.html`, userInfo); // comment out to not use credits for testing
  } catch (err) {
    console.error(err);
  }
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

// module.exports = {};
