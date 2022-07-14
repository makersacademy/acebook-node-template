describe("Timeline", () => {
  it("Can delete the mosts recent post", () => {
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

    cy.get("#new-post-form").find('[type="text"]').type("I love zuckerberg");
    cy.get("#new-post-form").submit();
;
    // Delete Button
    cy.get("#delete-list-button").submit();
    

    //  cy.get(".post").should("contain", );
    // cy.find(".post").length > 0  
    cy.contains("Hello, world!").should('not.exist')
    cy.contains("I love zuckerberg").should('not.exist')
  });
});