describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("pmonson32@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("testusername32");
    cy.get("#firstName").type("Paris32");
    cy.get("#lastName").type("Monson32");
    cy.get("#phoneNumber").type("07337048223");
    cy.get("#submit").click();
    cy.url().should("include", "/sessions/new");
  });
});
