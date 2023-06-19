describe("Timeline - Like Functionality - Interacting with other user", () => {
    it("can like another user's post", () => {
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("Testtest1");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.get("a[href='/posts/new']").click()
    cy.get("#new-post-form").find('[type="text"]').type("Testing Like Functionality - Other User");
    cy.get("#new-post-form").submit();

    cy.get("input[type='submit']").click();
    cy.get("#email").type("sue@sue.com");
    cy.get("#password").type("password1");
    cy.get("#submit").click();

    cy.get("ul > li:first-child button").click();
    cy.get("ul > li:first-child span").should("contain", '1');
    cy.get("ul > li:first-child span").should("not.have.value", '2');
    });
});