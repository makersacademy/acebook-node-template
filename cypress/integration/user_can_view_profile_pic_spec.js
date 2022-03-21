describe("View Profile Pic", () => {
  it("can view profile pic", () => {
    // sign up
    cy.signUp()
    cy.get("#view-profile").click();
    //cy.get("#profile-pic").should("contain", "image");

    cy.get("#profile-pic").should('have.attr', 'src', 'https://thispersondoesnotexist.com/image')
  })
})
    