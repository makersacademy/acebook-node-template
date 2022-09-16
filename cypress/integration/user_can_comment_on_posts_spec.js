describe("Comments", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("can comment on user's posts", () => {
    // sign up + log in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.get("#message")
      .invoke("attr", "placeholder")
      .should("contain", " Whats on your mind?");
    cy.get("#message").type("Hello, world!");
    cy.get("#submit").click();
    cy.get(".post__bottom").should("contain", "Hello, world!");

    // logout
    cy.get("#logout").click();

    // different user signs up and logs in
    cy.visit("/users/new");
    cy.get("#email").type("newperson@example.com");
    cy.get("#password").type("newpassword");
    cy.get("#firstName").type("newperson");
    cy.get("#lastName").type("newsurname");
    cy.get("#submit").click();

    // comment on a user's post
    cy.visit("/posts");
    cy.get(".comment")
      .invoke("attr", "placeholder")
      .should("contain", "Leave a comment.");
    cy.get(".comment").type("Goodbye!");
    cy.get(".submit_comment").click();
    cy.get(".new_comment").should("contain", "Goodbye!");
  });

  it("Unable to submit a blank comment", () => {
    // sign up + log in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.get("#message")
      .invoke("attr", "placeholder")
      .should("contain", " Whats on your mind?");
    cy.get("#message").type("Hello, world!");
    cy.get("#submit").click();
    cy.get(".post__bottom").should("contain", "Hello, world!");

    // logout
    cy.get("#logout").click();

    // different user signs up and logs in
    cy.visit("/users/new");
    cy.get("#email").type("newperson@example.com");
    cy.get("#password").type("newpassword");
    cy.get("#firstName").type("newperson");
    cy.get("#submit").click();

    // comment on a user's post
    cy.visit("/posts");
    cy.get(".comment")
      .invoke("attr", "placeholder")
      .should("contain", "Leave a comment.");
    cy.get(".comment").should("have.value", "");
    cy.get(".submit_comment").click();
    cy.location("pathname", { timeout: 10000 }).should("include", "/posts");
  });
});
