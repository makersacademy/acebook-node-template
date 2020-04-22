// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('signup', (name, email, password) => {
  cy.visit('/');
  cy.get('input[name=name]').type(name)
  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(password)
  cy.get('#signup-form').submit()
})

Cypress.Commands.add('signin', (name, email) => {
  cy.setCookie('CurrentUser', name)
  cy.setCookie('UserEmail', email)
  cy.visit('/user/profile');
});

Cypress.Commands.add('createTrip', (destination, startDate, endDate) => {
  cy.visit('user/profile');
  cy.get('#create-trip-button').submit();
  cy.get('input[name=destination]').type(destination);
  cy.get('input[name=startDate]').type(startDate);
  cy.get('input[name=endDate]').type(endDate);
  cy.get('#new-trip-form').submit();
});

beforeEach(function () {
	cy.task('resetDB');
})

afterEach(function() {
    cy.task('resetDB'); // runs after each test in the block
  })
