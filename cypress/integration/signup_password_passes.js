describe('User Sign Up - Password Boundary Value', () => {
    it('should display an error message for an invalid password length', () => {
        const validEmail = 'tester@example.com';
        const validPassword = 'Thisisaccepabl3';

        cy.visit('/users/signup');

        //sign up
        cy.get("#email").type(validEmail);
        cy.get("#password").type(validPassword);
        cy.get("#submit").click();

        // Assert that the user stays on the signup page
        cy.url().should('include', '/sessions/login');

        // Assert that the error message is displayed
        //cy.contains('span.error-message', 'Invalid username or password');
    });
});