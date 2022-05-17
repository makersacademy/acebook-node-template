describe("Help", () => {
  it("displays help and support info", () => {
    cy.visit("/help");
    cy.get(".title").should("contain", "Help and Support");
  });
});