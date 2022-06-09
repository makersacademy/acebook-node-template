const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')
const submitPost = require('../support/submitpost_helper')

describe("Timeline", () => {
  it("can comment on a post", () => {
    signUp();
    signIn();
    submitPost("New post");
    cy.get('.new-comment-link').eq([0]).click();
    cy.get('#new-comment-form').find('[type=text]').type('This is a comment');
    cy.get('#new-comment-form').submit();
    cy.get(".comment").eq(0).should("contain", "This is a comment");
});
});