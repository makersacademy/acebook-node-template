describe("Contact us", () => {
  it("displays contact info", () => {
    cy.visit("/contact");
    cy.get(".title").should("contain", "Contact Us");
  });
});