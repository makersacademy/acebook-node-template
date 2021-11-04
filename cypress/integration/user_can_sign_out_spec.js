describe("Sign out", function() {
    it("should end session when user logs out", function() {
        cy.visitSignUpPage();
        cy.signUpNewUser("SignOut", "signout");

        cy.logOutUser();

        cy.visit("/posts");
        cy.get(".login-form").should("exist");
    });
    // it("should not have a sign out button for non-logged in users");
});