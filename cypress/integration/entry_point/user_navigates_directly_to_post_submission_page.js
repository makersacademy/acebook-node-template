describe("Authentication", () => {
    it("A user attempts to navigate to new post and is redirected to sign in", () => {
        //clearDB drops the DB for a fresh test environment
        cy.task('clearDb');

        // go directly to new posts, do not sign up, do not pass go, do not collect £200
        cy.visit("/posts/new");

        // check that "new-post-form" isnt visible on the screen
        cy.get("#new-post-form").should('not.exist');

        // check the redirect
        cy.url().should("contain", "/sessions/login");
    });
});