//Homepage
//- As a new user,
//
//  When I navigate to the site,
//
//  I want to see the logo, signup, and login buttons.

describe("Home page", () => {
  it("has a title, login and signup buttons", () => {

  //Go to site
    cy.visit("/");

  //Should see logo, signup, and login buttons
    cy.get(".title").should("contain", "Acebook");
    cy.get('a[href="/sessions/new"]').should('exist');
    cy.get('a[href="/users/new"]').click();
  });
});
