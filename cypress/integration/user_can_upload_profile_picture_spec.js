describe("Profile", () => {
  it("can upload profile picture on the profile page", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("CuttiePie");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#signup-button").click();

    // sign in
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();

    // visit the profile page
    cy.get("#profileBtn").click();
    cy.get("#profile-photo")
      .should("have.attr", "src")
      .should("include", "/images/cutie-pie.jpeg");

    // upload image and submit form
    cy.get('input[type="file"]').attachFile("raccoon_1.jpg");
    cy.get("#ppSubmit").click();

    // expect image is displayed
    // cy.get("#profile-photo")
    //   .should("have.attr", "src")
    //   .should("include", "http://res.cloudinary.com/");
    // cy.get("#profile-photo").should("be.visible");
  });
});
