describe('User Sign Up - Already Used Account', () => {
    it('should display an error message for an account already active', () => {
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');
        const username = 'Tester1'
        const existingEmail = 'test@test.com';
        const validPassword = 'Tester1!';

        cy.visit('/users/signup');

        //sign up - initial
        cy.get("#username").type(username);
        cy.get("#email").type(existingEmail);
        cy.get("#password").type(validPassword);
        cy.get("#submit-signup-button").click();

        // This section is needed for when running the test solo - not needed when running as part of the test suite 

        // Assert that the user stays on the signup page
        cy.url().should('include', '/sessions/login');

        cy.visit('/users/signup');

        //sign up - second sign up
        cy.get("#username").type(username);
        cy.get("#email").type(existingEmail);
        cy.get("#password").type(validPassword);
        cy.get("#submit-signup-button").click();

        cy.url().should('include', '/users');


        // Assert that the error message is displayed
        cy.contains('User account already exists');
    });
});