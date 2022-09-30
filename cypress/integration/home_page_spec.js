describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get('div[class="welcome"]').find("img").should('be.visible');
  });
});
