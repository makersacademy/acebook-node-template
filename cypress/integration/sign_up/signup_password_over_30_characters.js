describe('User Sign Up - Password Boundary Value', () => {
    it('should test a variety of passwords on and over the character boundary', () => {
        const validEmail = 'tester@example.com';

        cy.visit('/users/signup');

        // Password on the boundary of 30 characters
        cy.get("#email").type(validEmail);
        cy.get("#password").type('123456789012345678901234567890');
        cy.get("#submit").click();
        cy.url().should('include', '/sessions/login');

        // Password under the boundary of 30 characters
        cy.visit('/users/signup');
        cy.get("#email").type(validEmail);
        cy.get("#password").type('12345678901234567890123456789');
        cy.get("#submit").click();
        cy.url().should('include', '/sessions/login');

        // Password over the boundary of 30 characters
        cy.visit('/users/signup');
        cy.get("#email").type(validEmail);
        cy.get("#password").type('1234567890123456789012345678901');
        cy.get("#submit").click();
        cy.url().should('include', '/users/signup');
        // cy.contains('span.error-message', 'Too many characters');
    });
});