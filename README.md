# Acebook Team Mars

This is a Node.js template for the Acebook engineering project.

It uses:
- [Express](https://expressjs.com/) web framework for Node.js.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [Handlebars](https://handlebarsjs.com/) to render view templates.
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [ESLint](https://eslint.org) for linting.
- [Jest](https://jestjs.io/) for testing.
- [Cypress](https://www.cypress.io/) for end-to-end testing.

## User Stories

 ```
 
As a user,
so that I can use AceBook,
I want to sign up.

As a user,
so that I can use AceBook,
I want to login.

As a user, 
so that I do not engage in social media all day,
I want to be able to sign out of Acebook.

As a system administrator,
so that one user does not have multiple accounts,
I want to ensure each user can only register once.

As a user,
so that my account is safe,
I want to know that I can only log in with the correct credentials.

As a potential user,
so that I know if I am interested in the Acebook product,
I want to be able to see the posts page without signing up.

As a user,
so that my account is safe,
I want non-users to not be able to edit, delete or comment on my posts.

As a user,
so that my account is safe,
I want other users to not be able to edit or delete my posts.

As a user,
so that I can let the world know what I am up to,
I want to create a post.

As a user,
so that I can amend and update my posts if needed,
I want to able to edit and delete them.

As a user, 
so that I can see what I share with the world, 
I want a dashboard where I can view, edit, delete and comment on my posts.

As a user,
so that I can engage with other users,
I want to comment on other users' posts.

As a user,
so that the users do not miss posts
I want the posts to appear in reverse chronological order.

As a user,
so that I can engage with other users,
I want to be able to like and dislike posts.

 ```

## Card wall

REPLACE THIS TEXT WITH A LINK TO YOUR CARD WALL

## Quickstart

### Install Node.js

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

### Set up your project

1. Fork this repository
1. Rename your fork to `acebook-<team name>`
1. Clone your fork to your local machine
1. Install Node.js dependencies
    ```
    npm install
    ```
1. Install an ESLint plugin for your editor. For example: [linter-eslint](https://github.com/AtomLinter/linter-eslint) for Atom.
1. Install MongoDB
    ```
    brew tap mongodb/brew
    brew install mongodb-community@4.2
    ```
1. Start MongoDB
    ```
    brew services start mongodb-community@4.2
    ```

### Start

1. Start the server
    ```
    npm start
    ```
1. Browse to [http://localhost:3000](http://localhost:3000)

### Test

* Run all tests
    ```
    npm test
    ```
* Run a check
    ```bash
    npm run lint              # linter only
    npm run test:unit         # unit tests only
    npm run test:integration  # integration tests only
    ```

#### Start test server

The server must be running locally with test configuration for the
integration tests to pass.
```
npm run start:test
```
This starts the server on port `3030` and uses the `acebook_test` MongoDB database,
so that integration tests do not interact with the development server.


