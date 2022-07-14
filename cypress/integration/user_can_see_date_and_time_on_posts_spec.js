import { signUp, signIn, submitPost } from "./web_helpers";

describe("Timeline", () => {
  it("can submit a post and see the date and time of it", () => {
    // sign up
    signUp();

    // sign in
    signIn();

    // submit a post
    submitPost();

    cy.get(".posts").should("contain", "Example Post from Cypress Testing");
    cy.get(".posts").get("#createdAt").should("contain", )
  });
});