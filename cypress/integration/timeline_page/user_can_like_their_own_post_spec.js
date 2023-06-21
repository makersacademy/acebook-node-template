describe("Timeline - Like Functionality", () => {
    it("can like their own post", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("Testtest1");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.get("a[href='/posts/new']").click()
    cy.get("#new-post-form").find('[type="text"]').type("Testing Like Functionality");
    cy.get("#new-post-form").submit();

    cy.get(".likeButtonTimeline").eq(0).click();
    cy.get('[id*="likesCount"]').eq(0).should("contain", '1');
    cy.get('[id*="likesCount"]').eq(0).should("not.have.value", '2');
    });
});