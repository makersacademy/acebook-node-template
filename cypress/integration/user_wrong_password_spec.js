describe("Timeline", () => {
  it("User is redirect when wrong password is submitted", () => {
    const now = new Date();
    
    cy.visit("/users/new");
    cy.get("#email").type("a@test.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.contains("Log in").click();

    
    
    cy.get("#email").type("a@test.com");
    cy.get("#password").type("passw");
    cy.get("#submit").click();

    
    cy.contains("Your Password or Email address appear to be incorrect, please try again").should("be.visible")
    
    
    
  });
});