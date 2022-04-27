describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });

  it("Shows 'Log out' in nav bar if user is logged in", () => {
    cy.visit("/");
    // sign up
    cy.signUp();
    // log in
    cy.logIn();
  
    cy.contains("input", "Log Out")
  });

  it("Shows 'Find Friend' in nav bar if user is logged in", () => {
    cy.visit("/");
    // sign up
    cy.signUp();
    // log in
    cy.logIn();
  
    cy.get('#search-friend')
  });

  it("Shows 'Log in' and 'Sign up' in nav bar if user is logged out", () => {
    cy.visit("/");

    cy.contains("a", "Sign Up")
    cy.contains("a", "Log in")
  });

  it("Shows 'Find Friend' in nav bar if user is logged out", () => {
    cy.visit("/");
  
    cy.get('#search-friend')
  });
});