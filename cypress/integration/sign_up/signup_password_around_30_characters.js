describe('User Sign Up - Password Boundary Value', () => {
    it('should test a variety of passwords on and over the character boundary', () => {
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');
        const username = 'Tester1'
        const validEmail = 'tester@example.com';

        cy.visit('/users/signup');

        // Password on the boundary of 30 characters
        cy.get("#username").type(username);

        cy.get("#email").type(validEmail);
        cy.get("#password").type('ThisPasswordIsValidAnd30Chars!');
        cy.get("#submit-signup-button").click();
        cy.url().should('include', '/sessions/login');
        cy.task('clearDb');

        // Password under the boundary of 30 characters
        cy.visit('/users/signup');
        cy.get("#username").type(username);
        cy.get("#email").type(validEmail);
        cy.get("#password").type('ThisPasswordIsValidAnd29Chars');
        cy.get("#submit-signup-button").click();
        cy.url().should('include', '/sessions/login');
        cy.task('clearDb');

        // Password over the boundary of 30 characters
        cy.visit('/users/signup');
        cy.get("#username").type(username);
        cy.get("#email").type(validEmail);
        cy.get("#password").type('ThisPasswordIsValidAnd31Chars!*');
        cy.get("#submit-signup-button").click();
        cy.url().should('include', '/sessions/login');
        // cy.url().should('include', '/users/signup');
    });
});