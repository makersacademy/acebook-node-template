const signUpAndSignIn = require("./webhelper");

describe("Timeline", () => {
  afterEach(() => {
    cy.task("dropUsers");
  });

  it("displays posts most recent first", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

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

    cy.get(".posts").first().should("contain", "Second post");

    // use webhelper to drop posts database
    cy.task("dropPosts")
  });

  it("can navigate to other users profile page using the username on the post", () => {
     // sign up, sign in, and make post as different user
    cy.visit("/users/new");
    cy.get("#firstName").type("Someone");
    cy.get("#lastName").type("Else");
    cy.get("#username").type("AnotherTestUser");
    cy.get("#email").type("test2@cypress.com");
    cy.get("#password").type("password123");
    cy.get("#submit").click();

    cy.get("#email").type("test2@cypress.com");
    cy.get("#password").type("password123");
    cy.get("#submit").click();

    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find('[type="text"]')
      .type("Look at my profile");
    cy.get("#new-post-form").submit();

    cy.contains("Sign Out").click();
    cy.url().should("include", "/");

    // use webhelper to sign up and sign in
    signUpAndSignIn();

    cy.get(".username > a").click();

    cy.url().should("include", "/profile/AnotherTestUser");
    cy.contains("Someone Else")

    // use webhelper to drop posts database
    cy.task("dropPosts")
    })

  it("Profile page link redirects to profile page", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

    // user clicks on link to 'Profile Page'
    cy.contains("Profile Page").click();

    // page contains the username
    cy.url().should("include", "/user/CypressTestUser")
  })
});

