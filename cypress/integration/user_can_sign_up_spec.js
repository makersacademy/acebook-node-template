describe("Form test", () => {
    it('Creating a new user', () => {
      cy.visit('/signup') 
      cy.get("form");   
  
      cy.get('input[name="username"]') 
        .type('Jane Doe')
  
      cy.get('input[name="password"]')  
        .type('Password1') 
  
      cy.contains('Submit')   
        .click()            
    }); 
  });