describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });

  it("Navigates to Sign up page from Home", () => {
    cy.visit("/");
    cy.get("#submit").click();
    cy.url().should("include", "/sessions/new");
  });
});
