describe("Authentication", () => {
    it("A user attempts to navigate to posts and is redirected to sign in", () => {
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');

        // go directly to posts, do not sign up, do not pass go, do not collect £200
        cy.visit("/posts");

        // check that "new post" isnt visible on the screen
        cy.contains('New post').should('not.exist');

        // check the redirect
        cy.url().should("contain", "/sessions/login");
    });
});