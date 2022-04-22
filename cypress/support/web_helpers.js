const signUp = () => {
  cy.visit("/");
  cy.get("#sign-up").click();
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#username").type("username");
  cy.get("#submit").click();
};

const signIn = () => {
  cy.visit("/");
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();
};

const submitPost = () => {
  cy.visit("/posts");
  cy.get("message").type("Hello, world!");
  cy.get("#new-post-form").submit();
};

module.exports = {
  signUp,
  signIn,
  submitPost,
};
