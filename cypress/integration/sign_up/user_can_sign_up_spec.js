describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');
    // sign up
    cy.visit("/users/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/login");
  });
});
