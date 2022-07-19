describe("Timeline", () => {
  it("User can click on sign up and log in to acebook", () => {
    const now = new Date();
    // sign up
    cy.visit("/");
    cy.contains("Sign up").click();

    // sign in
    
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.contains("Log in")

    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    
    cy.contains("Posts").click();
    cy.contains("New post").click();

    cy.contains("Home page").click()

    
    
  });
});