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

    cy.contains("search page")
  })

  it.skip("function returns users that match search", () => {
    //use webhelper to sign up and sign in as user1
    signUpAndSignIn("Test", "User1")

    //user1 makes a post and logs out
    cy.contains("New post").click();
    cy.get("#new-post-form").find('#message').type("A post by user1");
    cy.get("#new-post-form").submit();
    cy.contains("Sign Out").click();

    //use webhelper to sign up and sign in as user1
    signUpAndSignIn("Test", "User1")

    //user1 makes a post and logs out
    cy.contains("New post").click();
    cy.get("#new-post-form").find('#message').type("A post by user1");
    cy.get("#new-post-form").submit();
    cy.contains("Sign Out").click();

    //drop posts collection
    cy.task("dropPosts")
  })
})