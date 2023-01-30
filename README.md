# blog-for-techs
A CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts, comment on other developers' posts, update and/or delete posts, and create a user account to store your information. 

This application was built completely from scratch and deployed to Heroku. This Tech Blog follows the **MVC Paradigm** (Model-View-Controller) in its architectural structure, using **Handlebars.js** as the templating language, **Sequelize** as the ORM, and the **express-session** npm package for authentication.

## Tech Blog
Many software developers love their craft, and spend hours not just writing code, but actively engaging with the community, staying up-to-date with latest tools, and trying to learn new things. Writing about technology can just be as important creating it. This means making complex text, ideas, or conclusions presentable and easy-to-understand. Even looking at the coding process itself, developers can make their code more meaningful with better guiding comments. Developers spend plenty of time creating new applications and troubleshooting, and most great developers also attribute at least some time to reading and wrriting about technical concepts, advancements, and new technologies.

## User Story
```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Walk-through Video](#walk-through-video)
* [Built With](#built-with)
* [ERD](#erd)
* [Database - MySQL Tables](#database---mysql-tables)

## Description
A convenient, browser-based platform developers look to share and gain up-to-date knowledge about technology.

## Installation
This application allows users to easily create, update, and delete blogs and comments after:

- [x] Cloning the GitHub repository locally
- [x] Installing necessary packages
- [x] Running seeds to insert data into the tech_blog_db

1. To clone this project from GitHub to your local computer

> Click the Code drop-down button in this page and Copy URL for that repository:

![Copy Code](assets/clone-tech-blog-url.png "Clone GitHub Repo")

> Enter the following command in your terminal on the level of your project folder (assuming you have Git installed)

    `git clone <URL>`
    > URL = https://github.com/kaylacasale/blog-for-techs.git




2. To install neccessary packages

This application uses Node.js, Sequelize, Handlebars.js, and the expression-session npm package in order to run on your browser (localhost:3001).

> Enter into the command-line

    `npm install`

OR

    `npm i`


3. To insert seeds into the tech blog database using Sequelize models

> Enter into the command-line

    `npm run seed`

OR

    `node run seeds/seed.js`

>> **Personalize your seeds by entering your own blog, user, and comment information into the JSON files located in the `seeds` folder**


