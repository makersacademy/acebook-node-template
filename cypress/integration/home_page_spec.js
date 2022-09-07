describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
    cy.contains("h1", "Log in");
  });
});
