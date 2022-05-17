describe("Registration", () => {
  it("A user signs up and is redirected to posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone2@example.com");
    cy.get("#password").type("password2");
    cy.get("#first_name").type("Bob");
    cy.get("#last_name").type("Smith");
    cy.get("#dob").type("2022-05-16");
    cy.get("#submit").click();

    cy.url().should("include", "/users/someone2@example.com");
  });

  it("A user cannot sign up with an email that is already in use", () => {
    // credentials already used in previous test
    cy.visit("/users/new");
    cy.get("#email").type("someone2@example.com");
    cy.get("#password").type("password2");
    cy.get("#first_name").type("Bob");
    cy.get("#last_name").type("Smith");
    cy.get("#dob").type("2022-05-16");
    cy.get("#submit").click();

    cy.contains("Email already in use");
  });
});
