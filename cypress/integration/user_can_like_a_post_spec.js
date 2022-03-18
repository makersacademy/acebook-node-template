describe("Timeline", () => {
  it("Like count on a post increases by 1", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("Sample Name");
    cy.get("#username").type("Sample Username");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("PASSWORD");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("PASSWORD");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").first().get('#like').click();
    cy.get(".posts").first().get('#likecount').should("contain", "1");
 
  });
});
