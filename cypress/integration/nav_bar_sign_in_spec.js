describe("Navbar home button", () => {
  it("navigates new session page", () => {
    cy.visit("/");
    cy.get("#log-in").click();
    cy.url().should('include', 'sessions/new')
  });
});
