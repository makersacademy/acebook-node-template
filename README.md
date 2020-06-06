# Acebook

## Project Description

Acebook is a social media platform, similar to Facebook, built as part of the Makers Academy course and specifically as part of the week 8-9 engineering project.

## Features

[Placeholder]

## Dependencies

This project uses the following technologies:
- [Express](https://expressjs.com/) web framework for Node.js.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [Handlebars](https://handlebarsjs.com/) to render view templates.
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [ESLint](https://eslint.org) for linting.
- [Jest](https://jestjs.io/) for testing.
- [Cypress](https://www.cypress.io/) for end-to-end testing.

## Card wall

Our card wall can be found at this link: https://trello.com/b/7Jr6hjux/node4code

## Getting Started

To get started using Acebook by Team Node4Code, please follow the instructions below:

### Install Node.js

**Skip this step if you already have Node.js installed**

1. Install Node Version Manager (NVM)
    ```
    brew install nvm
    ```
    Then follow the instructions to update your `~/.bash_profile`.
1. Open a new terminal
1. Install the latest long term support (LTS) version of [Node.js](https://nodejs.org/en/), currently `12.14.1`.
    ```
    nvm install 12.14.1
    ```

### Getting set up

1. Clone this repository to your local machine
2. Install Node.js dependencies using the command:
    ```
    npm install
    ```
3. Install MongoDB
    ```
    brew tap mongodb/brew
    brew install mongodb-community@4.2
    ```
4. Start MongoDB
    ```
    brew services start mongodb-community@4.2
    ```

### Using Acebook!

1. To start the server, enter the command:
    ```
    npm start
    ```
2. Browse to [http://localhost:3000](http://localhost:3000)

## Testing

### To run tests

* Run all tests
    ```
    npm test
    ```
* Run a specific check
    ```
    npm run lint              # linter only
    npm run test:unit           # unit tests only
    npm run test:integration  # integration tests only
    ```

#### Starting the test server

The server must be running locally with test configuration for the
integration tests to pass.
```
npm run start:test
```
This starts the server on port `3030` and uses the `acebook_test` MongoDB database,
so that integration tests do not interact with the development server.

## How to contribute

If you would like to contribute to this project, you can follow the instructions below

1. Clone this repository to your local computer
2. Create a new branch: $ git checkout https://github.com/Joanneyoung01/Node4Code -b name_for_new_branch.
3. Make changes and test
4. Submit Pull Request with comprehensive description of changes
