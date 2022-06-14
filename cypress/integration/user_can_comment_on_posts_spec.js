describe("Timeline", () => {
    it("user can comment on posts", () => {
        // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("Post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    //comment on a post
    cy.get("#drop-down").click();
    cy.get("#new-comment-form").find('[type="text"]').type("yet another comment");
    cy.get("#new-comment-form").submit();
    cy.get("#drop-down").click();
    //expect
    cy.get('.comments').first().should("contain", "yet another comment");
    })
})