describe("Home page", () => {
  it.skip("has a title", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });
});
