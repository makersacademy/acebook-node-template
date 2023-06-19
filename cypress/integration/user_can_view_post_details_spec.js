describe("Feed Page", () => {
    it("can view post on main feed", () => {
    // sign up
    cy.visit("/users/new");
    cy.get('#firstName').type("Someone");
    cy.get('#lastName').type("Someone")
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password1");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password1");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Testing Post Details");
    cy.get("#new-post-form").submit();

    cy.contains("Testing Post Details").click();
    cy.get('h1').should("contain", "Testing Post Details");
    });
});