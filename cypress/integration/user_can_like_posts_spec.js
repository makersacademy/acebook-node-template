describe("Likes", () => {
  // beforeEach(() => {
  //   cy.task('db:reset');
  // })

  it("can like posts and view the number of likes", () => {
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

    // cy.get(".posts").should("contain", "Hello, world!");

    //Like a post
    cy.get(".like-button").first().click();

    cy.get(".like-button").first().should("contain", 1);
  });
});

// haven't reset the database, should be one post but there is three posts