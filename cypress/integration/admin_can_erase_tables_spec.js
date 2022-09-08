describe("Admin", () => {
  it("An admin can erase tables", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#first-name").type("some");
    cy.get("#last-name").type("one");
    cy.get("#username").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    // delete tables
    cy.request("DELETE", "http://localhost:3030/admin/reset", {
      user: "admin",
      password: "password",
    });

    // sign in
    cy.visit("/");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();

    cy.url().should("include", "/");
    cy.get("#email").contains("");
    cy.get("#password").contains("");
    cy.get(".title").contains("Acebook");
  });
});
