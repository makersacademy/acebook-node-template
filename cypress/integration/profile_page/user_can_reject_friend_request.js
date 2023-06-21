describe("sending & accepting friend requests", () => {
    it("A user signs in and goes to their profile to send a friend request. Another user then signs in to accept the request", () => {
      // sign in to Alex's profile
        cy.visit("/sessions/new");
        cy.get("#email").type("alex@alex.com");
        cy.get("#password").type("password1");
        cy.get("#submit").click();

      // go to my profile
        cy.contains("My profile").click();
        cy.get('.addFriendButton').eq(0).click();
        cy.contains("Log Out").click();

      // sign in to Susie's profile
        cy.visit("/sessions/new");
        cy.get("#email").type("susie@susie.com");
        cy.get("#password").type("password1");
        cy.get("#submit").click();

      // go to my profile
        cy.contains("My profile").click();
        cy.contains("Reject").click();
        // cy.get('.friends')
        // .then($items => {
        // return $items.map((index, html) => Cypress.$(html).text()).get()
        // })
        // .should('deep.eq', [ '\n      \n        \n        AlexBuzeaRemove Friend\n      \n      \n        \n        ' ])
        cy.contains("Log Out").click();

        // go back to Alex's profile
        cy.visit("/sessions/new");
        cy.get("#email").type("alex@alex.com");
        cy.get("#password").type("password1");
        cy.get("#submit").click();

      // go to my profile
        cy.contains("My profile").click();
        // cy.get('.friends')
        // .then($items => {
        // return $items.map((index, html) => Cypress.$(html).text()).get()
        // })
        // .should('deep.eq', [ '\n      \n        \n        Peter SmithRemove Friend\n      \n      \n        \n        ' ])
        // cy.contains("Log Out").click();

    });
});