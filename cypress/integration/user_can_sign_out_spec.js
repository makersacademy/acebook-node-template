const signUpAndSignIn = require("./webhelper");

describe("Authentication", () => {
  it("A user can Sign out After Signing in", () => {
    // use webhelper to sign up and sign in
    signUpAndSignIn("Test", "User")

    cy.url().should("include", "/posts");

    // Sign back Out
    cy.contains("Sign Out").click();
    cy.url().should("include", "/");
  });

});
