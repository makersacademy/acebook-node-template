const signUp = () => {
  cy.visit("/users/new");
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();
};

module.exports = signUp;