const signUp = () => {
  cy.visit("/users/new");
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#username").type("username");
  cy.get("#submit").click();
}

const signIn = () => {
  cy.visit("/sessions/new");
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();
}

const submitPost = () => {
  cy.visit("/posts");
  cy.contains("New post").click();

  cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
  cy.get("#new-post-form").submit();
}

module.exports = { 
  signUp,
  signIn,
  submitPost
}
