describe('User Profile - Same Name, Different Email and Password', () => {
    it('should show correct details for users with the same name', () => {
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');
        const user1Name = 'Tester1';
        const userEmail = 'Tests@test.com';
        const user1Password = 'Password!3';

        cy.visit('/users/signup');
        cy.get('#username').type(user1Name);
        cy.get('#email').type(userEmail);
        cy.get('#password').type(user1Password);
        cy.get('#submit-signup-button').click();
        cy.url().should('include', '/sessions/login');
        cy.get('#email').type(userEmail);
        cy.get('#password').type(user1Password);
        cy.get('#submit-login-button').click();
        cy.contains("Profile").click();
        cy.contains('p', user1Name);
        cy.contains('p', userEmail);
        cy.contains("Logout").click();
        cy.url().should('include', '/sessions/login');

        const user2Name = 'Tester2';
        const user2Password = 'Password!23';

        // Email should be unique
        cy.visit('/users/signup');
        cy.get('#username').type(user1Name);
        cy.get('#email').type(userEmail);
        cy.get('#password').type(user2Password);
        cy.get('#submit-signup-button').click();
        cy.url().should('include', '/users');
        // Assert that the error message is displayed
        cy.contains('User account already exists');
    });
});
