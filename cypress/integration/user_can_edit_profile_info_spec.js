describe("Profile page", () => {
  it("edits user info", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#firstName").type("Some")
    cy.get("#surName").type("One")
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // profile page
    cy.visit("/profile");
    cy.get("#fullName").should("contain", "Some");
    cy.get("#fullName").should("contain", "One");

    // testing
    cy.visit("/profile/editProfile");
    cy.get('#firstName').type("Anyone");
    cy.get('#surName').type("Else");
    cy.get("#submit").click();

    cy.get("#fullName").should("contain", "Anyone");
    cy.get("#fullName").should("contain", "Else");

  });
});


