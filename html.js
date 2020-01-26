function generateHTML(userInfo, cssColorScheme) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${userInfo.name}'s Resume</title>
      <link rel="stylesheet" type="text/css" href="styles.css">
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
      <div id="fourth-div"></div>
  
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

module.exports = {
  generateHTML: generateHTML,
  generateCSS: generateCSS
};

/*<style>
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
      }
    </style>*/
