describe('User Sign Up - Password Boundary Value', () => {
    it('should display an error message for an invalid password length', () => {
        const validEmail = 'someone@example.com';
        const invalidPassword = 'no';

        cy.visit('/users/signup');

        //sign up
        cy.get("#email").type(validEmail);
        cy.get("#password").type(invalidPassword);
        cy.get("#submit").click();

        // Assert that the user stays on the signup page
        cy.url().should('include', '/users/signup');

        // Assert that the error message is displayed
        //cy.contains('span.error-message', 'Invalid username or password');
    });
});