describe('User Sign Up - Email Boundary Value', () => {
    it('Error message and url check for if Email is empty', () => {
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');
        const username = 'Tester1'
        const validPassword = 'Tester!1';

        cy.visit('/users/signup');

        //sign up
        cy.get("#username").type(username);
        cy.get("#password").type(validPassword);
        cy.get("#submit-signup-button").click();

        // Assert that the user stays on the signup page
        cy.url().should('include', '/users/signup');

        // Assert that the error message is displayed
        cy.on('window:alert',(t)=>{
            //assertions
            expect(t).to.contains('You must enter a valid email address');
        });
    });
});