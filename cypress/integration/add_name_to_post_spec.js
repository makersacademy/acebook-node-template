import { signUp, signIn, submitPost } from "./web_helpers";

describe("Adding a name to a post", () => {
  it("checks the author of a post", () => {
    // sign up
    signUp();

    // sign in
    signIn();

    // submit a post
    submitPost();

    cy.get(".posts").should("contain", "Mongo");
  });
});
