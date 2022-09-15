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

  it("uploads a jpeg image", () => {
    cy.visit("/posts");
    cy.get("#message").type("I have a jpeg image for you!");

    //test image
    cy.get("input[type=file]").selectFile('cypress/fixtures/tulips.jpeg')
    cy.get("#submit").click();

    // check web image size matches test image size
    cy.get("[data-test=image]").isFixtureImage("tulips.jpeg")
  });

  it.only("uploads a png image", () => {
    cy.visit("/posts");
    cy.get("#message").type("I have a png image for you!");

    //test image
    cy.get("input[type=file]").selectFile('cypress/fixtures/tulips.png')
    cy.get("#submit").click();

    // check web image size matches test image size
    cy.get("[data-test=image]").isFixtureImage("tulips.png")
  });
});




