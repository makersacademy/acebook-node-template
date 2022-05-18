# Acebook
![Screenshot](https://i.imgur.com/629Ep5m.png)

## Task
We have been tasked to create a web app that should work similar to Facebook. Users are be able to create their own accounts, log in to them, log out of them, be able to create posts, like posts and comment on any posts that they want. They will also have a Profile Page which they are able to edit.\
\
This is our team which worked on this project:
- [Baljit](https://github.com/baljitrakhra)
- [Joe M](https://github.com/jmcnally17)
- [Joe N](https://github.com/Josenewmano)
- [Michael](https://github.com/mcsuGH)
- [Monica](https://github.com/monenavarro)
- [Nadia](https://github.com/NBenzineb)


Technologies used:
- [Express](https://expressjs.com/) web framework for Node.js.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [Handlebars](https://handlebarsjs.com/) to render view templates.
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) for hosting our database.
- [ESLint](https://eslint.org) for linting.
- [Jest](https://jestjs.io/) for testing.
- [Cypress](https://www.cypress.io/) for end-to-end testing.
- [Heroku](https://www.heroku.com/) for hosting our app.

## Card wall
Trello Board: https://trello.com/b/wlp4ENq8/acebook-zark-muckerberg

## Instructions
Clone this repository to your desired location using `git clone https://github.com/jmcnally17/acebook-zark-muckerberg.git`.\
\
Make sure you have the most recent update of Node and then you can run `npm install` whilst in the main directory in your terminal to install dependencies.\
\
You can run tests by using the command `npm run start:test` to load up the test server then using `npm test` to run all the test files.\
\
You will need to have mongoDB to be able to run this web app in it's intended manner, you can run the commands `brew tap mongodb/brew` and then `brew install mongodb-community@5.0` in order to install mongoDB.\
\
In order to access for the website to function, you will need to run the server on localhost by using `npm start` and then going on `localhost:3000` to access the website. From there, you will be able to make an account and those account details will then be stored on your local database.\
\
If you wish to clear the database, use the command `mongo` while in the terminal, you can then use the command `use acebook` (or `use acebook_test` for the test database) to access the database. You can then use the commands `db.users.drop()` to clear the users, `db.posts.drop()` to clear the posts and `db.comments.drop()` to clear the comments. You can do the same for the test database although those get cleared before running your tests so they are relatively small.\
\
Here are some images to show what it looks like:
![Screenshot]()
![Screenshot]()

## Features
- Users are able to create their own accounts
- Users are not able to create an account if the email has already been used to create an existing account
- Passwords are stored encrypted
- When a User registers, they will automatically be logged in and redirected to their own profile page so that they can see the details they entered
- Users can log in and log out
- Users can create a post
- Posts have the user which created them aswell as the time and date they were created
- Posts can be liked by users
- Each User can only like each post once
- Users are able to click the number of likes to see a list of who has liked the post
- Users are able to unlike posts they have liked
- Users are able to delete posts they have made (but they cannot delete posts made by others)
- Users have their own personal profile pages which they can edit their information on
- If a user leaves one (or more) of their edit fields blank, those fields will remain unchanged
- Users will be redirected if they try to go on a different user's edit page
- If a user is logged in, they will not be able to log in again until they are logged out
- If a user is logged in, they will not be able to register until they are logged out
- Users can navigate the website using the navigation bar
- The navigation bar shows different options for pages depending whether or not there is a user logged in
- Users can return to the homepage by clicking on the logo/banner
- Users are able to use our website on their mobile phones with a mobile-friendly interface
- Help page with a FAQ, that only shows the answer to the question when clicked

