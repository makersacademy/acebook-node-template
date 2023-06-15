// Feature: Login

// As a user with account,
// When I am on homepage I want to be able click login,
// So that I can be taken to the login page,
// And be able to enter my account details, So that I can be taken to my homepage


describe("Login - this test fails without an admin user", () => {
    it("A user signs in and is redirected to /posts", () => {

  
      // sign in
      cy.visit("/");
      cy.get('a.global-button[href="/sessions/new"]').click()
      cy.get("#email").type("admin@example.com");
      cy.get("#password").type("Password!123");
      cy.get("#submit").click();
  
      cy.url().should("include", "/posts");

    });
  });