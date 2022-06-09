describe("Navbar home button", () => {
  it("navigates to the home page", () => {
    cy.visit("/users/new");
    cy.get("#home").click();
    cy.url().should("eq", "http://localhost:3030/");
  });
});
