const signIn = (email, password) => {
  cy.visit("/");
  cy.get("#LogInEmail").type(email);
  cy.get("#LogInPassword").type(password);
  cy.get("#LogInSubmit").click();
};

module.exports = signIn;