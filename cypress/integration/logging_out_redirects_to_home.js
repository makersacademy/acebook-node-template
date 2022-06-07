describe("Authentication", () => {
  it("A user signs up and in, signs out and is redirected to home", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get("#logout").click();
    cy.get(".title").should("contain", "Acebook");
  });
});
