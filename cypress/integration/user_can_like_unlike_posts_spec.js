describe('likes', () => {
  it('can like a post', () => {
    // sign up
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

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    // Like post
    cy.get('.likeUnlike:nth(0)').click();
    cy.get('.likeUnlike:nth(0)').should('have.value', 'Unlike')

    // Unlike a post
    cy.get('.likeUnlike:nth(0)').click();
    cy.get('.likeUnlike:nth(0)').should('have.value', 'Like')
 }); 
});