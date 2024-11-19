describe("Timeline", () => {
  it("can submit posts, when signed in, and view them displayed in reverse chronological order", () => {
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
    
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Goodbye, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts>li").eq(0).should("contain", "Goodbye, world!");
    cy.get(".posts>li").eq(1).should("contain", "Hello, world!");
    
  });
});
