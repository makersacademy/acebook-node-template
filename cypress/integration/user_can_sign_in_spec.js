describe("Authentication", () => {
  beforeEach(() => {
    cy.task("clearUsers");
  });

  it("A user signs in and is redirected to /posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("anothersomeusername");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("pA$sw0rd");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("pA$sw0rd");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.contains("New post");
  });
});
