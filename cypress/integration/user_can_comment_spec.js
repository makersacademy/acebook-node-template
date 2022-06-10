const signUp = require('../support/signup_helper')
const signIn = require('../support/signin_helper')
const submitPost = require('../support/submitpost_helper')

describe("Timeline", () => {
  it("can comment on a post", () => {
    signUp("email@email.com", "password", "username");
    signIn("email@email.com", "password");
    submitPost("New post");
    cy.get('.new-comment-link').eq([0]).submit();
    cy.get('#new-comment-form').find('[type=text]').type('This is a comment');
    cy.get('#new-comment-form').find('[type=submit]').click();
    cy.get(".comment").eq(0).should("contain", "This is a comment");
});
});
