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

// Alternatively you can use CommonJS syntax:
beforeEach(async () => {
  // This runs prior to every test and clears all the data
  await cy.task("resetDb");
});

// ran at the end of each specs
after(() => {
  cy.task("closeDbConnection");
});
