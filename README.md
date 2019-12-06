## Table of Contents

* [User Stories](#user-stories)
  * [Built With](#built-with)
* [Quickstart](#quick-start)
  * [Install Node.js](#install-node-js)
  * [Set up for the project](#set-up-for-the-project)
  * [Start](#start)
  * [Test](#test)
  * [Start test server](#start-test-server)
* [Card wall](#card-wall)
* [Contributing](#contributing)
* [Team Members](#team-members)
* [Trello Board](#trello-board)
* [Retro Board](#retro-board)
* [Reflections about our journey](#reflecions)
* [Acknowledgements](#acknowledgements)




# Acebook

## User Stories
 - [x] (1) Sign Up
 - [x] (2) Log In
 - [x] (3) Log Out
 - [X] (4) List Users
 - [x] (5) Send Friend Request
 - [x] (6) Accept Friend's Request
 - [x] (7) View Feed
 - [x] (8) Posting to Feed

```
(1)
As a user of AceBook, 
I want to be able to sign up,
So that I can access the services of the site.
```

```
(2)
As a user of AceBook,
I want to be able to login,
So that I can access my account.

```

```
(3)
As a user of AceBook,
I want to be able to logout,
So that I can protect the security of my account.
```

```
(4)
As a user of AceBook,
I want to be able to view a list of all users,
so that I can choose to add other users as friends.
```

```
(5)
As a user of AceBook,
I would like to be able to send a friend request,
So that I can become friends with another user.
```

```
(6)
As a user of AceBook,
I would like to be able to approve or deny a friend request,
So that I can decide who I want to be friends with.
```

```
(7)
As a user of AceBook,
I want to be able to view the feeds of my friends,
So that I can see what they are doing.
```

```
(8)
As a user of AceBook,
I want to be able to login and logout securely,
So that I know my details are stored safely.

```

```
(9)
As a user of AceBook,
I want to be able to post to my feed,
So that I can share things with my friends.
```

### Built with:
- [Express](https://expressjs.com/) web framework for Node.js.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [Handlebars](https://handlebarsjs.com/) to render view templates.
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [ESLint](https://eslint.org) for linting.
- [Jest](https://jestjs.io/) for testing.
- [Cypress](https://www.cypress.io/) for end-to-end testing.

## Card wall

https://trello.com/b/agT0v9jj/acebook-rob-and-the-meerkats

## Quickstart

### Install Node.js

1. Install Node Version Manager (NVM)
    ```
    brew install nvm
    ```
    Then follow the instructions to update your `~/.bash_profile`.
1. Open a new terminal
1. Install the latest long term support (LTS) version of Node.js, currently `10.16.3`.
    ```
    nvm install 10.16.3
    ```

### Set up for the project

1. Fork this repository
1. Rename your fork to `https://github.com/robbaile/acebook-robAndTheMeerkats`
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
This starts the server on port `3030` and uses the `acebook` MongoDB database,
so that integration tests do not interact with the development server.

<!-- Team Members -->
## Team members

[Rob](https://github.com/robbaile)

[Jade](https://github.com/jade-genevieve)

[Migle](https://github.com/miglekuba)

[Lena](https://github.com/olkras03)

[Project Repo](https://github.com/robbaile/acebook-robAndTheMeerkats)

<!-- Trello Board -->
## Trello board

[Our Trello Board](https://trello.com/b/agT0v9jj/acebook-rob-and-the-meerkats)

<!-- Retro Board -->
## Retro Board

[Retro Board Week1](https://github.com/robbaile/acebook-robAndTheMeerkats/tree/master/public/images/retro_week1.png)
[Retro Board Week2](https://github.com/robbaile/acebook-robAndTheMeerkats/tree/master/public/images/retro_week2.png)

<!-- Reflections -->
## Reflections about our journey

[Blog post](https://docs.google.com/document/d/18bviYAXN_c1crXvFRQpI37oH_cFTfA0xzArSh9DnGqY/edit)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [MongoDB using Mongoose](https://mongoosejs.com/docs/)
                          (https://codeburst.io/things-i-wish-i-new-before-i-started-working-with-mongodb-c089d4b593db)

