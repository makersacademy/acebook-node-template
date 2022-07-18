const signUpAndSignIn = require("./webhelper");

describe("Authentication", () => {
  afterEach(() => {
    cy.task("dropUsers");
  });

  it("A user signs in and is redirected to /posts", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");

  });

});
