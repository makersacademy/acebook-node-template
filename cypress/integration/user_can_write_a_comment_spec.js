describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // delete all table entries
    cy.request("DELETE", "http://localhost:3030/admin/reset", {
      user: "admin",
      password: "password",
    });

    // sign up
    cy.visit("/users/new");
    cy.get("#first-name").type("some");
    cy.get("#last-name").type("one");
    cy.get("#username").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    // sign in
    cy.visit("/");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
    cy.get(".comment-counter").contains("0");

    // submit a comment
    cy.contains("Write a comment").click();

    cy.get("#new-comment-form").find('[type="text"]').type("Hello, someone!");
    cy.get("#new-comment-form").submit();

    cy.get(".comments").should("contain", "Hello, someone!");

    // check if comment count is shown on post on timeline page
    cy.visit("/posts");
    cy.get(".comment-counter").contains("1");
  });
});
