describe("Profile", () => {
    it("can click someone's email to go to their profile", () => {
      // sign up
      cy.visit("/users/new");
      cy.get("#email").type("someone9@example.com");
      cy.get("#password").type("password3");
      cy.get("#first_name").type("Bob");
      cy.get("#last_name").type("Smith");
      cy.get("#dob").type("2022-05-16");
      cy.get("#submit").click();
      cy.get(".timelinepage").click();
  
  
      // submit a post
      // cy.visit("/posts");
      cy.get(".new-field").type("Hello, world!");
      cy.get(".post-button").click();
      cy.get(".posts").find(".post-user").first().click();
  
      cy.url().should("include", "someone9@example.com");
      
    });
});