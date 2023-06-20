describe('User Sign Up - Username Boundary Value', () => {
    it('Error message and url check for if username is empty', () => {
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');
        const userPassword = 'Tester1!'
        const validEmail = 'test1@test.com';

        cy.visit('/users/signup');

        //sign up
        cy.get("#password").type(userPassword);
        cy.get("#email").type(validEmail);
        cy.get("#submit-signup-button").click();

        // Assert that the user stays on the signup page
        cy.url().should('include', '/users/signup');

        // Assert that the error message is displayed
        cy.on('window:alert',(t)=>{
            //assertions
            expect(t).to.contains('You must enter your username');
        });
    });
});