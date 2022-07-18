describe("like button", function(){
  beforeEach(() => {
    cy.task('emptyPosts').then(() => {
      cy.visit("/users/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      // sign in
      cy.visit("/sessions/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      // submit a post
      cy.visit("/posts");
      cy.contains("New post").click();
      cy.get("#new-post-form").find('#message').type("Hello, world!");
      cy.get("#new-post-form").submit();
    })
  })

  it("can like a post", function(){
    cy.get('#like-button:last').click();
    cy.get('.posts').should('contain',1)
    cy.get('#like-counter').should('contain', 1)
 });

  it('can like the most recent post when there are multiple posts', function(){
    // submit a second post
    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").find('#message').type("I am Matilda cakes");
    cy.get("#new-post-form").submit();

    //check that the post is last in the list
    cy.get('.post-container').first().should("contain", "I am Matilda cakes");

    //like the post and see that the likes have gone up
    cy.get('.like-container').first().find('#like-button').click();
    cy.get('.like-container').first().should('contain',1);
  });

  it('can like the least recent when there are multiple posts', function(){
    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").find('#message').type("Most recent post");
    cy.get("#new-post-form").submit();

    cy.get('.post-container').last().should('contain', "Hello, world!")

    cy.get('.like-container').last().find('#like-button').click();
    cy.get('.like-container').last().should('contain',1);
    cy.get('.like-container').first().should('contain',0);
    // these tests will need to be adjusted when the lists show in reverse order
  });

  it('cannot like the same post twice for the same user', function() {
    cy.visit('/posts');
    cy.contains("New post").click();
    cy.get('#new-post-form').find('#message').type('a post to be liked');
    cy.get("#new-post-form").submit();

    cy.get('.post-container').first().should('contain', 'a post to be liked');
    cy.get('.like-container').first().find('#like-button').click();
    cy.get('.like-container').first().should('contain',1);
    cy.get('.like-container').first().find('#like-button').click();
    cy.get('.like-container').first().should('contain',1);
  });
});