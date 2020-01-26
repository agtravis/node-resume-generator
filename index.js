'use strict';

const axios = require('axios');
const util = require('util');
const inquirer = require('inquirer');

// const readFileAsync = util.promisify(readFile);
// const writeFileAsync = util.promisify(writeFile);

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
    console.log(response.data);
    // console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}

getGitJson();
