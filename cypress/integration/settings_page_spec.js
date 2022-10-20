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
        // submit a post
         cy.visit("/posts");
   
        // cy.contains("New post").click();
   
         cy.get("#new-post-form")
           .find('[type="text"]', { force: true })
           .type("Hello, world!", { force: true });
         cy.get("#new-post-form").submit();
           // check user photo in the post
         cy.visit("/posts");
         cy.get(".posts")
         .find("img")
         .should("have.attr", "src", "/images/default-pic.png");
    });
  });
});
