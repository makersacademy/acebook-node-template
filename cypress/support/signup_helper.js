const signUp = (email, password, username) => {
  cy.visit("/users/new");
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#username").type(username);
  cy.get("#submit").click();
};

module.exports = signUp;