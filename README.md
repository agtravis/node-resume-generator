# node-resume-generator

> This Node CLI app reads github profiles and generates a standardized resume based on some API responses.

Check out the repo [here](https://github.com/agtravis/node-resume-generator)!

## Table of contents

- [General info](#general-info)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Inspiration](#inspiration)
- [Contact](#contact)

## General info

The purpose of the app is so that a recruiter can collect standardized and required information from multiple candidates for a position, and collate that information in such a way that is easily comparable when viewed in succession, either on a computer screen, or printed out.

## Screenshots

Since this is a Command Line Interface, there can't really be any screen shots of anything besides code, and of course the outcome, but here is a gif (split into 2 sections due to length) demonstrating the app being used:

![inAction1](https://github.com/agtravis/node-resume-generator/blob/master/resume-generator1.gif)
![inAction2](https://github.com/agtravis/node-resume-generator/blob/master/resume-generator2.gif)

## Technologies

Here are the package.json dependencies:

    "dependencies": {
        "axios": "^0.19.2",
        "fs": "0.0.1-security",
        "inquirer": "^7.0.4",
        "open": "^7.0.0",
        "pdfcrowd": "^4.11.0",
        "request": "^2.88.0"
    }

## Setup

This is an app that runs in node. The user should run `npm install`, and will need their own API key available [here](https://pdfcrowd.com/doc/api/html-to-pdf/nodejs/).

## Features

- Gets the users profile pic, basic location & contact info.
- Also displays how many repositories, followers, stars, and other users being followed.
- Provides a list of repos the user has created or contributed to.
- If viewed as a PDF (as opposed to printed out) all links are clickable.
- customizable with 4 different color themes, perhaps to color code what position is being hired for.
- upon completion, the PDF opens automatically in the browser.

## Status

Project is: MVP. A lot more could be done to make the page more aesthetically pleasing, and basic information could be provided about the repos, along with links to the deployed applications. Testing is limited by GitHup API request limits, and HTML to PDF conversions, however the line of code that calls the PDF conversion can be commented out for testing.

Another limitation is that this app does not accept external stylesheets or anything similar, all styling and scripting must be written in the HTML file. However, since the ultimate purpose of this task is to generate a PDF, that is not an issue. In case somebody wished to use this app to create a webpage however, perhaps to create a library of candidates, as an example this app still produces a .CSS stylesheet as well as an HTML file. The user would simply have to delete the styling in the HTML page and remove the link to the stylesheet comment tags.

## Contact

Created by [@agtravis](https://agtravis.github.io/)
