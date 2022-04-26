describe("Deleting posts", () => {
  it("allows a user to delete their own post", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.get("#new_post_text").type("Hello, world!");
    cy.contains("New post").click();

    // delete the post
    cy.visit("/posts")
    cy.get("#delete_post").first().click()

    cy.url().should("include", "/posts")
    cy.get(".posts").children().eq(0).should("not.contain.text", "Hello, world!");
  })

  it("does NOT allow a user to delete another user's post", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.get("#new_post_text").type("Hello, world!");
    cy.contains("New post").click();

    //log out
    cy.contains("Log Out").click()

    //sign up another user
    cy.visit("/users/new");
    cy.get("#email").type("another@example.com");
    cy.get("#password").type("passwort");
    cy.get("#first-name").type("Bob");
    cy.get("#surname").type("Bobson");
    cy.get("#submit").click();

    // sign in with new user
    cy.visit("/sessions/new");
    cy.get("#email").type("another@example.com");
    cy.get("#password").type("passwort");
    cy.get("#submit").click();

    // try to delete other user's post
    cy.visit("/posts");
    cy.get("#delete_post").first().click();

    cy.url().should("include", "/posts");
    cy.get(".posts").children().eq(0).should("contain.text", "Hello, world!");
  })
})
