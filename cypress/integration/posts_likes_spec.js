const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')
const submitPost = require('../support/submitpost_helper')

describe("Timeline", () => {
  it("new posts start with 0 likes", () => {
    signUp("email@email.com", "password", "username");
    signIn("email@email.com", "password");
    submitPost("Hello, world!");

    cy.get('.likes_container').eq(0).should("contain", "Likes: 0")
  })
  it("users can like the post and the likes increment by 1", () => {
    signUp("email@email.com", "password", "username");
    signIn("email@email.com", "password");
    submitPost("Hello, world!");

    cy.get('#add-like-button').click();
    cy.get('.likes_container').eq(0).should("contain", "Likes: 1")
  })
})