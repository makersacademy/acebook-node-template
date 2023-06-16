describe("a user can like a post", () => {
    it("by clicking on the like button", () => {
        cy.visit("/");
        cy.get('a.global-button[href="/sessions/new"]').click()
        cy.get("#email").type("admin@example.com");
        cy.get("#password").type("Password!123");
        cy.get("#submit").click();

        cy.visit("/posts/new")
        cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
        cy.get("#new-post-form").submit();
        let likeButton = cy.get(".like-button").last()
        likeButton.click()
        let likeCount = cy.get(".likes-count").last()
        likeCount.should("have.text", "1");
    })
})
