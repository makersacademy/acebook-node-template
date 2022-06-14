describe("name on Posts ", () => {
    
  it('posts shows user who posted them next to the message', () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("Test name")
    cy.get("#email").type("someon@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someon@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("Post").click();

    cy.get("#new-post-form").find('[type="text"]').type("First post");
    cy.get("#new-post-form").submit();

    // expect
    cy.get('div').should("contain", "First post");
  })
})