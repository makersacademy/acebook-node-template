describe("Sign up", function() {
    // before(async(done) => {
    //     await cy.task("db:drop:all");
    //     done();
    // })

    it("can make a new account", function() {
        cy.logOutUser();
        cy.deleteUser("hermione");
        cy.visitSignUpPage();
        cy.signUpNewUser("Hermione Granger", "hermione");

        cy.get("title").should("contain", "Posts");
        cy.get("#alert-message").should("contain", "Welcome, Hermione Granger!");
    });

    it("Doesn't allow pre-existing users to sign up again", function() {
        cy.visitSignUpPage();
        // sign up already created hermione
        cy.signUpExistingUser("Hermione Granger", "hermione");
        cy.get("title").should("contain", "Log In");
        cy.get("#alert-message").should("contain", "User already exists!");
    });
});