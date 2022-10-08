describe("Posts page", () => {
    it("is inaccessible when signed out", () => {
      cy.visit("/posts");
      cy.url().should("include", "/sessions/new")
    });
  });
