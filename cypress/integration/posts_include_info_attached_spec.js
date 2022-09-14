describe("Posts feed", () => {
  it("posts contain message, creator's username and timestamp", () => {
    // clearing db
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
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");

    // make a new post
    cy.visit("/posts/new");
    cy.get("#message").type("this is a post");
    cy.get("#submit-post").click();

    // getting variable for time from the post entry
    cy.request("GET", "http://localhost:3030/admin/posts", {
      user: "admin",
      password: "password",
    }).then((response) => {
      // post appears in feed with info
      cy.visit("/posts");
      cy.get(".posts").contains("this is a post");
      cy.get(".posts").contains("someone");
      cy.get(".posts").contains(response.body[0].time_posted);
    });
  });
});
