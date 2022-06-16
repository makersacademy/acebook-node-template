const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')
const submitPost = require('../support/submitpost_helper')

describe("Timeline", () => {

  it("can submit posts, when signed in, and view who made them, test with two users both making posts", () => {
    signUp("jerrysmith@example.com", "password", "Jerry Smith");
    signIn("jerrysmith@example.com", "password");
    submitPost("Hello,world");

    signUp("BorisJohnson@example.com", "password", "Boris Johnson");
    signIn("BorisJohnson@example.com", "password");
    submitPost("Hello,world");
  
    // test to see the username displayed for both posts
    cy.get(".posts>div.post").eq(0).should("contain", "Boris Johnson");
    cy.get(".posts>div.post").eq(1).should("contain", "Jerry Smith");
  });
});
