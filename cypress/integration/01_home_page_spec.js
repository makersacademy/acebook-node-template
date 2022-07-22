describe("Home page", () => {
  it("has a title", () => {
    // Visits homepage
    cy.visit("/");
    cy.get(".title").should("contain", "WELCOME MOTHER-ZUCKERS.");
  });
});
