describe("Timeline", () => {
  it("can like a comment", () => {
    cy.exec("mongo acebook_test --eval 'db.dropDatabase()'");
    // sign up
    cy.visit("/users/new");
    cy.contains("First name:").type("Chris");
    cy.get("#lastName").type("Brown")
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    
    cy.contains("Email:").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    // submit a comment
    cy.visit("/posts");
    cy.get("#new-comment-form").find('[type="text"]').type("Hi!");
    cy.get("#new-comment-form").submit();


    // like a comment
    cy.visit("/posts");
    cy.get("#like-comment").submit();
    cy.get(".posts").should("contain", "Likes: 1");

    // delete like from a post
    cy.visit("/posts");
    cy.get("#remove-like-comment").submit();
    cy.get(".posts").should("not.contain", "Likes: 1");
  });
});