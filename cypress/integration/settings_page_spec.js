describe("photo shows in Settings", () => {
  it("shows photo on settings page", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("Bob");
    cy.get("#lastName").type("John");
    cy.get("#email").type("zz2@zz.com");
    cy.get("#password").type("password");
    cy.get("#submit").click({ force: true });
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("zz@zz.com");
    cy.get("#password").type("password");
    cy.get("#submit").click({ force: true });
    // visit settings

    cy.visit("/users/settings");
    cy.get("#photo_change").submit();
    cy.visit("/users/settings");
    cy.get(".settings")
      .find("img")
      .should("have.attr", "src", "/images/default-pic.png");
  });

  it("shows photo on timeline for user", () => {
    it("shows photo on settings page", () => {
      // sign up
      cy.visit("/users/new");
      cy.get("#firstName").type("Bob");
      cy.get("#lastName").type("John");
      cy.get("#email").type("zz2@zz.com");
      cy.get("#password").type("password");
      cy.get("#submit").click({ force: true });
      // sign in
      cy.visit("/sessions/new");
      cy.get("#email").type("zz@zz.com");
      cy.get("#password").type("password");
      cy.get("#submit").click({ force: true });
      // visit settings

      cy.visit("/users/settings");
      cy.get("#photo_change").submit();
      cy.visit("/users/settings");
      cy.get(".settings")
        .find("img")
        .should("have.attr", "src", "/images/default-pic.png");
    });
    // check photo on timeline
  });
});
