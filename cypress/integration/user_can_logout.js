// Feature: Logout

// As a user,
// I want to be able to click logout,
// So that I can end my session securely, And be taken back to the login page.

describe("Logout", () => {
    it("A user can logout from their homepage", () => {

  
      // sign in
      cy.signIn();
  
      cy.url().should("include", "/posts");


      cy.get('input[type="submit"][value="Log Out"].global-button.logout').click();

      cy.url().should("not.include", "/posts");

    });
  });