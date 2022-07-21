describe("Registration", () => {
  it("A user can only sign up once using the same email address", () => {
    
    // Empty Users  
      cy.task('emptyUsers').then(() => {

      // sign up attempt 1
      cy.visit("/users/new");
      cy.get("#email").type("newsomeone@example.com");
      cy.get("#password").type("password");
      cy.get("#name").type("name");
      cy.get("#surname").type("surname");
      cy.get("#submit").click();

      // sign up attempt 2
      cy.visit("/users/new");
      cy.get("#email").type("newsomeone@example.com");
      cy.get("#password").type("password");
      cy.get("#name").type("name");
      cy.get("#surname").type("surname");
      cy.get("#submit").click();

      // there should be a warning
      cy.url().should("include", "/users");
      cy.contains("User Already Exists. Please Enter A New Email Address").should('be.visible')
    });
  });
});