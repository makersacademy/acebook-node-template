describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    const now = new Date();
    // sign up
    cy.visit("/users/new");
    cy.contains("First name:").type("Chris")
    cy.get("#lastName").type("Brown")
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.contains("Email:").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
    cy.get(".posts").should("contain", now.toString().substring(0,10));
  });
});