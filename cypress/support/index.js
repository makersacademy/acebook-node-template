// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively you can use CommonJS syntax:
require('./commands')

before(() => {
  const email = "admin@example.com";
  const password = "Password!123";

  cy.visit("/");
  cy.get('a[href="/users/new"]').click();
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#confirmPassword").type(password);
  cy.get("#first-name").type("Mrtest");
  cy.get("#last-name").type("Testtest");
  cy.get('input[type="radio"][name="icon"][value=":)"].icon-radio').click();
  cy.get("#submit").click();
});
