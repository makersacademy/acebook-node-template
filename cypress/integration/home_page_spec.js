describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });
  it("has a sign up button", () => {
    cy.visit("/");
    cy.get("form").contains("Sign Up").click();
  });
  it("has a sign in button", () => {
    cy.visit("/");
    cy.get("form").contains("Sign In").click();
  });
  it("Allows you to choose sign in from home", () => {
    // sign up
    cy.visit("/");

    cy.get("#signin").click();

    // sign in
    cy.url().should("include", "/sessions/new");
  });
  it("Allows choosing to sign up from home", () => {
    // sign up
    cy.visit("/");
    cy.get("#signup").click();

    cy.url().should("include", "/users/new");
  });
  it("redirects to home if not signed in", () => {
    cy.visit("/posts");
    cy.url().should("include", "/");
    cy.get("form").contains("Sign In").click();
  });
});
