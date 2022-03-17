describe("Users are logged out", () => {
    it("Can only see the log-in and registration links", () => {
      cy.visit("/");
      
      cy.contains('Log-in').should('be.visible')
      cy.contains('Register').should('be.visible')
      cy.contains('Log-out').should('not.exist')

    });

    it("Can only see the log-in and registration links", () => {
        cy.visit("/sessions/new");
        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();
        
        cy.contains('Log-in').should('not.exist')
        cy.contains('Register').should('not.exist')
        cy.contains('Log-out').should('be.visible')
        cy.contains('New post').should('be.visible')
        cy.contains('Profile').should('be.visible')
      
  
      });
  });
  
