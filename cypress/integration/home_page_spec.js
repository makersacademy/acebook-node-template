describe("Home page", () => {
  it("has a title", () => {
    cy.task("wipe_database");
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });
});
