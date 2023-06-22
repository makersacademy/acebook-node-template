// describe('User Sign Up - Password Boundary Value', () => {
//     it('Error message and url check for if password is empty', () => {
//         const username = 'Tester1'
//         const validEmail = 'someone@example.com';

//         cy.visit('/users/signup');

//         //sign up
//         cy.get("#username").type(username);
//         cy.get("#email").type(validEmail);
//         cy.get("#submit").click();

//         // Assert that the user stays on the signup page
//         cy.url().should('include', '/users/signup');

//         // Assert that the error message is displayed
//         //cy.contains('span.error-message', 'Invalid username or password');
//     });
// });