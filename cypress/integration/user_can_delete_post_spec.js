describe("Delete Post", () => {
  it("A user can delete a post when they're signed in", () => {
     // sign up
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
    // cy.visit("/posts");
    // cy.contains("New post").click();

    // cy.get("#new-post-form").find('[type="text"]').type("Delete this post!");
    // cy.get("#new-post-form").submit();


    // delete a post
    cy.visit("/posts");
    cy.contains("Delete").click();

    cy.get(".posts").should("not.contain", "Delete this post!");

  })
})