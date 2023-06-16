//Test Suite that checks the expected elements are on the page upon loading

describe("Home Page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });
});

describe("Home Page - Log-in Button Check", () => {
  it("has a link to log-in", () => {
    cy.get('a[href="/users/new"]').should('be.visible');
  });
});

describe("Home Page - Sign-up Button Check", () => {
  it("has a link to sign-up", () => {
    cy.get('a[href="/sessions/new"]').should('be.visible');
  });
});