describe("Delete Button", () => {
  it("delete button only appears on your own posts", () => {
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

    //sign out
    cy.get(".logout-button-input").click();

    //sign in as someone else
    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("billy");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    // sign in
    cy.visit("/");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();

    // clicking add friend button
    cy.visit("/profiles/someone");
    cy.get("#add-friend-button").click();

    //
    cy.visit("/posts");
    cy.get(".posts").contains("this is a post");
    cy.get(".post-delete-button").should("not.exist");
  });
});
