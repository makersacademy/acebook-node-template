import { signUp, signIn, submitPost } from "./web_helpers";

describe("Timeline", () => {
  it("can delete a post", () => {
    
    signUp();
    signIn();
    submitPost();

    // delete a post
    cy.visit("/posts")
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("This post is to be deleted");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "This post is to be deleted");
    console.log('Hi Jo')
    cy.get("#delete this post").click();
    cy.get(".posts").should("contain", "");
  });
});
