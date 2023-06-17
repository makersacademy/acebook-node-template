describe("Authentication", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("A user cannot sign in due to incorrect credentials", () => {
    // sign up & log out
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();
    cy.get("#logout").click();

    // sign in
    cy.visit("/");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("123");
    cy.get("#submit").click();

    cy.url().should("include", "/");
    cy.contains("p", "Incorrect credentials");
  });
});
