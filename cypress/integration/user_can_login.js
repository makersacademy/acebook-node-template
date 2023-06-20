//Feature: Login
//
//As a user with account,
//When I am on homepage I want to be able click login,
//So that I can be taken to the login page,
//And be able to enter my account details, So that I can be taken to my homepage with my initials displayed.


describe("Login", () => {

    it("A user clicks login on the homepage and is redirected to the login screen", () => {

        //Go to homepage
      cy.visit("/");
        //click login button
      cy.get('a[href="/sessions/new"]').click();

        //should take you to login screen
      cy.url().should("include", "/sessions/new");

    });

    it("A user signs in and is redirected to /posts", () => {

      // sign in
      cy.signIn();

        //login with admin details, should be taken to posts page, and see initials at the top
      cy.url().should("include", "/posts");


    });

    it("A user attempts to sign in with incorrect details", () => {

      // sign in
      cy.visit("/");
      cy.get('a[href="/sessions/new"]').click();

      //use details that dont exist in the db
      cy.get("#email").type("wrongemail@example.com");
      cy.get("#password").type("Password!123");
      cy.get("#submit").click();

        //should get eerror message
      cy.contains('div', 'Invalid email or password').should('be.visible');

    });

  });