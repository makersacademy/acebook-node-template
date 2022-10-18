describe("dates", () => {
  it("posts and comments display dates", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("someone");
    cy.get("#email").type("someone6@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone6@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.contains("Make a post").click();
    cy.get("#message").type("Cypress test post!");
    cy.get("#submit").click();

    //submit a comment
    cy.get(".comment-input:first").type("A comment");
    cy.get(".submit-comment:first").click();

    cy.get(".comments:first").should("contain", "A comment");
    cy.get(".comments:first").should("contain", "someone");

    //Get the current date
    const date = new Date();
    const y = date.getFullYear();
    const m = date.toLocaleString("default", { month: "short" });
    const output = `${m}-${y}`;
    
    cy.get(".posts:first").find(".post-date").should("contain", output);
    cy.get(".post:first")
      .find(".comment:first")
      .within(() => {
        cy.get(".comment-date").should("contain", output);
      });
  });
});
