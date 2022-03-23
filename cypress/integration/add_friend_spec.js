describe("Add Friend", () => {
  it('user can add friend from the profile page', () => {
      cy.signUp()

      cy.contains("New post").click();
      cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
      cy.get("#new-post-form").submit();
  
      // Sign another user up
      cy.get("#signup").click();
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#username").type("someone123");
      cy.get("#submit").click();

      cy.get("#postedByLink").first().click();

      cy.get("#add-friend").should("have.attr", 'value',  "Add Friend");
  
  })

  it('user can not add themselves as a friend', () => {
    cy.signUp();
    cy.get("#view-profile").click();
    cy.get('#add-friend').should('not.exist');

  })

  it('user can not add a friend if friends already', () => {
    cy.signUp()

    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    // Sign another user up
    cy.get("#signup").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("someone123");
    cy.get("#submit").click();

    cy.get("#postedByLink").first().click();
    cy.get("#add-friend-form").submit();
    cy.get('#add-friend').should('not.exist');

})

})