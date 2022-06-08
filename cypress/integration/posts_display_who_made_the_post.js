describe("Timeline", () => {
  it("can submit posts, when signed in, and view them with username", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("jerrysmith@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("Jerry Smith")
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("jerrysmith@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get("div[class='posts']").parent().within(() => {
      cy.get("div[class='username']").contains("Jerry Smith")
   })
    
  });
});
