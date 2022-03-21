# Acebook - Jest In Time

## User Stories

```
As a user of Acebook,
So that I can log in to the site,
I want to be able to create an account
```

```
As a user of Acebook,
So that my account is secure,
I want to be able to log out of my account
```

```
As a user of Acebook,
So that I can access my account,
I want to be able to log into the site
```

```
As a user of Acebook,
So that I can interact with other users,
I want to be able to comment on other users posts
```

```
As a user of Acebook,
So that I can view feeds in chronological order,
I want to be able to see the most recent posts first
```

```
As a user of Acebook,
So that I can see the popularity of a post,
I want to be able to see the number of likes
```

```
As a user of Acebook,
So that I can express my opinion on posts,
I want to be able to like a post
```

```
As a user of Acebook,
So that I can see who made the post,
I want to be able to see a little photo of the user next to their post
```

```
As a user of Acebook,
So that I can view who authored the posts,
I want to be able to see the user's name next to their post
```

```
As a user of Acebook,
So that I can access additional content of the site,
I want to be able to navigate the site using a nav bar
```

```
As a user of Acebook,
So that I can share photos,
I want to be able to upload photos
```

```
As a user of Acebook,
So that I can share my news,
I want to be able to add a post
```

```
As a user of Acebook,
So that I can find new friends,
I want to see a list of all Acebook users
```

```
As a user of Acebook,
So that I can increase my network connections,
I want to be able to add another user to my friend list
```

```
As a user of Acebook,
So that I can showcase my friends,
I want to display a list of my friends on my profile page
```

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

https://trello.com/b/K2tXzdUW/acebook-jest-in-time

## Quickstart

### Install Node.js

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest long term support (LTS) version of [Node.js](https://nodejs.org/en/), currently `17.7.1`.
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
   brew install mongodb-community@5.0
   ```
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
