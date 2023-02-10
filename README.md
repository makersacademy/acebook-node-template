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

## Card wall

Link to Trello: https://trello.com/b/TpjSuBYO/jam-a-pc

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

_Note: you if you get an error when running `nvm install 18`, completeing the following commands might help:_

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

`source ~/.zshrc`

`nvm install node`

`nvm use node`


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

_Note: if at any point you get a 'this is your first time running cypress' message telling you that you need to verify it, enter the following command to verify:_
`npx cypress verify`

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

# General Rules:

To be used as a guide, will fluctuate day to day as work needs

1. **0930** - Previous cohort/team standup
	1. shared learning
	2. ideas sharing
	3. shared unblocking


2. **1000** - JAMA PC standup
	1. completed items
	2. plans for the day
	3. new items to add
	4. items to remove
	5. any issues?


3. **1230-1400** LUNCH


5. **1400** - Afternoon catchup


7. **1700** - daily roundup
	1. completed items
	2. plans for the day
	3. new items to add
	4. items to remove
	5. any issues?


**Quality** for the group is:
- understandable code
- fully functional to the MVP - or above if time
- looks nice as well

Maybe we need to consider:
- Usability
- Accessibility
- Security
- Testability
- Longevity
