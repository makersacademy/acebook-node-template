describe("add friend, remove friend and then add again", () => {
    it("A user signs in and goes to their profile to send a friend request. Another user then signs in to accept the request", () => {
      // sign in to Alex's profile
        cy.visit("/sessions/new");
        cy.get("#email").type("alex@alex.com");
        cy.get("#password").type("password1");
        cy.get("#submit").click();

      // go to my profile
        cy.contains("My profile").click();
        cy.get('.addFriendButton').eq(1).click();
        cy.contains("Log Out").click();

      // sign in to Peter's profile
        cy.visit("/sessions/new");
        cy.get("#email").type("peter@peter.com");
        cy.get("#password").type("password1");
        cy.get("#submit").click();

      // go to my profile
        cy.contains("My profile").click();
        cy.contains("Accept").click();
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

      // go to my profile and remove friend
        cy.contains("My profile").click();
        cy.get('.removeFriendButton').eq(3).click();
        cy.get('.addFriendButton').eq(1).click();
    });
});