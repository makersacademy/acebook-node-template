import { signUp } from "./web_helpers";

describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up

    signUp();


    cy.url().should("include", "/sessions/new");
  });
});
