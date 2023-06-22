describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get("#Sign-up").click();
    cy.get(".title").should("contain", "Sign-up");
  });
});
