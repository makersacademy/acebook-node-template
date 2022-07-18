const signUpAndSignIn = require("./webhelper");

describe("Timeline", () => {
  afterEach(() => {
    cy.task("dropPosts");
    cy.task("dropUsers)");
  });

  it("displays comment text box and comment button ", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find('[type="text"]')
      .type("to try if comments work.");
    cy.get("#new-post-form").submit();

    cy.visit('/posts')
    cy.get('#comment').type("test comment").submit()

    cy.get(".comments").should("contain", "test comment" )
  });
});