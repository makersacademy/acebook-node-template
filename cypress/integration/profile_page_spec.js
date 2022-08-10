describe("Profile Page", () => {
  it("has a title", () => {
    //sign up
    cy.visit("/users/new");
    cy.get("#email").type("pmonson@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("testusername");
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
    cy.contains("a", "New post");

    // profile page
    cy.visit("users/profile/testusername");
    cy.get(".title").should("contain", "Profile Page");
    cy.get("#first-name").should("contain", "Paris");
    cy.get("#last-name").should("contain", "Monson");
  });
});
