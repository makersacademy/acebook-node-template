describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("Homer");
    cy.get("#lastName").type("Simpson");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password1");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password1");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");

    // // Add a comment
    // cy.visit("/posts");


    // cy.get("#comment-form").find('[type="text"]').type("Hello!");
    // cy.get("#comment-form").submit();

    // cy.get(".comments").should("contain", "Hello!");
  });
});
