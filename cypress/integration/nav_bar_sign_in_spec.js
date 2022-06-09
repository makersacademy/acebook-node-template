describe("Navbar sign-in button", () => {
  it("navigates to new session page", () => {
    cy.visit("/");
    cy.get("#log-in").click();
    cy.url().should('include', 'sessions/new')
  });
});
