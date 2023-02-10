describe("Timeline", () => {
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

    // Submit a post with just spaces - this should not post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("      ");
    cy.get('#new-post-form > [type="submit"]').click()
    cy.url().should("include", "/posts/new");



    // CAN INSERT BACK IN FOR FORMATTING _ CURRENTLY RELYING ON HTML

    // submit a flawed post, spaces at front, spaces in middle, spaces at end
    // cy.get("#new-post-form").find('[type="text"]').type("            Hello,           world!         ");
    // cy.get('#new-post-form > [type="submit"]').click()
    //
    // // assert that the message exists, but with the spaces stripped
    // // eslint-disable-next-line no-invalid-regexp
    // cy.get('li > :nth-child(1)').should('have.text',"Hello, world!");
  });
});
