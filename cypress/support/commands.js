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

Cypress.Commands.add("visitSignUpPage", function() {
    cy.visit('/');
    cy.contains('Sign Up').click();
});

Cypress.Commands.add("signUpNewUser", function(name, email) {
    cy.get('#new-user-form').find('#name').type(name);
    cy.get('#new-user-form').find('#email').type(`${email}@example.com`);
    cy.get('#new-user-form').find('#password').type('12345');
    cy.get('#new-user-form').submit();
});