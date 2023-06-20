describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    //clearDB drops the DB for a fresh test environment
    cy.task('clearDb');
    
      // sign up
      cy.visit("/users/signup");
      cy.get("#username").type("User1");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("Password1");
      cy.get("#submit-signup-button").click();

      // sign in
      cy.visit("/sessions/login");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("Password1");
      cy.get("#submit-login-button").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("1");
    cy.get("#new-post-form").submit();
    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("2");
    cy.get("#new-post-form").submit();
        // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("3");
    cy.get("#new-post-form").submit();
    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("4");
    cy.get("#new-post-form").submit();


    cy.get("li.content").eq(0).should("contain", "4");
    cy.get("li.content").eq(1).should("contain", "3");
    cy.get("li.content").eq(2).should("contain", "2");
    cy.get("li.content").eq(3).should("contain", "1");
    
  });
});
