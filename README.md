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
- [Bootstrap](https://getbootstrap.com/) for template rendering of HTML and CSS.

## Card wall

<a href="https://github.com/Chloeem/acebook-SACDWS/projects/1">Project Board</a>

## MVP
- Sign up: validation
- Log in: validation
- Log out: end the session
- Show posts in reverse chronological order
- I want to be able to create a profile
- I want to be able to visit my profile

## MVP User stories
```
As a User
So that I can have my own personalised profile
I want to be able to sign up

As a User
So that I can retrieve my profile
I can log in

As a User
So that I can keep my profile secure
I can log out

As a User
So that I keep up to date with my friend's latest posts 
They should be displayed in reverse chronological order

As a User
So that people can know more about me
I want to be able to create a profile

As a User
So that I can see my past posts and profile
I want to be able to visit my profile
```

## Additional user stories
```
As a User
So that I socialise with my friends
I want to comment on posts 

As a User
So I can clarify who I'm talking to
I want to see a user's name and photo with their posts

As a User
So that I visually share my life with my followers
I want to be able to post photos

As a User
So that I can get around the site easily
I want to see a nav bar at the top of every page

As a User
So that I can show my appreciation on a post
I want to be able to like a post and see all the likes

As a User
So that I can use the website
I want to access the site from a Heroku link
```

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
