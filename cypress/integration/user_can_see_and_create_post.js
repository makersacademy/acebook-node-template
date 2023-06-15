// Feature: Posts Page

// As a logged-in user,
// I want to be able to see posts, See comments on posts, and number of likes, So that I can connect with friends.
  


describe("Posts", () => {




    it("A signed in user can create a post and see it displayed", () => {

  
      // sign in
    cy.signIn();
  
    cy.url().should("include", "/posts");

    //create a new post
    cy.get('a.global-button.new-post-link[href="/posts/new"]').click();
    cy.get('#message').type('Hello, World!');
    cy.get('input[type="submit"][value="Submit"]').click();

    cy.get(".posts").should("contain", "Hello, world!");
    });





    it("A signed in user cannot create an empty post", () => {


      // sign in
    cy.signIn();

    cy.url().should("include", "/posts");

    cy.get('a.global-button.new-post-link[href="/posts/new"]').click();

    //submit without typing anything
    cy.get('input[type="submit"][value="Submit"]').click();

    //should not take you back to posts at this point
    cy.url().should("not.include", "/posts");
    });







    it("A signed in user can see the like count on a post", () => {


      // sign in
    cy.signIn();

    cy.url().should("include", "/posts");

    cy.get('ul.posts li').should('contain', '0 Likes');

    });




  });