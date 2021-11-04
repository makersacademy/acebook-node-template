describe("Sign in", function () {
  it("can sign in a returning user", function () {
    cy.visitSignUpPage();
    cy.signUpNewUser("freddy", "freddy");
    cy.signInUser("freddy", "12345");

    cy.get("h1").should("contain", "Timeline");
  });

  it("Doesn't allow log in for non-existing user", function () {
    cy.logOutUser();
    cy.signInUser("einstein", "12345");
    cy.get("title").should("contain", "Log In");
  });
});
