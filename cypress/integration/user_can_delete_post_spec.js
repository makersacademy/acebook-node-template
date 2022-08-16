const signUpAndSignIn = (firstName, lastName) => {
  // sign up
  cy.visit("/users/new");

  cy.get("#firstName").type(firstName);
  cy.get("#lastName").type(lastName);

  // cy.get("#username").type(`${firstName}${lastName}`);

  cy.get("#birthday").type("1996-08-24");
  cy.get("#location").type("London");

  cy.get("#email").type(`${firstName}${lastName}@cypress.com`);
  cy.get("#password").type("password");

  cy.get("#submit").click();

  // sign in
  cy.visit("/sessions/new");
  cy.get("#email").type(`${firstName}${lastName}@cypress.com`);
  cy.get("#password").type("password");
  cy.get("#submit").click();

  // submit a post
  cy.visit("/posts");
  cy.contains("New post").click();

  cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
  cy.get("#new-post-form").submit();

  cy.get(".posts").should("contain", "Hello, world!");
  
  // delete a post
  cy.get("delete-post-form").submit();
}

module.exports = signUpAndSignIn
