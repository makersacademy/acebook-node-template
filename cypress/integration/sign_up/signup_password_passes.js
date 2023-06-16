describe('User Sign Up - Password Boundary Value', () => {
    it('should test a variety of passwords on and over the character boundry', () => {
        const username = 'Tester1'
        const validEmail = 'tester@example.com';
        const validPassword = 'hi345678';
        const alsovalidPassword = 'hi23456789';

        cy.visit('/users/signup');

        //sign up - 8 characters
        cy.get("#username").type(username);
        cy.get("#email").type(validEmail);
        cy.get("#password").type(validPassword);
        cy.get("#submit").click();
        cy.url().should('include', '/sessions/login');

        //sign up - 9 characters
        cy.visit('/users/signup');
        cy.get("#username").type(username);
        cy.get("#email").type(validEmail);
        cy.get("#password").type(alsovalidPassword);
        cy.get("#submit").click();
        cy.url().should('include', '/sessions/login');
    });
});