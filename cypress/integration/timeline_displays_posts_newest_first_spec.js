describe("Timeline", () => {
  it("displays posts most recent first", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("TestUser");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit first post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("First post");
    cy.get("#new-post-form").submit();

     // submit second post
     cy.visit("/posts");
     cy.contains("New post").click();
 
     cy.get("#new-post-form").find('[type="text"]').type("Second post");
     cy.get("#new-post-form").submit();

    cy.get(".posts").first().should("contain", "Second post");
  });
});
