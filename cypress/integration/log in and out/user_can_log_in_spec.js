describe("Authentication", () => {
  it("A user signs in and is redirected on successfully sign in", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');
    // sign up
    cy.visit("/users/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("mPgaN5s51g!");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("mPgaN5s51g!");
    cy.get("#submit").click();

    cy.url().should("not.equal", "/sessions/login");
  });
});
