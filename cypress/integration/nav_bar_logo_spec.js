describe("Navbar logo", () => {
  it("navbar has a logo", () => {
    cy.visit("/");
    cy.get("#logo").should("contain", "Logo");
  });
});
