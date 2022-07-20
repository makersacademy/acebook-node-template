const signUpAndSignIn = require("./webhelper");

describe("Timeline", () => {
  afterEach(() => {
    cy.task("dropPosts");
    cy.task("dropUsers");
  });

  it("can submit posts, when signed in, and view them", () => {
    // run webhelper to sign up and sign in to acebook
    signUpAndSignIn("Post", "Image");

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form")
      .find("#message")
      .type("This message also has an image")
      .find("#image-url")
      .type(
        "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      );
    cy.get("#new-post-form").submit();

    // check the post contains an image with url entered from the form
    cy.get(".posts").should("contain", "This message also has an image");
    cy.get(".posts")
      .find("img")
      .should(
        "have.attr",
        "src",
        "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      );
  });
});
