describe("Timeline", () => {
it("delete a previously submitted post", () => {
  // sign up
  cy.visit("/users/new");
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();

  // sign in
  cy.visit("/sessions/new");
  cy.get("#email").type("someone@example.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();

  // submit a post
  cy.visit("/posts");
  cy.contains("New post").click();

  cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
  cy.get("#new-post-form").submit();

  // delete a post
  cy.get(".posts").first(".delete-post").click();
  
  cy.get(".posts").should('not.exist');
  });
})