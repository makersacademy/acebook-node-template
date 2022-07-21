const signUpAndSignIn = require("./webhelper");

describe("Timeline", () => {
  afterEach(() => {
    cy.task("dropUsers");
  });

  it("displays posts most recent first", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn("Test", "User");

    // submit first post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('#message').type("First post");
    cy.get("#new-post-form").submit();

    // submit second post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('#message').type("Second post");
    cy.get("#new-post-form").submit();

    // assert that the first post on the page is the most recently posted
    cy.get(".posts").first().should("contain", "Second post");

    // use webhelper to drop posts database
    cy.task("dropPosts")
  });

  it("can navigate to other users profile page using the username on the post", () => {
     // sign up, sign in, and make post as different user
    signUpAndSignIn("Test", "User2")

    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find('#message')
      .type("Look at my profile");
    cy.get("#new-post-form").submit();

    cy.contains("Sign Out").click();
    cy.url().should("include", "/");

    // use webhelper to sign up and sign in
    signUpAndSignIn("Test", "User1");

    cy.get(".username > a").click();

    cy.url().should("include", "/profile/");
    cy.contains("Test User2")

    // use webhelper to drop posts database
    cy.task("dropPosts")
    })

  it("Profile page link redirects to profile page", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn("Test", "User1")

    // user clicks on link to 'Profile Page'
    cy.contains("Profile Page").click();

    // page contains the username
    cy.url().should("include", "/user/TestUser1")
  })
});

