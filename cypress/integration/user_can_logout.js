// Feature: Logout

// As a user,
// I want to be able to click logout,
// So that I can end my session securely, And be taken back to the login page.

describe("Logout", () => {
    it("A user can logout from their homepage", () => {

  
      // sign in
      cy.visit("/");
      cy.get('a.global-button[href="/sessions/new"]').click()
      cy.get("#email").type("admin@example.com");
      cy.get("#password").type("Password!123");
      cy.get("#submit").click();
  
      cy.url().should("include", "/posts");


      cy.get("#logout").click();
      cy.url().should("not.include", "/posts");

    });
  });