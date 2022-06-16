const signUp = (email, password, username) => {
  cy.visit("/");
  cy.get("#CreateAccountButton").click();
  cy.get("#SignUpEmail").type(email);
  cy.get("#SignUpPassword").type(password);
  cy.get("#SignUpUsername").type(username);
  cy.get("#SignUpSubmit").click();
};

module.exports = signUp;