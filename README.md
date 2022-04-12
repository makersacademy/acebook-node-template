# Acebook

## User Stories 

### MVP

#### Login

```
As a user, 
so that I can use Acebook,
I want to be able to sign up
```
```
As a user, 
so that I can use Acebook,
I want to be able to log in
```
```
As a user, 
so that the experience is seamless,
I want to be logged in automatically once I have signed up
```
```
As a user,
so I can choose how other users identify me,
I would like to be able to choose a username to display
```
#### Posts

```
As a user, 
so that so that I can express myself,
I would like to be able to publish a post
```
```
As a user, 
so that I can be informed,
I would like to be able to see a list of posts from others
```
```
As a user, 
so that I know who is posting,
I would like to see a username attached to each post
```
```
As a user, 
so that I know the context in which a post was made,
I would like to be able to see the time it was posted
```
```
As a user,
so that I can go back on what I posted,
I would like to be able to delete my posts
```

#### Interactions

```
As a user, so that I can express how I feel,
I would like to be able to like posts
```
```
As a user, 
so that I can go back on what I liked,
I would like to be able to unlike
```
### Further User Stories

#### Login
```
None yet
```

#### Posts
```
None yet
```

#### Interations
```
None yet
```
## Makers Instructions

This is a Node.js template for the Acebook engineering project.

It uses:

- [Express](https://expressjs.com/) web framework for Node.js.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [Handlebars](https://handlebarsjs.com/) to render view templates.
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [ESLint](https://eslint.org) for linting.
- [Jest](https://jestjs.io/) for testing.
- [Cypress](https://www.cypress.io/) for end-to-end testing.

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
