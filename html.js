const inquirer = require('inquirer');
const axios = require('axios');

function generateHTML(userInfo, cssColorScheme, userName, repos) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${userInfo.name}'s Resume</title>
      <!-- <link rel="stylesheet" type="text/css" href="styles.css"> -->
      <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Georgia, 'Times New Roman', Times, serif;
        color: ${cssColorScheme.text};
        text-align: center;
      }
      #first-div {
        position: relative;
        height: 500px;
        width: 100%;
        background-color: ${cssColorScheme.mediumBackground};
        display: flex;
        justify-content: center;
      }
      #second-div {
        position: absolute;
        top: 150px;
        height: 575px;
        width: 90%;
        background-color: ${cssColorScheme.darkBackground};
        border-radius: 20px;
      }
      #third-div {
        height: 365px;
        width: 100%;
        background-color: #e9edee;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding-top: 200px;
        padding-bottom: 100px;
      }
      #fourth-div {
        width: 100%;
        background-color: ${cssColorScheme.mediumBackground};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .repo-title {
        margin: 25px auto;
        text-decoration: none;
        color: ${cssColorScheme.text};
        padding: 50px;
        background-color: ${cssColorScheme.darkBackground};
        width: 200px;
        border-radius: 25px;
      }
      #profile-pic {
        position: relative;
        top: 75px;
        width: 90%;
        padding: 0 145px 50px;
      }
      #profile-pic img {
        width: 350px;
        height: 350px;
        border: solid 10px ${cssColorScheme.photoBorder};
        border-radius: 500px;
      }
      #links a {
        margin: 0 25px;
        text-decoration: none;
        color: white;
      }
      .card {
        background-color: ${cssColorScheme.darkBackground};
        height: 80px;
        width: 150px;
        margin: 50px;
        border-radius: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
      }
      </style>
    </head>
    <body>
      <div id="first-div">
        <div id="second-div"></div>
        <div id="profile-pic">
          <img src="${userInfo.imageSrc}" />
          <h1>Hi!</h1>
          <h2>My name is ${userInfo.name}</h2>
          <p>${userInfo.bio}</p>
          <div id="links">
            <a
              href="https://www.google.com/maps/place/${userInfo.location}"
              target="_blank"
              >${userInfo.location}</a
            >
            <a href="${userInfo.profileURL}" target="_blank">GitHub</a>
            <a href="${userInfo.blog}" target="_blank">Website/Blog</a>
          </div>
        </div>
      </div>
      <div id="third-div"></div>
      <div id="fourth-div">
        <h3>${userInfo.name}'s Repos:</h3>
      </div>
  
      <script>
        const cardContents = [
          {
            title: 'Public Repositories',
            value: ${userInfo.numRepos}
          },
          {
            title: 'Followers',
            value: ${userInfo.numFollowers}
          },
          {
            title: 'GitHub Stars',
            value: ${userInfo.numStars}
          },
          {
            title: 'Following',
            value: ${userInfo.numFollowing}
          }
        ];
        const thirdDiv = document.getElementById('third-div');
        for (const card of cardContents) {
          const cardDiv = document.createElement('div');
          cardDiv.setAttribute('class', 'card');
          const h3 = document.createElement('h3');
          h3.textContent = card.title;
          cardDiv.appendChild(h3);
          const p = document.createElement('p');
          p.textContent = card.value;
          cardDiv.appendChild(p);
          thirdDiv.appendChild(cardDiv);
        }
        const fourthDiv = document.getElementById('fourth-div');
        const repos = ${repos};
        for (let i = 0; i < repos.length; ++i) {
          const repoA = document.createElement('a');
          repoA.setAttribute('class', 'repo-title');
          repoA.setAttribute('target', '_blank');
          repoA.setAttribute('href', 'https://github.com/${userName}/' + repos[i]);
          repoA.textContent = repos[i];
          fourthDiv.appendChild(repoA);
        }
      </script>
    </body>
  </html>
  `;
}

function generateCSS(cssColorScheme) {
  return `      body {
    margin: 0;
    padding: 0;
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: ${cssColorScheme.text};
    text-align: center;
  }
  #first-div {
    position: relative;
    height: 500px;
    width: 100%;
    background-color: ${cssColorScheme.mediumBackground};
    display: flex;
    justify-content: center;
  }
  #second-div {
    position: absolute;
    top: 150px;
    height: 550px;
    width: 90%;
    background-color: ${cssColorScheme.darkBackground};
    border-radius: 20px;
  }
  #third-div {
    height: 365px;
    width: 100%;
    background-color: #e9edee;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 200px;
    padding-bottom: 100px;
  }
  #fourth-div {
    height: 365px;
    width: 100%;
    background-color: ${cssColorScheme.mediumBackground};
  }
  #profile-pic {
    position: relative;
    top: 75px;
    width: 90%;
    padding: 0 145px 50px;
  }
  #profile-pic img {
    width: 350px;
    height: 350px;
    border: solid 10px ${cssColorScheme.photoBorder};
    border-radius: 500px;
  }
  #links a {
    margin: 0 25px;
    text-decoration: none;
    color: white;
  }
  .card {
    background-color: ${cssColorScheme.darkBackground};
    height: 80px;
    width: 375px;
    margin: 50px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }`;
}

function getColorScheme(color) {
  switch (color) {
    case 'green':
      return {
        text: '#ffffff',
        darkBackground: '#004d0d',
        mediumBackground: '#388645',
        photoBorder: '#a3bb1d'
      };
    case 'red':
      return {
        text: '#ffffff',
        darkBackground: '#b60606',
        mediumBackground: '#ac5353',
        photoBorder: '#da9619'
      };
    case 'black':
      return {
        text: '#ffffff',
        darkBackground: '#000000',
        mediumBackground: '#696969',
        photoBorder: '#af0a8b'
      };
    default:
      return {
        text: '#ffffff',
        darkBackground: '#26175a',
        mediumBackground: '#5f64d3',
        photoBorder: '#73448c'
      };
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
    message: 'What color scheme would you like?',
    choices: ['default', 'green', 'red', 'black'],
    name: 'color'
  });
}

async function getUserJSON(username) {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response;
}

async function getUserJSONRepos(username) {
  const response2 = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );
  console.log(response2.data[0]);
  return response2;
}

module.exports = {
  getUserJSONRepos,
  getUserJSON,
  promptUser,
  promptColor,
  getColorScheme: getColorScheme,
  generateHTML: generateHTML,
  generateCSS: generateCSS,
  cssColorScheme: this.cssColorScheme
};
