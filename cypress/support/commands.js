'use strict';

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

const testHelper = { 
  createTestPost: (message) => {
  cy.contains('New post').click();
  cy.get('#new-post-form').find('[type="text"]').type(message);
  cy.get('#new-post-form').submit();
  },
  signUpTestUser: (username, password) => {
    cy.visit('/users/new');
    cy.get('#new-user-form').find('[type="email"]').type(username);
    cy.get('#new-user-form').find('[type="password"]').type(password);
    cy.get('#new-user-form').submit();
  }
}

if(typeof process === 'object') module.exports = testHelper;