describe("Authentication", () => {
  it("A user signs in and is redirected to /posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("name");
    cy.get("#email").type("someone1@example.com");
    cy.get("#password1").type("Password@1");
    cy.get("#password2").type("Password@1");
    cy.get("#submit").click();

    //logout
    cy.get("#logout").click();

    // sign in
    cy.get("#email").type("someone1@example.com");
    cy.get("#password").type("Password@1");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
    cy.contains("label", "What's on your mind?");
  });

  it("show error message when incorrect credentials have been inputted", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("name");
    cy.get("#email").type("someone@example.com");
    cy.get("#password1").type("Password@1");
    cy.get("#password2").type("Password@1");
    cy.get("#submit").click();

    //logout
    cy.get("#logout").click();

    // sign in
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("pass");
    cy.get("#submit").click();

    cy.url().should("include", "/sessions");
    cy.contains("div", "Invalid details");
  });
});
