import { signUp, signIn, submitPost } from "./web_helpers";

describe("Timeline", () => {
  it("shows posts in reverse chronological order", () => {
    // sign up
    signUp();

    // sign in
    signIn();

    // submit a post
    submitPost();

    cy.contains("New post").click();
    cy.get("#new-post-form")
      .find('[type="text"]')
      .type("Second post, should appear first");
    cy.get("#new-post-form").submit();

    cy.get(".post-text")
      .first()
      .should("have.text", "Second post, should appear first, Mongo");
  });
});

