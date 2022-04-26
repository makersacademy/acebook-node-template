describe("Editing posts", () => {
  it("allows a user to edit their own post", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.get("#new_post_text").type("Hello, world!");
    cy.contains("New post").click();

    // edit the post
    cy.visit("/posts")
    cy.get("#edit_post").first().click()

    cy.url().should("include", "/posts/edit")
    cy.get("#edit-post-form").find('[type="text"]').type("Bye, cruel world!");
    cy.get("#edit-post-form").submit();

    cy.get(".posts").children().eq(0).should("not.contain.text", "Hello, world!");
    cy.get(".posts").children().eq(0).should("contain.text", "Bye, cruel world!");
  })

  it("does NOT allow a user to edit another user's post", () => {
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

    // try to edit other user's post
    cy.visit("/posts");
    cy.get("#edit_post").first().click();
    cy.url().should("include", "/posts/edit")
    cy.get("#edit-post-form").find('[type="text"]').type("Bye, cruel world!");
    cy.get("#edit-post-form").submit();


    cy.url().should("include", "/posts");
    cy.get(".posts").children().eq(0).should("contain.text", "Hello, world!");
    cy.contains("You don't have authorization for this action")
  })
})