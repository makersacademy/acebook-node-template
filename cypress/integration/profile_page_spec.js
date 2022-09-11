describe("Profile Page", () => {
  it("Shows logged in users details", () => {
    //sign up
    cy.visit("/users/new");
    cy.get("#email").type("pmonson@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("randomname");
    cy.get("#firstName").type("Paris");
    cy.get("#lastName").type("Monson");
    cy.get("#phoneNumber").type("0733704822");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("pmonson@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");

    cy.get("#new-post-form").within(() => {
      cy.get("input").should("have.value", "New Post");
    });

    // profile page
    cy.visit("users/profile/randomname");
    cy.get(".title").should("contain", "Profile Page");
    cy.get("#first-name").should("contain", "Paris");
    cy.get("#last-name").should("contain", "Monson");
  });
});
