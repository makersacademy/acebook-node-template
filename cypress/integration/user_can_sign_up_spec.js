describe("Form test", () => {
    it("Can fill the form", () => {
      cy.visit("/");
      cy.get("form");

      cy.get('input[name="name"]')
      .type("Molly")
      .should("have.value", "Molly");
    });
  });