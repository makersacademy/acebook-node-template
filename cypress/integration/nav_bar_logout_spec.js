describe("Navbar home button", () => {
  it("navigates to the home page", () => {
    cy.visit("/");
    cy.get("#log-in").click();
    
  });
});
