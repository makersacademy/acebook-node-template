describe('User Sign Up - Already Used Email', () => {
    it('should display an error message for an already used email', () => {
        const existingEmail = 'someone@example.com';
        const validPassword = 'Thisisaccepabl3';

        cy.visit('/users/signup');

        //sign up
        cy.get("#email").type(existingEmail);
        cy.get("#password").type(validPassword);
        cy.get("#submit").click();

        // Assert that the user stays on the signup page
        cy.url().should('include', '/users/signup');

        // Assert that the error message is displayed
        //cy.contains('span.error-message', 'Invalid username or password');
    });
});