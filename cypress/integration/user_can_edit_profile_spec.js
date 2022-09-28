describe("edit profile", () => {
    it('user can edit there profile', () => {
        cy.task('emptyPosts').then(() => {

            // sign up
            cy.visit("/users/new");
            cy.get("#email").type("newsomeone@example.com");
            cy.get("#password").type("Password8$");
            cy.get("#first_name").type("name");
            cy.get("#last_name").type("surname");
            cy.get("#submit").click();

            //sign in
            cy.visit("/sessions/new");
            cy.get("#email").type("newsomeone@example.com");
            cy.get("#password").type("Password8$");
            cy.get("#submit").click();

            //visit users/accounts
            cy.visit("users/account");
            cy.get("a[href*='/users/editmyprofile']").click();
            cy.get("#bio").type("my new bio");
            cy.get("#location").type("London");
            cy.get("#age").type("24");
            cy.get("#submit").click();
            cy.url().should("include", "/account");
            cy.contains("my new bio")
            cy.contains("London")
            cy.contains("24")


    })
})
})

    
            