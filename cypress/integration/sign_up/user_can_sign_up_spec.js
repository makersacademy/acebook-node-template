describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');
    // sign up
    cy.visit("/users/signup");
    cy.get("#username").type('Tester1');
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("Tester1!");
    cy.get("#submit-signup-button").click();

    cy.url().should("include", "/sessions/login");
  });
});
