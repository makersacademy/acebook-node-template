describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get(".homepage-title").should("contain", "Acebook");
  });

  it("Navigates to Sign up page from Home", () => {
    cy.visit("/");
    cy.contains("Sign Up").click();
    cy.url().should("include", "/users/new");
  });

  it("Navigates to Sign in page from Home", () => {
    cy.visit("/");
    cy.contains("Sign In").click();
    cy.url().should("include", "/sessions/new");
  });
});
