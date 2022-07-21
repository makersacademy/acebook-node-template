const signUpAndSignIn = require("./webhelper");

describe("Search", () => {
  afterEach(() => {
    cy.task("dropUsers");
  });

  it("has search bar on page", () => {
    //use webhelper to sign up and sign in
    signUpAndSignIn("Test", "User")

    // user clicks on link to 'Search' and are redirected to search page
    cy.contains("Search").click();
    cy.url().should("include", "/search")

    cy.contains("Enter search here")
  })

  it("function returns users that match search", () => {
    //use webhelper to sign up and sign in as user1, then logout
    signUpAndSignIn("Test", "User1")
    cy.contains("Sign Out").click();

    //use webhelper to sign up and sign in as user2, then logout
    signUpAndSignIn("Test", "User2")
    cy.contains("Sign Out").click();

    //use webhelper to sign up and sign in as user3
    signUpAndSignIn("Test", "User3")
    cy.contains("Search").click()

    //use search form to search for users named 'Test'
    cy.get("#search-form").find("#search").type("Test")
    cy.get("#search-form").submit()

    //assert that the three Test Users will be displayed on screen
    cy.contains("TestUser1")
    cy.contains("TestUser2")
    cy.contains("TestUser3")
  })
})