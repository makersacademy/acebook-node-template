describe("Navbar home button", () => {
  it("navigates to the home page", () => {
    cy.visit("/");
    cy.get("#log-in").click();
    cy.url().should("include", "/sessions/new?");
     // sign up
     cy.visit("/users/new");
     cy.get("#email").type("someone@example.com");
     cy.get("#password").type("password");
     cy.get("#submit").click();
 
     // sign in
     cy.visit("/sessions/new");
     cy.get("#email").type("someone@example.com");
     cy.get("#password").type("password");
     cy.get("#submit").click();
     cy.url().should("include", "/posts")
     // click log-out
    
    cy.get("#log-out").click();
    cy.url().should("include", "/sessions/new");
  });
});
