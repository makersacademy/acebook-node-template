describe("Add Friend", () => {
  it('user can add friend from the profile page', () => {
      cy.signUp()

      cy.contains("New post").click();
      cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
      cy.get("#new-post-form").submit();
  
      cy.get("#view-profile").click();

      cy.get("#add-friend").should("have.attr", 'value',  "Add Friend");
  
  })

  it('user can not add themselves as a friend', () => {
    cy.signUp();
    cy.get("#view-profile").click();
    cy.get('#add-friend').should('not.be.visible');

  })

})