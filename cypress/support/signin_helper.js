const signIn = (email, password) => {
  cy.visit("/sessions/new");
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#submit").click();
};

module.exports = signIn;