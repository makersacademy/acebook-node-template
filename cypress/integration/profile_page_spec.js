describe("Profile page", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("goes to profile page if user is logged in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();
    cy.get("#logout").click();

    // sign in
    cy.visit("/");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    //profile
    cy.visit("/profile");

    cy.get(".title").should("contain", "Acebook");
    cy.get("p").should("contain", "someone");
  });
});
