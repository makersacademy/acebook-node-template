describe("Home page", () => {
  it("goes to homepage if user is not logged in", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  })

  it("goes to posts page if user is logged in", () => {
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

    //visit homepage when signed in
    cy.visit("/");
    cy.url().should('include', '/posts')
  })
});
