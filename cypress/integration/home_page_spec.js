describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });

  it("has a sign-up button", () => {
    cy.visit("/");
    cy.get("#sign-up-button").click();

    cy.url().should("include", "/users/new");
  })
});
