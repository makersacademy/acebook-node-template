describe("Home page", () => {
    it("has a sign in and a sign up button when the user is not logged in", () => {
        cy.visit("/");
        cy.get("#login-button").should("contain", "Log In");
        cy.get("#sign-up-button").should("contain", "Sign Up");
    })
})