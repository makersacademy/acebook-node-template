import { signUp, signIn, submitPost } from "./web_helpers";

describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    signUp();

    // sign in
    signIn();

    // submit a post
    submitPost();

    cy.get(".posts").should("contain", "Hello, world!");
  });
});
