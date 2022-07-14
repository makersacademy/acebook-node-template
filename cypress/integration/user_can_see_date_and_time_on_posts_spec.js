import { signUp, signIn, submitPost } from "./web_helpers";

describe("Timeline", () => {
  it("can submit a post and see the date and time of it", () => {
    // sign up
    signUp();

    // sign in
    signIn();

    // submit a post
    submitPost();
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const date = today.getFullYear();
    cy.get(".posts").should("contain", "Example Post from Cypress Testing");
    cy.get(".datestamp").first().should("contain", `${date}`);
  });
});
