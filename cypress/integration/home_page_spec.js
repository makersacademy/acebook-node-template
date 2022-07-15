describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });

  // it("Navigates to sign up page", () => {
  //   cy.visit("/");
  //   cy.contains("Sign in").click();
  //   cy.get("./sessions/new").should("Email", "Password");
  // });
  
});
