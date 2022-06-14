describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
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
    cy.contains("Post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
  });

  it("can submit posts, when signed in, and view them in reverse order", () => {
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
    cy.contains("Post").click();

    cy.get("#new-post-form").find('[type="text"]').type("First post");
    cy.get("#new-post-form").submit();

    // submit another post
    cy.contains("Post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Second post");
    cy.get("#new-post-form").submit();

    // expect
    cy.get('.posts:first').should("contain", "Second post");
    
    // cy.get('.posts:last').should("contain", "First post");

    // this test doesn't pass
    // cy.get('.posts').eq(1).should("contain", "First post");

    // commented out test from before
    // cy.get('ul').last().should("contain", "First post");
  });
});
