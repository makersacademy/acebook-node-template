describe("Authentication", () => {
    it("A user signs in with an incorrect password and an error message is displayed", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');
    // sign up
    cy.visit("/users/signup");
    cy.get("#username").type("User1");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("mPgaN5s51g!");
    cy.get("#submit-signup-button").click();

    // sign in
    cy.visit("/sessions/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit-login-button").click();
    
    // check for error message, NOTE: this checks the entire page and as such will fail if this text is anywhere on the page. Potential area for refactoring
    cy.contains('Invalid email or password');
    });
});