describe("Session Handling", () => {
    it("A logged in user can log out and is unable to navigate to posts", () => {
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');
        
        // sign up
        cy.visit("/users/signup");
        cy.get("#username").type("User1");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("mPgaN5s51g!");
        cy.get("#submit-signup-button").click();

        // sign in
        cy.visit("/sessions/login");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("mPgaN5s51g!");
        cy.get("#submit-login-button").click();

        // log out
        cy.get('nav > ul > li').contains('Logout').click();

        // check redirect to log in
        cy.url().should('contain', '/sessions/login');

        // atempt to navigate to posts
        cy.visit("/posts")

        // check that "new post" isnt visible on the screen
        cy.contains('New post').should('not.exist');
    });
});