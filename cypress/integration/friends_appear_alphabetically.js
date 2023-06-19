describe("Friends list appearing alphabetically", () => {
    it("A user signs in and goes to their profile to view friends", () => {
      // sign in
        cy.visit("/sessions/new");
        cy.get("#email").type("alex@alex.com");
        cy.get("#password").type("password1");
        cy.get("#submit").click();

      // go to my profile
        cy.contains("My profile").click();

        cy.get('.friends > ul')
        .then($items => {
        return $items.map((index, html) => Cypress.$(html).text()).get()
        })
        .should('deep.eq', ['Chris Robinson', 'Joe Brown', 'Sue Mason'])
        });
});
