describe("Timeline Posts", () => {
  it("can submit posts, when signed in, and view them", () => {
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

    cy.get(".posts").should("contain", "Hello, world!");
  });

  it("cannot submit a blank post", () => {
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

    // DON'T submit a post, but press submit anyway
    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").submit();
    cy.url().should("include", "/posts/new");
  });

  it("cannot submit a post as just 'spaces'", () => {
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

    // DON'T submit a post, but press submit anyway
    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").submit();
    cy.url().should("include", "/posts/new");

    // Submit a post with just spaces - this should not post
    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("      ");
    cy.get('#new-post-form > [type="submit"]').click()
    cy.url().should("include", "/posts/new");
  });

  it("a post with extra spaces will be trimmed", () => {
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

    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("            Hello, world!         ");
    cy.get('#new-post-form > [type="submit"]').click()
    cy.get('ul').should('contain.text',"Hello, world!");
  });

  it("cannot submit a post as just 'spaces'", () => {
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

    // DON'T submit a post, but press submit anyway
    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").submit();
    cy.url().should("include", "/posts/new");

    // Submit a post with just spaces - this should not post
    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("      ");
    cy.get('#new-post-form > [type="submit"]').click()
    cy.url().should("include", "/posts/new");
  });
});
