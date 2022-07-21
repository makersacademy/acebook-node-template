describe("Timeline", () => {
  it("User can click on sign up and log in to acebook", () => {
    const now = new Date();
    
    cy.visit("/");
    cy.contains("Create New Account").click();

    // signing up
    cy.contains("First name:").type("Chris")
    cy.get("#lastName").type("Brown")
    cy.get("#email").type("a@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    

    
    cy.contains("Please log in").should("be.visible")
    
    

    
    
  });
});