# Acebook

This is a Node.js template for the Acebook engineering project.

It uses:

- [Express](https://expressjs.com/) web framework for Node.js.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [Handlebars](https://handlebarsjs.com/) to render view templates.
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [ESLint](https://eslint.org) for linting.
- [Jest](https://jestjs.io/) for testing.
- [Cypress](https://www.cypress.io/) for end-to-end testing.

## User stories

As a user,
So I can use Acebook,
I'm like to be able to register an account.

As a user,
For a personalised expierence,
I'd like to be able to log into Acebook.

As a user,
So that nobody posts on my behalf,
I'd like to be able to log out of Acebook.

As a user,
So that I can say what's on my mind,
I'd like to be able to make a post on the timeline.

As a user,
So I can see what other people have to say,
I'd like to be able to view other user's posts on the timeline.

As a user,
So I know who said what,
I'd like to see who posted each post.

As a user,
So I am keeping up with the latest news,
I'd like to see the time and date when other's have posted.

As a user,
So I see the latest news first,
I'd like to see the newest posts first.

As a user,
So I can retract something I have said,
I'd like to be able to delete a post.

As a user,
So I can express my appreciation for a post,
I'd like to be able to like a post.

As a user,
So I can engage with a post,
I'd like to be able to comment on posts.


As a user,
So I can read people's life stories clearly,
I'd like posts to include linebreaks (paragraphs).

As a user,
so I don't cry inside from the lack of design,
I'd like Acebook to be somewhat attractive and well proportioned.


## Card wall

REPLACE THIS TEXT WITH A LINK TO YOUR CARD WALL

## Quickstart

### Install Node.js

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), currently `18.1.0`.
   ```
   nvm install 18
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
   brew install mongodb-community@5.0
   ```
   *Note:* If you see a message that says `If you need to have mongodb-community@5.0 first in your PATH, run:`, follow the instruction. Restart your terminal after this.
7. Start MongoDB
   ```
   brew services start mongodb-community@5.0
   ```

### Start

1. Start the server
   ```
   npm start
   ```
2. Browse to [http://localhost:3000](http://localhost:3000)

#### Start test server

The server must be running locally with test configuration for the
integration tests to pass.

```
npm run start:test
```

This starts the server on port `3030` and uses the `acebook_test` MongoDB database,
so that integration tests do not interact with the development server.

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

## MongoDB Connection Errors?

Some people occasionally experience MongoDB connection errors when running the tests or trying to use the application. Here are some tips which might help resolve such issues.

- Check that MongoDB is installed using `mongo --version`
- Check that it's running using `brew services list`

If you have issues that are not resolved by these tips, please reach out to a coach and, once the issue is resolved, we can add a new tip!
