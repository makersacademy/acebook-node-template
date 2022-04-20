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
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
  });

  it("a user cannot create an empty post", () => {
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

    // cannot submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type(" ");
    cy.get("#new-post-form").submit();

    //cy.url().should("include", "/posts");
  });

  it.only("can submit several posts that are in ascending order", () => {
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

    // submit several posts
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Good Morning!");
    cy.get("#new-post-form").submit();

    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Have a great day");
    cy.get("#new-post-form").submit();
    cy.log(cy.get(".posts"))

    cy.get(".posts").eq(0).should("contain.text", "Have a great day")
    cy.get(".posts").eq(1).should("contain.text", "Good Morning!")
    cy.get(".posts").eq(2).should("contain.text", "Hello, world!")

  });
});
