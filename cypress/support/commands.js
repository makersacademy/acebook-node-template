import 'cypress-file-upload';
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

Cypress.Commands.add('visitSignUpPage', function () {
  cy.visit('/');
  cy.contains('Sign Up').click();
});

Cypress.Commands.add('visitSignInPage', function () {
  cy.visit('/');
  cy.contains('Log in').click();
});

Cypress.Commands.add('signUpNewUser', function (name, email) {
  cy.deleteUser(email);
  cy.get('#new-user-form').find('#name').type(name);
  cy.get('#new-user-form').find('#email').type(`${email}@example.com`);
  cy.get('#new-user-form').find('#password').type('12345');
  cy.get('#new-user-form').submit();
});

Cypress.Commands.add('signUpExistingUser', function (name, email) {
  cy.get('#new-user-form').find('#name').type(name);
  cy.get('#new-user-form').find('#email').type(`${email}@example.com`);
  cy.get('#new-user-form').find('#password').type('12345');
  cy.get('#new-user-form').submit();
});

Cypress.Commands.add('signInUser', function (email, password) {
  cy.get('#new-session-form').find('#email').type(`${email}@example.com`);
  cy.get('#new-session-form').find('#password').type(password);
  cy.get('#new-session-form').submit();
});

Cypress.Commands.add('deleteUser', function (email) {
  cy.exec(
    `mongo acebook_test --eval 'db.users.deleteOne({email: "${email}@example.com"})'`
  );
});

Cypress.Commands.add('logOutUser', function () {
  cy.visit('/');
  cy.get('#logout-button').click();
});

Cypress.Commands.add('makeTestPost', function () {
  cy.visit('/posts/new');
  cy.get('#new-post-form').find('[type="text"]').type('Panda');
  cy.get('#new-post-form').find('[type="file"]').attachFile('../panda.jpg');
  cy.get('#new-post-form').submit();
});

Cypress.Commands.add('makeTestPostWithoutImage', function () {
  cy.visit('/posts/new');
  cy.get('#new-post-form').find('[type="text"]').type('Panda');
  cy.get('#new-post-form').submit();
});
