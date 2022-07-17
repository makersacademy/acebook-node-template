const signUpAndSignIn = require("./webhelper");

describe("Timeline", () => {
  afterEach(() => {
    cy.task("dropPosts");
    cy.task("dropUsers");
  });

  it("can submit posts, when signed in, and view them", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find('[type="text"]')
      .type("Test message: cypress submit post test!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should(
      "contain",
      "Test message: cypress submit post test!"
    );
    cy.get(".posts").should("contain", "CypressTestUser");
    cy.get(".posts").should("contain", "2022");
  });
});
