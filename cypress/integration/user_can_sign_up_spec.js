describe('Sign up', function() {
    // before(async(done) => {
    //     await cy.task("db:drop:all");
    //     done();
    // })

    it('can make a new account', function() {
        cy.exec("mongo acebook_test --eval 'db.users.deleteMany({});'")

        cy.visitSignUpPage();
        cy.signUpNewUser("Hermione Granger", "hermione");

        cy.get('h1').should('contain', 'Timeline');
    });

    // TODO: Handle duplicate user sign up

    // it("Doesn't allow pre-existing users to sign up again", function() {
    //     cy.visitSignUpPage();
    //     cy.signUpNewUser("Hermione Granger", "hermione");
    // });
});