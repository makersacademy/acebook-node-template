describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get("#Log in").click();
    cy.get(".title").should("contain", "Log in");
  });
});
