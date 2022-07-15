describe("User signed in page", () => {
    it("has a sign out button when the user is logged in", () => {
        cy.visit("/");
        cy.get("#login-button").should("contain", "Log In");
        cy.get("#sign-up-button").should("contain", "Sign Up");

        // sign up
        cy.visit("/users/new");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();

        // sign in
        cy.visit("/sessions/new");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        
        cy.get("#sign-out-button").should("contain", "Sign Out");
    })
})