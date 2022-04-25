describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("ali");
    cy.get("#lastName").type("alli");
    cy.get("#email").type("someone@example.com");
    cy.get("#confirm_email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#confirm_password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions/new");
  });
});

describe("Email confirmation", () => {
  it("displays emails don't match", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#confirm_email").type("someone@example2.com");
    cy.get("#password").type("password");
    cy.get("#confirm_password").type("password");
    cy.get("#submit").click();
    cy.get("#error_box").should("have.text", "Emails don't match, please correct it")
  });
});