const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')
const submitPost = require('../support/submitpost_helper')

describe("Timeline", () => {
  it("can submit posts, when signed in, and view them displayed in reverse chronological order", () => {
    signUp();
    signIn();
    submitPost("Hello, world!");
    submitPost("Goodbye, world!");
    cy.get(".post").eq(0).should("contain", "Goodbye, world!");
    cy.get(".post").eq(1).should("contain", "Hello, world!");
  });
});
