
describe("Profile page", () => {
  it('redirects to users/profile', () => {

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    
    // posts 
    cy.url().should("include", "/posts");
    cy.get("#profile-link").click();
    cy.url().should("include", "users/profile");
  });
  it('contains user info', () => {
    
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    
    // posts 
    cy.url().should("include", "/posts");
    cy.get("#profile-link").click();
    cy.url().should("include", "users/profile");

    //profile
    cy.contains("someone@example.com")
    cy.contains("Aga")
    cy.contains("surname")

  });

})