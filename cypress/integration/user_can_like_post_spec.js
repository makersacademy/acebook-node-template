describe("Like Functionality", () => {
    it("can like a post", () => {
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
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Testing Like Functionality");
    cy.get("#new-post-form").submit();

    cy.contains("Testing Like Functionality").click();
    cy.get("button.likeButton").click();
    cy.get('span').should("contain", '1')
    });
});