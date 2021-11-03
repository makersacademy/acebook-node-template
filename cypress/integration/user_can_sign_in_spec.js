describe("Sign in", function () {
  it("can sign in a returning user", function () {
    cy.visitSignUpPage();
    cy.signUpNewUser("freddy", "freddy");
    cy.signInUser("freddy", "12345");

    cy.get("h1").should("contain", "Timeline");
  });

  // TODO: Handle duplicate user sign up

  // it("Doesn't allow pre-existing users to sign up again", function () {
  //   cy.visitSignUpPage();
  //   cy.signUpNewUser("Hermione Granger", "hermione");
  //   cy.get("title").should("contain", "Log In");
  // });
});
