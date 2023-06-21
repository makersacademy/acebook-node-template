describe("sending, accepting & rejecting friend requests", () => {
    it("A user signs in and goes to their profile to send, accept & reject friend requests", () => {
      // sign in to Alex's profile
        cy.visit("/sessions/new");
        cy.get("#email").type("alex@alex.com");
        cy.get("#password").type("password1");
        cy.get("#submit").click();

      // go to my profile
        cy.contains("My profile").click();
        cy.contains("Peter SmithAdd Friend").click();
        cy.contains("Log Out").click();

      // sign in to Peter's profile
        cy.visit("/sessions/new");
        cy.get("#email").type("peter@peter.com");
        cy.get("#password").type("password1");
        cy.get("#submit").click();

      // go to my profile
        cy.contains("My profile").click();
        cy.contains('.acceptFriendRequestButton').click();
        cy.get('.friends')
        .then($items => {
        return $items.map((index, html) => Cypress.$(html).text()).get()
        })
        .should('deep.eq', [ '\n      \n        \n        AlexBuzeaRemove Friend\n      \n      \n        \n        ' ])
        cy.contains("Log Out").click();

        // go back to Alex's profile
        cy.visit("/sessions/new");
        cy.get("#email").type("alex@alex.com");
        cy.get("#password").type("password1");
        cy.get("#submit").click();

      // go to my profile
        cy.contains("My profile").click();
        cy.get('.friends')
        .then($items => {
        return $items.map((index, html) => Cypress.$(html).text()).get()
        })
        .should('deep.eq', [ '\n      \n        \n        Peter SmithRemove Friend\n      \n      \n        \n        ' ])
        cy.contains("Log Out").click();

      });
});