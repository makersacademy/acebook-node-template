describe("Navbar home button", () => {
  it("navigates to the home page", () => {
    cy.visit("/");
    cy.get("#sign-up").click();
    cy.url().should("include", "/users/new?");
  });
});
