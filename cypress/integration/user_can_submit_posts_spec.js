describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // user cannot submit empty post
    cy.visit("/posts");

    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.contains("New post").click();

    cy.get("#new-post-form").submit();

    cy.then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Post cannot be empty!')
    })

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");

    // receive posts sorted by most recent first
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Goodbye, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").find('li').first().should("contain", "Goodbye, world!");
  });
});
