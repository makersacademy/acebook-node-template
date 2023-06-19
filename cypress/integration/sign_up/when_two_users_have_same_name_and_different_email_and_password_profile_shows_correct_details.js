describe('User Profile - Same Name, Different Email and Password', () => {
    it('should show correct details for users with the same name', () => {
    const userName = 'Tester';
    const user1Email = 'someone1@example.com';
    const user1Password = 'Password123';

    cy.visit('/users/signup');
    cy.get('#username').type(userName);
    cy.get('#email').type(user1Email);
    cy.get('#password').type(user1Password);
    cy.get('#submit').click();
    cy.url().should('include', '/sessions/login');
    cy.get('#email').type(user1Email);
    cy.get('#password').type(user1Password);
    cy.get('#submit').click();
    cy.contains("Logout").click();
    cy.url().should('include', '/sessions/login');

    const user2Email = 'someone2@example.com';
    const user2Password = 'Pass123';

    cy.visit('/users/signup');
    cy.get('#username').type(userName);
    cy.get('#email').type(user2Email);
    cy.get('#password').type(user2Password);
    cy.get('#submit').click();
    cy.get('#email').type(user2Email);
    cy.get('#password').type(user2Password);
    cy.get('#submit').click();
    // cy.contains("Logout").click();
    // cy.url().should('include', '/sessions/login');
    cy.contains("Profile").click();


    cy.contains('p', userName);
    cy.contains('p', user2Email);
    });
});
