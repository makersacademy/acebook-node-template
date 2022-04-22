describe("Registration", () => {
  it("A user signs up and is signed in", () => {
    // sign up

    cy.visit("/");
    cy.get("#sign-up").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("username");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });
});
