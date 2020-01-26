function generateHTML(userInfo) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${userInfo.name}'s Resume</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
          color: white;
          text-align: center;
        }
        #first-div {
          position: relative;
          height: 500px;
          width: 100%;
          background-color: #5f64d3;
          display: flex;
          justify-content: center;
        }
        #second-div {
          position: absolute;
          top: 150px;
          height: 550px;
          width: 90%;
          background-color: #26175a;
          border-radius: 20px;
        }
        #profile-pic {
          position: relative;
          top: 75px;
        }
        #profile-pic img {
          width: 350px;
          height: 350px;
          border: solid 10px #73448c;
          border-radius: 500px;
        }
        #links a {
          margin: 0 25px;
          text-decoration: none;
          color: white;
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
    </body>
  </html>
  
  `;
}

module.exports = {
  generateHTML: generateHTML
};
