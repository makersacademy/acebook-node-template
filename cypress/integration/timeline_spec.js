const signUpAndSignIn = require("./webhelper");

describe("Timeline", () => {
  afterEach(() => {
    cy.task("dropPosts");
    cy.task("dropUsers");
  });

  it("displays posts most recent first", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn("Test", "User");

    // submit first post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("First post");
    cy.get("#new-post-form").submit();

    // submit second post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Second post");
    cy.get("#new-post-form").submit();

    // assert that the first post on the page is the most recently posted
    cy.get(".posts").first().should("contain", "Second post");
  });

  it("can navigate to other users profile page using the username on the post", () => {
     // sign up, sign in, and make post as different user
    signUpAndSignIn("Test", "User2")

    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find('[type="text"]')
      .type("Look at my profile");
    cy.get("#new-post-form").submit();

    cy.contains("Sign Out").click();
    cy.url().should("include", "/");

    // use webhelper to sign up and sign in
    signUpAndSignIn("Test", "User1");

    cy.get(".display-profile").submit();

    cy.url().should("include", "/profile/");
    cy.contains("Test User2")
    })
});
