describe("Registration", () => {

  it("A user signs up and is redirected to sign in", () => {
    // Empty Users  
    cy.task('emptyUsers').then(() => {
    // sign up
    cy.visit("/users/new");
    cy.get("#first_name").type("first")
    cy.get("#last_name").type("last")
    cy.get("#email").type("anotherrandomemail@example.com");
    cy.get("#password").type("password123");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
    })
  });
});
