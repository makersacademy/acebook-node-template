describe("Timeline", () => {
  it("can submit posts, when signed in, and view them (with default profile picture)", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("Name");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.contains("Post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
    cy.get("#timeline-profile-photo")
      .should("have.attr", "src")
      .should("include", "/images/cutie-pie.jpeg");
  });

  it("can submit posts, when signed in, and view them in reverse order", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("Name");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post

    cy.get("#new-post-form").find('[type="text"]').type("First post");
    cy.get("#new-post-form").submit();

    // submit another post

    cy.get("#new-post-form").find('[type="text"]').type("Second post");
    cy.get("#new-post-form").submit();

    // expect
    cy.get(".posts:first").should("contain", "Second post");
  });

  it("user can post a picture", () => {
       // sign up
       cy.visit("/users/new");
       cy.get("#name").type("Name");
       cy.get("#email").type("someone@example.com");
       cy.get("#password").type("password");
       cy.get("#submit").click();
   
       // sign in
       cy.get("#email").type("someone@example.com");
       cy.get("#password").type("password");
       cy.get("#submit").click();

      // submit an image
      cy.get("#new-post-form").find('[type="file"]').attachFile("raccoon_1.jpg");
      cy.get("#new-post-form").submit();

      // expect
      // cy.get(".posted-picture:first").should("have.attr", "src").should("include", "http://res.cloudinary.com/");
      // cy.get(".posted-picture:first").should("be.visible");
  })

});
