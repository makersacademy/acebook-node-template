describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    // sign up
    cy.visit("/sessions/new");
    cy.get("#email").type("someone4@example.com");
    cy.get("#password").type("password4");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });
});
