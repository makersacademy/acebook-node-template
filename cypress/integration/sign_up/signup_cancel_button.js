describe("User Sign Up - Cancel Button Functionality", () => {
    it("A user clicks the cancel button on log in page and the form is cleared", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');

    // sign up
    cy.visit("/users/signup");
    cy.get("#username").type("Tester");
    cy.get("#email").type("Test@test.com");
    cy.get("#password").type("Tester1!");
    cy.get("#submit-signup-button").click();

    // visit the log in page, fill fields and click cancel
    cy.visit("/sessions/login");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("oooooooo");
    cy.get("#cancel").click();
    
    // check that email and password fields are cleared

    cy.get("#email").should('have.value', '');
    cy.get("#password").should('have.value', '');
    });
});