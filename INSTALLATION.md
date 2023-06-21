## INSTALLATION

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
  npm run test:integration  # integration (Cypress) tests only
  npm run test:e2e          # selenium tests only
  npm run test:all          # all tests
  ```


### **Selenium Test Suite Documentation**
Selenium test suite is located in test/selenium.test.js. 

**DATABASE WARNING:** 
  
Test database acebook_test is cleared after tests completed.  
Please run the test with caution and comment out the code that drops database after test if you want to preserve your test data.


**HOW TO USE:**
- Step 1: Start test server
   ```
   npm run start:test
   ```

- Step 2: Run standalone selenium tests - These tests required to run sequentially due to possible browser conflicts.
   ```
   npm run test:e2e -- --runInBand
   ```

- If you want to run whole test suite:

   ```
   npm run test:all
   ```


Selenium tests written in Jest using selenium-webdriver and uses firefox and chrome browser.  

### **DEPENDENCIES:**
- Chrome:
   ```
   npm install chromedriver
   ```

- Firefox:
   ```
   npm install geckodriver --save-dev
   ```

- Selenium-webdriver:
   ```
   npm install --save-dev selenium-webdriver
   ```

**Note: You also need to install Firefox desktop version on your computer.**


- Script structure of package.json
   ```
  "scripts": {
    "lint": "eslint .",
    "start": "nodemon ./bin/www",
    "start:test": "PORT=3030 MONGODB_URL='mongodb://0.0.0.0/acebook_test' npm start",
    "test:unit": "jest --testMatch '**/spec/models/**/*.[jt]s?(x)'",
    "test:e2e": "jest --testMatch '**/test/**/*.[jt]s?(x)'",
    "test:integration": "cypress run",
    "test": "npm run lint && npm run test:unit && npm run test:integration",
    "test:all": "npm run test && npm run test:e2e"
    }
    ```

## MongoDB Connection Errors?

Some people occasionally experience MongoDB connection errors when running the tests or trying to use the application. Here are some tips which might help resolve such issues.

- Check that MongoDB is installed using `mongo --version`
- Check that it's running using `brew services list`

If you have issues that are not resolved by these tips, please reach out to a coach and, once the issue is resolved, we can add a new tip!