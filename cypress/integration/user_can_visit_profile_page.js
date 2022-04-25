describe("Profile page", () => {
    it("A user can visit their own profile page", () => {
      // profile page
        cy.visit("/users/new");
        cy.get("#firstName").type("Jemima");
        cy.get("#lastName").type("Puddleduck");
        cy.get("#email").type("someone@example.com");
        cy.get("#confirm_email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#confirm_password").type("password");
        cy.get("#submit").click();

        cy.url().should("include", "/sessions/new");

        cy.get("#email").type("someone@example.com");
        cy.get("#password").type("password");
        cy.get("#submit").click();

        cy.visit("/users/profile");
        cy.get("#title").should("have.text", "Jemima Puddleduck");
        //FIXME cy.get("#bio").type(""); 
    });
});
