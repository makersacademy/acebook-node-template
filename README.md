# Acebook
Here is our second group project for the Makers Academy bootcamp where we made a clone of Facebook (Acebook) from a boilerplate template in 2 weeks.


## View here!

Check it out here: https://milton-acebook.herokuapp.com/

## Meet the team!
- https://github.com/delphiine
- https://github.com/karolina-codes
- https://github.com/Agabov123
- https://github.com/taybenca
- https://github.com/aeghosa
- https://github.com/Joseph-ER

## It uses:

- [Express](https://expressjs.com/) web framework for Node.js.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [Handlebars](https://handlebarsjs.com/) to render view templates.
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [ESLint](https://eslint.org) for linting.
- [Jest](https://jestjs.io/) for testing.
- [Cypress](https://www.cypress.io/) for end-to-end testing.
- [Atlas](https://www.mongodb.com/atlas/database) for hosting the database remotely.
- [Heroku](www.heroku.com) for hosting the app remotely.

## Card wall

https://trello.com/b/UFztmCXp/milton-acebook

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

### To run locally

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
