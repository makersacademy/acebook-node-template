describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get("nav").should("contain", "Sign-up");
  });
});
