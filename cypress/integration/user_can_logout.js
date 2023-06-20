// Feature: Logout

// As a user,
// I want to be able to click logout,
// So that I can end my session securely, And be taken back to the login page.

describe("Logout", () => {
    it("A user can logout from their homepage and be taken to the login screen", () => {
  
      // sign in
      cy.signIn();
  
      cy.url().should("include", "/posts");

        //click logout
      cy.get('input[type="submit"][value="Log Out"].global-button.logout').click();

      cy.url().should("not.include", "/posts");

        //should be back on login screen
      cy.url().should("include", "/sessions/new");

    });

    it("A user can logout from their new post page and be taken to the login screen", () => {

      // sign in
      cy.signIn();

      cy.url().should("include", "/posts");

      //click new post and go to new post page
      cy.get('a.global-button.new-post-link[href="/posts/new"]').click();

        //click logout
      cy.get('input[type="submit"][value="Log Out"].global-button.logout').click();

      cy.url().should("not.include", "/posts");

        //should be back on login screen
      cy.url().should("include", "/sessions/new");

    });


  });