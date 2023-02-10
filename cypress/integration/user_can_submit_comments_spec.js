describe("Comments", () => {
  it("user can create post and add comment to it", () => {
    // sign up
    cy.task("wipe_database");
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

    // add a comment
    cy.contains("More details").click();
    cy.get(".title").should("contain", "Hello,");
    cy.get("#message").type("Comment 1");
    cy.contains("Create").click();
    cy.get(".comments li").should("contain", "Comment 1");
  });

  it("user can't add empty comment to post", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // attempt to add a comment
    cy.contains("More details").click();
    cy.get("#message").invoke('val', '')
    cy.contains("Create").click();
    cy.get(".comments li").should("contain", "Comment 1");
    cy.get(".comments li").should("have.length", 1);
  });

  it("user can't add comment with just spaces to post", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // attempt to add a comment
    cy.contains("More details").click();
    cy.get("#message").type("     ");
    cy.contains("Create").click();
    cy.get(".comments li").should("contain", "Comment 1");
    cy.get(".comments li").should("have.length", 1);
  });

  it("user can comment on other user post", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("tester@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("tester@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // attempt to add a comment
    cy.contains("More details").click();
    cy.get("#message").type("Comment 2");
    cy.contains("Create").click();
    cy.get(".comments li").should("contain", "Comment 2");
    cy.get(".comments li").should("have.length", 2);
  });

  it("user can navigate back to posts after visiting comments page", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("tester@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // go to comments page and add comment
    cy.contains("More details").click();
    cy.get("#message").type("Comment 3");
    cy.contains("Create").click();

    // travel back to posts
    cy.contains("Posts").click();
    cy.url().should("include", "/posts");
  });

  it("user comment is added without extra spaces", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // attempt to add a comment
    cy.contains("More details").click();
    cy.get("#message").type("     Comment 4    ");
    cy.contains("Create").click();
    cy.get(".comments li").eq(3).should("have.text", "Comment 4");
    cy.get(".comments li").should("have.length", 4);
  });
});