describe("Home page", () => {
  it("has a title", () => {
    cy.exec("npm run seed");
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });
});
