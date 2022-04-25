describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
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

    cy.url().should("include", "/posts");
    cy.contains("a", "New post");
  });
      it("displays when email doesn't match an account", () => {
        //wrong email address
        cy.visit("/users/sessions/new");
        cy.get("#email").type("emaildoesntexist@gmail.com");
        cy.get("#password").type("doesntexist");
        cy.get("#submit").click();
        cy.get("#error_box").should("have.text", "Account not found")
      });

      it("displays when password doesn't match email", () => {
        //wrong password
        cy.visit("/users/sessions/new");
        cy.get("#email").type("emaildoesexist@gmail.com");
        cy.get("#password").type("passworddoesntexist");
        cy.get("#submit").click();
        cy.get("#error_box").should("have.text", "Incorrect password")
      });
    });






