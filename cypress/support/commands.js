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
Cypress.Commands.add("signupAndLogin", () => {
  cy.visit('/users/signup');
  cy.get('#sign-up-form').find('#email').type('email@test.co.uk');
  cy.get('#sign-up-form').find('#password').type('test123');
  cy.get('#sign-up-form').find('#username').type('user1');
  cy.get('#sign-up-form').submit();
  cy.visit('/users/login');
  cy.get('#log-in-form').find('#email').type('email@test.co.uk');
  cy.get('#log-in-form').find('#password').type('test123');
  cy.get('#log-in-form').submit();
})
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
