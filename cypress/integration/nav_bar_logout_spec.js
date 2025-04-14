describe("Navbar log-out button", () => {
  it("log-out logs out  a signed in user and navigates to new session page", () => {
    cy.visit("/");
    cy.get("#log-in").click();
    cy.url().should("include", "/sessions/new");
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
    cy.url().should("include", "http://localhost:3030/");
  });
});
