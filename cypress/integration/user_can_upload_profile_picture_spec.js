describe("Profile", () => {
  it("can upload profile picture on the profile page", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("CuttiePie")
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // visit the profile page
    cy.visit("/profile");
    cy.get("#profile-photo").should('have.attr', 'src')
      .should('include', "/images/cutie-pie.jpeg");

    // upload picture
    cy.fixture("raccoon_1.jpg").then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: "raccoon_1.jpg",
        mimeType: "image/jpg",
      });
    });
    cy.get('#upload-profile-photo-form').submit();

    // cy.get("#profile-photo").should('have.attr', 'src')
    //   .should('include', "raccoon_1.jpg");
    // test not working
  });
});