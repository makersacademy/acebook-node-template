describe('delete button',() => {
  beforeEach(() => {
    cy.task('emptyUsers').then(() => {

      // sign up 
      cy.visit("/users/new");
      cy.get('#name').type('fake name')
      cy.get('#surname').type('fake surname')
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      // log in
      cy.visit("/sessions/new");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      // submit a post
      cy.get(".new-post-link").click();

      cy.get("#new-post-form").find('#message').type("Hello, world!");
      cy.get("#new-post-form").submit();

      cy.get(".posts").should("contain", "Hello, world!");
      cy.get(".posts").should("contain", "someone@example.com");

      // log out
      cy.get("#sign-out-button").click();

      // sign up as second user
      cy.visit("/users/new");
      cy.get('#name').type('fake name')
      cy.get('#surname').type('fake surname')
      cy.get("#email").type("newperson@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();

      // log in as second user
      cy.visit("/sessions/new");
      cy.get("#email").type("newperson@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
    });
  })
  it('does not appear for posts you have not written', () => {
    
      // cannot see delete button
      cy.get('.post-container').first().should('contain', 'Hello, world!')
      cy.get('.delete').should('not.exist');
   
  });

  it('also cannot delete other user posts on their profile',() => {

      cy.get('.profile-link').first().click();
      cy.get('.delete').should('not.exist');
  })
})