it('allows a user to comment on a post', () => {
  cy.acebook.signUp();
  // submit a post
  cy.visit("/posts");
  cy.contains("New post").click();

  cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
  cy.get("#new-post-form").submit();

  //  click on comment button
  cy.get("#comment").click();
  cy.url().should("include", "/comment/new");

  cy.get("#new-comment-form").find('[type="text"]').type("This is a comment on a post");
  cy.get("#new-comment-form").submit();

  cy.url().should("include", "/comment");
});

