describe("a user can like a post", () => {
    it("by clicking on the like button", () => {
        cy.signIn();

        cy.visit("/posts/new")
        cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
        cy.get("#new-post-form").submit();
        let likeButton = cy.get(".like-button").last()
        likeButton.click()
        let likeCount = cy.get(".likes-count").last()
        likeCount.should("have.text", "1");
    })
})
