# Acebook 

[![Build Status](https://travis-ci.com/edmond-b/acebook-NO-de-Problem.svg?branch=master)](https://travis-ci.com/edmond-b/acebook-NO-de-Problem)

Acebook the best thing since facebook! This is a re-creation of classic facebook in Node.js using Express.

## Features:

- Account creation
- Personalised profile image upload
- Post your most intimate thoughts to the global Acebook newsfeed
- Leave comments on posts
- Leave the site whenever you want with our `Log Out` button.

## Tech Stack:

- [Express](https://expressjs.com/) web framework for Node.js.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [Handlebars](https://handlebarsjs.com/) to render view templates.
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [ESLint](https://eslint.org) for linting.
- [Jest](https://jestjs.io/) for testing.
- [Cypress](https://www.cypress.io/) for end-to-end testing.
- [Multer](https://www.npmjs.com/package/multer) for file uploads to the server
- [Bcrypt]( https://www.npmjs.com/package/bcrypt) for password encryption
- [Travis](https://travis-ci.org) for continuous integration and build testing

## Development Process

Our team used an agile development process with periodic sprints to deliver Acebook to our client with regular check ins and feature updates. This allowed us to integrate changes in specification late into development and keep the team running by dividing up dividing up tasks during the sprints. We used a process of branches, pull-request code reviews and continuous integration testing pipelines to keep our code clean and dependendable.

For an insight into our agile process you can view our team's [card wall here](https://trello.com/b/fjC2EoVt/no-de-problem).

### Domain Model

We employed extensive domain and database modelling for our application before beginning development as well as diagramming the flow of the application. Furthermore we integrated a react frontend controller that used asynchronous fetch requests to parse JSON data from our server to create a modern web application. There are links to our wiki with this planning below:

- [Database Models]()
- [Domain Model Diagram]()

## Installation Guide

1. Clone or Fork this repo to your local machine.
2. Install Node Version Manager (NVM) and `nvm install 12.14.1`.
3. Navigate into the project repo.
4. Install Node.js dependencies
    ```
    npm install
    ```
5. Install `mongodb-community@4.2`.
6. Start Mongodb with `start mongodb-community@4.2`
7. `npm start` to start the server.
8. Visit [http://localhost:3000](http://localhost:3000) to see Acebook in action! 🤩

## Testing

### Test Server

The test server must be running for integrationt tests to pass.
The test server runs on port `3030` at [http://localhost:3030](http://localhost:3030)

- Start test server on **Mac**:
  ```
  npm run start:test
  ```

- Start test server on **PC**:
  ```
  npm run start:pc
  ```

### Run Tests

- Run all tests:
    ```
    npm test
    ```

- Run `jest` unit tests:
    ```
    npm run test:unit
    ```
- Run `cypress` integration tests:
    ```
    npm run test:integration
    ```
