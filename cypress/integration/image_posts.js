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

  it("uploads a png image", () => {
    cy.visit("/posts");
    cy.get("#message").type("I have a png image for you!");

    //test image
    cy.get("input[type=file]").selectFile('cypress/fixtures/tulips.png')
    cy.get("#submit").click();

    // check web image size matches test image size
    cy.get("[data-test=image]").isFixtureImage("tulips.png")
  });

  it("wont upload a 7MB image", () => {
    cy.visit("/posts");
    cy.get("#message").type("I have a large image for you!");
    cy.get("input[type=file]").selectFile('cypress/fixtures/magnolia.png')
    cy.get("#submit").click()
    cy.contains("pre", "Payload Too Large")
  })

  it("doesn't allow non images", () => {
    cy.visit("/posts");
    cy.get("#message").type("I have a pdf for you!");
    cy.get("input[type=file]").selectFile('cypress/fixtures/git-cheat-sheet-education.pdf')
    cy.get("#submit").click()
    cy.get('#message').invoke('attr', 'placeholder').should("contain", " Whats on your mind?  Invalid image file")
  })
});
