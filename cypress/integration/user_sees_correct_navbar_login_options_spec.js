describe("Home Page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });

  it ("it has a login button that can be clicked", () => {
    cy.visit("/");
    cy.contains("Log in").click();
    cy.url().should("include", "/sessions/new");
  });
});
