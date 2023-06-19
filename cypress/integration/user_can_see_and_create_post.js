// Feature: Posts Page

// As a logged-in user,
// I want to be able to see posts, See comments on posts, and number of likes, So that I can connect with friends.
const Chance = require('chance');
const chance = new Chance();


describe("Posts", () => {




    it("A signed in user can create a post and see it displayed", () => {
    //create random post message
    const new_post = chance.paragraph({ sentences: 1 })

  
      // sign in
    cy.signIn();
  
    cy.url().should("include", "/posts");

    //create a new post
    cy.get('a.global-button.new-post-link[href="/posts/new"]').click();
    cy.get('#message').type(new_post);
    cy.get('input[type="submit"][value="Submit"]').click();

    cy.get('p.message')
      .should('exist')
      .contains(new_post);
    });





    it("A signed in user cannot create an empty post - test currently inactive", () => {


      // sign in
    cy.signIn();

    cy.url().should("include", "/posts");

    cy.get('a.global-button.new-post-link[href="/posts/new"]').click();

    //submit without typing anything
    cy.get('input[type="submit"][value="Submit"]').click();

    //should not take you back to posts at this point
//    cy.url().should("not.include", "/posts");

    });







it("User can click on and see likes count", () => {
  cy.signIn();

  cy.visit("/posts/new");
  cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
  cy.get("#new-post-form").submit();
  let likeButton = cy.get(".like-button").last();
  likeButton.click();
  let likeCount = cy.get(".likes-count").last();
  likeCount.should((have.text("1")) | (have.text("2")))
});




  });
