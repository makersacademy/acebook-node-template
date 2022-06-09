describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get(".logo").should("contain", "Makebook");
  });
});
