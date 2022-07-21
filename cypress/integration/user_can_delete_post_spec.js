describe("Timeline", () => {
  it("Can delete the mosts recent post", () => {
    // sign up
    cy.visit("/users/new");
    cy.contains("First name:").type("Chris");
    cy.get("#lastName").type("Brown")
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.contains("Email:").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("I am saif");
    cy.get("#new-post-form").submit();


    // submit a 2nd post
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("I am amir");
    cy.get("#new-post-form").submit();


    // Delete Button
    // cy.get("#delete-list-button").submit();
    
    
    // cy.get('ul').children('.active')
    cy.get('input[name="I am saif"]').click({ multiple: true });
    cy.get('.post').contains('I am saif').should('not.exist')
   
    cy.get('input[name="I am amir"]').click({ multiple: true });
    cy.get('.post').contains('I am amir').should('not.exist')

    // cy.contains("I love zuckerberg").should('not.exist')
  });
});