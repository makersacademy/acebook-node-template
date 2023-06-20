describe('User Sign Up - Password Boundary Value', () => {
    it('should test a variety of passwords on and over the character boundry', () => {
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');
        const username = 'Tester1'
        const validEmail = 'tester1@example.com';
        const validPassword = 'H!i345678';

        cy.visit('/users/signup');

        //sign up - 8 characters
        cy.get("#username").type(username);
        cy.get("#email").type(validEmail);
        cy.get("#password").type(validPassword);
        cy.get("#submit-signup-button").click();
        cy.url().should('include', '/sessions/login');
    });
});