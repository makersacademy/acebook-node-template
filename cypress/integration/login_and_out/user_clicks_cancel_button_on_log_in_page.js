describe("log in functionality", () => {
    it("A user clicks the cancel button on log in page and the form is cleared", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');
    // sign up
    cy.visit("/users/signup");
    cy.get("#username").type("User1");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("mPgaN5s51g!");
    cy.get("#submit-signup-button").click();

    // visit the log in page, fill fields and click cancel
    cy.visit("/sessions/login");
    cy.get("#email").type("a test string");
    cy.get("#password").type("*");
    cy.get("#cancel").click();
    
    // check that email and password fields are cleared

    cy.get("#email").should('have.value', '');
    cy.get("#password").should('have.value', '');
    });
});