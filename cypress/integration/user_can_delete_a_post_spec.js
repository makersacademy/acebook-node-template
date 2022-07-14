import { signUp, signIn, submitPost } from "./web_helpers";

describe("Timeline", () => {
  it("can delete a post", () => {
    signUp();
    signIn();
    submitPost();

    // delete a post
    cy.visit("/posts");
    cy.get(".delete-button").first().click();
    cy.get(".posts").not("contain", "Example Post from Cypress Testing");
  });
});
