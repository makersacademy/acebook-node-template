describe("Profile page", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("goes to profile page if user is logged in", () => {
    // sign up + log in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    //
    cy.visit("/profile");

    // cy.get(".title").should("contain", "Acebook");
    // cy.contains("h1", "Log in");
  });
});
