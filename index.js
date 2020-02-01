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
    const response2 = await html.getUserJSONRepos(username);
    const repos = html.fillRepoArray(response2);
    const stargazers_total_count = await html.getStars(username);
    const userInfo = html.getUsableJSON(response, stargazers_total_count);
    const cssColorScheme = html.getColorScheme(color);
    const styles = html.generateCSS(cssColorScheme);
    const index = html.generateHTML(userInfo, cssColorScheme, username, repos);
    await writeFileAsync(`styles.css`, styles, `utf8`);
    await writeFileAsync(`${userInfo.name}.html`, index, 'utf8');
    toPDF(`${userInfo.name}.html`, userInfo); // comment out to not use credits for testing
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
