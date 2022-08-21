describe("sign up", () => {
    it("A user name and surname is included in the posts page", () => {
        
        cy.task('emptyPosts', 'emptyUsers').then(() => {
      
      // sign up
        cy.task('emptyUsers').then(() => {
        cy.visit("/users/new");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#name").type("name");
        cy.get("#surname").type("surname");
        cy.get("#submit").click();
      
        // sign in
        cy.visit("/sessions/new");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
  
        cy.url().should("include", "/posts");
        cy.contains("name").should ('be.visible');
        cy.contains("surname").should ('be.visible');
      });
    });
  });
});
  