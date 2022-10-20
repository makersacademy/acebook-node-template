describe("Friend Request", () => {
  it("a user can send friend request to another", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("John");
    cy.get("#email").type("john@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("Jane");
    cy.get("#email").type("jane@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("john@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");

    cy.contains("Make a post").click();
    cy.visit("/posts/new");
    cy.get("#message").type("Hi, I am John!");
    cy.get("#submit").click();

    // logout
    cy.get("#logout").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("jane@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // go to user profile
    cy.get(".post:first")
      .find(".post-author:first")
      .within(() => {
        cy.get("a").click();
      });

    // click add friend
    cy.get("#add-friend-button").click();

    // expect page refresh with button grayed out
    cy.get("#pending-friends-button").should(
      "have.attr",
      "value",
      "Your friend request is still pending"
    );
  });
});
