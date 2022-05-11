describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/");
    cy.get("#Signup").click();
    cy.url().should("include", "/users/new");
    cy.get("#username").type("someone");
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

    cy.get(".posts").should("contain", "Hello, world!");

    // checks if posts are in order of newest first
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world1!");
    cy.get("#new-post-form").submit();
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world2!");
    cy.get("#new-post-form").submit();
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world3!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world3!");
    cy.get(".posts").should("contain", "Hello, world2!");
    cy.get(".posts").should("contain", "Hello, world1!");
  });
});
