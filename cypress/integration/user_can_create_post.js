// Feature: Posts Page

// As a logged-in user,
// I want to be able to see posts, See comments on posts, and number of likes, So that I can connect with friends.
  


describe("User can create a post", () => {
    it("A signed in user can create a post and see it displayed", () => {

  
      // sign in
      cy.visit("/");
      cy.get('a.global-button[href="/sessions/new"]').click()
      cy.get("#email").type("admin@example.com");
      cy.get("#password").type("Password!123");
      cy.get("#submit").click();
  
      cy.url().should("include", "/posts");

    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
    });
  });