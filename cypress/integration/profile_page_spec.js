describe("Profile page", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("goes to profile page if user is logged in", () => {
    // sign up + sign in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();

    //profile
    cy.visit("/profile");
    cy.get("h4").should("contain", "someone");
  });

  it("returns to posts when link is clicked", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();
    cy.visit("/profile");
    cy.get("a").contains("Back to posts").click();
    cy.url().should("include", "/posts");
  });
});
