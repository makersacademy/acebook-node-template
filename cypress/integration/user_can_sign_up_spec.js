describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("pmonson@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("testusername");
    cy.get("#firstName").type("Paris");
    cy.get("#lastName").type("Monson");
    cy.get("#phoneNumber").type("0733704822");
    cy.get("#submit").click();
    cy.url().should("include", "/sessions/new");
  });
});
