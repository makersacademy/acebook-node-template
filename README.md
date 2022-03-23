# Acebook

## User Stories

~~~~
As a user of Acebook
So I can see who commented
I want to be able to see who commented on a post
~~~~

~~~~
As a user of Acebook
So I can know who is the owner of a post
I want to be able to see who posted the post
~~~~

~~~~
As a user of Acebook
So I can know how users are feeling
I want to be able to view their posts
~~~~

~~~~
As a user of Acebook
So I can tell the world how I am feeling
I want to make a post
~~~~

~~~~
As a user of Acebook
so I can see when a post was posted
I want to see the date and time a post was posted
~~~~

~~~~
As a user of Acebook
So I can express my interest in someones post
I want to be able to like a post
~~~~

~~~~
As a user of Acebook
So I can express my interest in someones post
I want to be able to comment on the post
~~~~

~~~~
As a user of Acebook
So I can show others who I am
I want to view a profile page with my name
~~~~

~~~~
As a user of Acebook
So other users can see all my posts
I want to view all my posts on my profile page
~~~~

~~~~
As a new user to Acebook
so I can join in the fun of social media
I want to create an account
~~~~

~~~~
As a user of Acebook
So I can access my account
I want to securely log in
~~~~

~~~~
As a user of Acebook
so I can exit mmy account
I want to log out
~~~~

-----------------------

This is a Node.js template for the Acebook engineering project.

It uses:

- [Express](https://expressjs.com/) web framework for Node.js.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [Handlebars](https://handlebarsjs.com/) to render view templates.
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [ESLint](https://eslint.org) for linting.
- [Jest](https://jestjs.io/) for testing.
- [Cypress](https://www.cypress.io/) for end-to-end testing.
- [Bcrypt](https://www.npmjs.com/package/bcrypt) for password encyption
- [Bootstrap](https://getbootstrap.com/) for css templating

## Card wall

https://trello.com/b/sOMiZuH4/makerverse

## Quickstart

### Install Node.js

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest long term support (LTS) version of [Node.js](https://nodejs.org/en/), currently `16.14.0`.
   ```
   nvm install 16
   ```

### Set up your project

1. Fork this repository
2. Rename your fork to `acebook-<team name>`
3. Clone your fork to your local machine
4. Install Node.js dependencies
   ```
   npm install
   ```
5. Install an ESLint plugin for your editor. For example: [linter-eslint](https://github.com/AtomLinter/linter-eslint) for Atom.
6. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@4.4
   ```
7. Start MongoDB
   ```
   brew services start mongodb-community@4.4
   ```

### Start

1. Start the server
   ```
   npm start
   ```
2. Browse to [http://localhost:3000](http://localhost:3000)

### Test

- Run all tests
  ```
  npm test
  ```
- Run a check
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

## MongoDB Connection Errors?

Some people occasionally experience MongoDB connection errors when running the tests or trying to use the application. Here are some tips which might help resolve such issues.

- Check that MongoDB is installed using `mongo --version`
- Check that it's running using `brew services list`
- Try swapping `localhost`, everywhere that it appears in your codebase, with `127.0.0.1`. It might be surprising but this does sometimes make a difference.

If you have issues that are not resolved by these tips, please reach out to a coach and, once the issue is resolved, we can add a new tip!

