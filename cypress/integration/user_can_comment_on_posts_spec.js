describe("Timeline", () => {
  it("user can comment on posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("Name");
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("password");
    cy.get("#signup-button").click();

    // sign in
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();

    // submit a post
    cy.contains("Post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    //comment on a post
    cy.get("#drop-down").click();
    cy.get("#new-comment-form")
      .find('[type="text"]')
      .type("yet another comment");
    cy.get("#new-comment-form").submit();
    cy.get("#drop-down").click();
    //expect
    cy.get(".comments").first().should("contain", "yet another comment");
  });
});
