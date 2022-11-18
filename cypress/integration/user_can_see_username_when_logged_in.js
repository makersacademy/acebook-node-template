describe("Nav bar", () => {
  it("can see username when user sign up", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someoneelse2@example.com");
    cy.get("#name").type("Testing User");
    cy.get("#password").type("Password1$");
    cy.get("#submit").click();

    // posts view
    cy.contains("Testing User");
  });

  it("can see username when user sign in", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someoneelse2@example.com");
    cy.get("#password").type("Password1$");
    cy.get("#submit").click();

    // posts view
    cy.contains("Testing User");
  });
});
