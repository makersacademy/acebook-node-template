import { signUp, signIn, submitPost } from "./web_helpers";

describe("Timeline", () => {
  it("can add a comment to a post", () => {
    // sign up
    signUp();

    // sign in
    signIn();

    // submit a post
    submitPost();

    //add the comment to the newest post
    cy.get("#new-comment-form").first()
      .find('[type="text"]')
      .type("Example comment from Cypress Testing");
    cy.get("#new-comment-form").submit();
    cy.get(".comment-text").first().should("have.text", "Example comment from Cypress Testing");
  });
});