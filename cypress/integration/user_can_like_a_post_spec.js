const signUpAndSignIn = require('./webhelper');

describe('Timeline', () => {
  it("like counter displays on post and clicking button increments it", () => {
     // run webhelper to sign up and sign in to acebook
     signUpAndSignIn();

     // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("I want people to like this post.");
    cy.get("#new-post-form").submit();

    // like the post
    cy.visit("/posts");
    cy.get(".like-post").first().submit();

    cy.visit("/posts");
    cy.get('.likes').should("contain", "Likes: 1");

  })
})