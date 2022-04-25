describe("Deleting posts", () => {
  it("allows a user to delete their own post", () => {
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

    // delete the post
    cy.url().should("include", "/posts")
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
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

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
    cy.visit("/posts")
    cy.get("#delete_post").first().click()

    cy.server().should((server) => {
      expect(server.status).to.eq(403)
    })
  })
})