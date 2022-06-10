const clearTestDatabase = require('./test_database_helper')

describe("Home page", () => {
  clearTestDatabase();
  it("has a title", () => {
    cy.visit("/");
    cy.get(".logo").should("contain", "Makebook");
  });
});
