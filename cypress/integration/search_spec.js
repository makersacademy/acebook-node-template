const signUpAndSignIn = require("./webhelper");

describe("Search", () => {
  afterEach(() => {
    cy.task("dropUsers");
  });

  it("has search bar on page", () => {
    //use webhelper to sign up and sign in
    signUpAndSignIn("Test", "User");

    // user clicks on link to 'Search' and are redirected to search page
    cy.get(".navbar").contains("Search").click();
    cy.url().should("include", "/search");

    cy.contains("Enter their name here");
  });