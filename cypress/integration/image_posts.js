describe("Timeline", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");

    // sign up + log in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();
  });

  it("can submit posts, when signed in, and view them", () => {
    // submit a post
    cy.visit("/posts");
    cy.get('#message').invoke('attr', 'placeholder').should("contain", " Whats on your mind?")
    cy.get("#message").type("Hello, world!");
    cy.get("#submit").click();
    cy.get(".post__bottom").should("contain", "Hello, world!");
  });

  it.only("uploads an image", () => {
    cy.visit("/posts");
    cy.get("#message").type("I have an image for you!");

    //test image
    const fixtureFile = 'tulips.jpeg';
    cy.get('[data-cy="file-input"]').attachFile(fixtureFile);



    cy.get("#submit").click()

    // check the image is 275 x 183px
    // check image size is 8.6kB
  })
});




