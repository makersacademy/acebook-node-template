describe("Authentication", () => {
    it("A user signs in with an incorrect email address and an error message is displayed", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');
    // sign up
    cy.visit("/users/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("mPgaN5s51g!");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/login");
    cy.get("#email").type("howardmoon@example.com");
    cy.get("#password").type("mPgaN5s51g!");
    cy.get("#submit").click();
    
    // check for error message, NOTE: this checks the entire page and as such will fail if this text is anywhere on the page. Potential area for refactoring
    cy.contains('Invalid email or password');
    });
});