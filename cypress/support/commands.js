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


const mongoose = require('mongoose');

Cypress.Commands.add('clearDb', () => {
  return cy.task('clearDb').then(() => {
    return new Promise((resolve) => {
      mongoose.connection.once('open', () => {
        resolve();
      });
    });
  });
});

Cypress.Commands.add('signIn', () => {
  cy.visit("/");
  cy.get('a.global-button[href="/sessions/new"]').click();
  cy.get("#email").type("admin@example.com");
  cy.get("#password").type("Password!123");
  cy.get("#submit").click();
});