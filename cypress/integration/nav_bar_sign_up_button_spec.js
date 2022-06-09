describe("Navbar sign-up button", () => {
  it("navigates to the sign up page", () => {
    cy.visit("/");
    cy.get("#sign-up").click();
    cy.url().should("include", "/users/new");
  });
});
