
describe("Search for users", () => {
  it('searches for a user ', () => {
    cy.signUp()

    cy.get("#search").type("test");
    cy.get("#search-form").submit();

    cy.url().should("include", "/users");
    cy.get("#user").should("contain", "test name");
  })

  it('searches for a user and finds two matches', () => {
    cy.get("#signup").click();
    cy.get("#email").type("another@example.com");
    cy.get("#password").type("password");
    cy.get("#name").type("another tester")
    cy.get("#submit").click();


    cy.get("#search").type("test");
    cy.get("#search-form").submit();

    cy.url().should("include", "/users");
    //cy.get('#user').should('have.length', 2)

    cy.get("#users").first().should("contain", "test name");
    cy.get("#users").last().should("contain", "another tester");
})

})