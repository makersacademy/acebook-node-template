describe("Likes", () => {
  it("can like posts and view the number of likes", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("Name");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#signup-button").click();

    // sign in
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();

    // submit a post
    cy.contains("Post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    //Like a post
    cy.get(".like-button").first().click();

    cy.get(".like-button").first().should("contain", 1);
  });

  it.only("can only like once, and second click unlikes post", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("Name");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#signup-button").click();

    // sign in
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();

    // submit a post
    cy.contains("Post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    //Like a post
    cy.get(".like-button").first().click();
    cy.get(".like-button").first().should("contain", 1);

    // Click like button second time should unlike

    cy.get(".like-button").first().click();
    cy.get(".like-button").first().should("contain", 0);
  });
});
