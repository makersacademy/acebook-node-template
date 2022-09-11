describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("pmonson1@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("Paris1");
    cy.get("#lastName").type("Monson1");
    cy.get("#username").type("testusername1");
    cy.get("#phoneNumber").type("07337048453");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("pmonson1@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.get("#new-post-form").within(() => {
      cy.get("input").should("have.value", "New Post");
    });
  });
});
