describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("first name example");
    cy.get("#lastName").type("exampleLastName");
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
  });
  it("posts display newest first", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("first name example");
    cy.get("#lastName").type("exampleLastName");
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
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("AAAAA");
    cy.get("#new-post-form").submit();
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("BBB");
    cy.get("#new-post-form").submit();
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("a");
    cy.get("#new-post-form").submit();

    cy.get(".posts").first().should("contain", "a");
    cy.get(".posts").last().should("contain", "Hello, world!");
  });
});
