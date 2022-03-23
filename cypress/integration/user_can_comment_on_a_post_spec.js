describe("comment on a post", () => {
    it('user comments on a post', () => {
        cy.signUp()
        cy.contains("New post").click();
        cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
        cy.get("#new-post-form").submit();
        cy.get("#collapse-button").click();
        cy.get("#new-comment-form").find('[type="text"]').type("This is a comment on a post.");
        cy.get("#submitComment").click();
        cy.get("#numberOfComments").should("contain", "1");
        cy.get("#commenter").should("contain", "test name");
        cy.get("#comments").should("contain", "This is a comment on a post.");
    })
})