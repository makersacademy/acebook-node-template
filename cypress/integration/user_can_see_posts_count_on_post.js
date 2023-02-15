describe("Timeline", () => {
  it("can see likes count on a new post", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#confirm_password").type("password");
    cy.get("#username").type("username");
    cy.get("#submit").click();
    cy.get("#log_out").click();

    // sign in
    cy.url().should("include", "/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    // cy.visit("/posts");
    cy.url().should("include", "/posts");
    cy.get("input#message").type("Hello, world!");
    cy.get("#submit_post").click();

    cy.get(".posts").should("contain", "Hello, world!");

    // Assert that we can see the likes count
    cy.get(".posts").should("contain", "0 likes");
  });
});
