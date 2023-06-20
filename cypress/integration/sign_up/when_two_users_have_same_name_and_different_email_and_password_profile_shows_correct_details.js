describe('User Profile - Same Name, Different Email and Password', () => {
    it('should show correct details for users with the same name', () => {
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');
        const userName = 'Tester';
        const user1Email = 'Test1@test.com';
        const user1Password = 'Password!3';

        cy.visit('/users/signup');
        cy.get('#username').type(userName);
        cy.get('#email').type(user1Email);
        cy.get('#password').type(user1Password);
        cy.get('#submit-signup-button').click();
        cy.url().should('include', '/sessions/login');
        cy.get('#email').type(user1Email);
        cy.get('#password').type(user1Password);
        cy.get('#submit-login-button').click();
        cy.contains("Profile").click();
        cy.contains('p', userName);
        cy.contains('p', user1Email);
        cy.contains("Logout").click();
        cy.url().should('include', '/sessions/login');

        const user2Email = 'test2@test.com';
        const user2Password = 'Password!23';

        // Username should be unique
        cy.visit('/users/signup');
        cy.get('#username').type(userName);
        cy.get('#email').type(user2Email);
        cy.get('#password').type(user2Password);
        cy.get('#submit-signup-button').click();
        cy.url().should('include', '/users');
        // Assert that the error message is displayed
        cy.contains('User account already exists');
    });
});
