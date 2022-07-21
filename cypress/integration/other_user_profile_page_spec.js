const signUpAndSignIn = require("./webhelper");

describe("Other user profile page", () => {
  afterEach(() => {
    cy.task("dropPosts");
    cy.task("dropUsers");
  });

  it("displays detailed information for other users on their profile page", () => {
    // use webhelper to sign up and sign in as a different user
    signUpAndSignIn("Test", "User2");

    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Look at my profile");
    cy.get("#new-post-form").submit();

    cy.contains("Sign Out").click();

    // use webhelper to sign up and sign in
    signUpAndSignIn("Test", "User2");

    cy.get(".username > a").click();

    // assert that the page contains detailed info
    cy.contains("Test User2");
    cy.contains("London");
    cy.contains("11 June 1999");
  });

  it("displays posts made by other users on their profile page", () => {
    // use webhelper to sign up and sign in as a different user
    signUpAndSignIn("Test", "User2");

    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Show this message");
    cy.get("#new-post-form").submit();

    cy.contains("Sign Out").click();
    cy.url().should("include", "/");

    // use webhelper to sign up and sign in
    signUpAndSignIn("Test", "User1");

    // make another post as new user
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Do not display");
    cy.get("#new-post-form").submit();

    // visit other user's profile page and only see post made by that user
    cy.get(".username > a").last().click();

    cy.get("ul").should(($post) => {
      expect($post).to.contain("Show this message");
      expect($post).not.to.include.text("Do not display");
    });
  });
});
