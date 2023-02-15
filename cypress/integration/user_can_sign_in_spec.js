describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");


    cy.get("#password").type("password");
    cy.get("#confirm_password").type("password");
    cy.get("#username").type("username");
    cy.get("#submit").click();
    cy.get("#log_out").click();

    // sign in
    cy.url().should("include", "/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // cy.get(email.text).should('match', /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    // cy.get("#email").contains(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    cy.url().should("include", "/posts");
    cy.get("#log_out").click();
    
  });
});



// describe('Email Validator', () => {
//   it('checks if a string matches a regular expression', () => {
//     const stringToTest = cy.get("#email");
//     const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

//     stringToTest.should('match', regex);
//   });
// });
