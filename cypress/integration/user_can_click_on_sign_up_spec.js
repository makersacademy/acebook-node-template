describe("Timeline", () => {
  it("User can click on sign up and log in to acebook", () => {
    const now = new Date();
    // sign up
    cy.visit("/");
    cy.contains("Create New Account").click();

    // sign in
    cy.get("#firstName").type("Chris")
    cy.get("#lastName").type("Brown")
    cy.get("#email").type("a@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    

    cy.get("#firstName").type("Chris")
    cy.get("#lastName").type("Brown")
    cy.get("#email").type("a@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    
    cy.contains("Posts").click();
    cy.contains("New post").click();

    cy.contains("Home page").click()

    
    
  });
});