describe("comment on a post", () => {
    it('user comments on a post', () => {
        cy.signUp()
        cy.contains("New post").click();
        cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
        cy.get("#new-post-form").submit();

        // cy.get("#commentForm").submit();
        cy.get("#new-comment-form").find('[type="text"]').type("This is a comment on a post.");
        cy.get("#numberOfComments").should("contain", "1");
        // cy.get(".posts").should("contain", "This is a comment on a post.");
    })
})