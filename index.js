'use strict';

const axios = require('axios');
const util = require('util');
const inquirer = require('inquirer');
const fs = require('fs');
const writeFile = fs.writeFile;
// const html = require('./html');

// const readFileAsync = util.promisify(readFile);
const writeFileAsync = util.promisify(writeFile);

async function getGitJson() {
  try {
    const { username } = await inquirer.prompt({
      message: 'Enter a username',
      name: 'username'
    });

    console.log(`https://api.github.com/users/${username}`);
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
    // console.log(userInfo);
    generateHTML(userInfo);

    // const content = JSON.stringify(response.data, null, 2);
    // await writeFileAsync('test.html', content, 'utf8');
  } catch (err) {
    console.error(err);
  }
}

getGitJson();

function generateHTML(userInfo) {
  console.log(userInfo);
}
