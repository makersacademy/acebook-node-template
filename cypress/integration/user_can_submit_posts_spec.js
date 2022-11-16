describe("Timeline", () => {
  beforeEach(() => {
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
  });

  it("can submit posts, when signed in, and view them", () => {
    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
  });

  it("doesn't accept empty posts", () => {
    // user cannot submit empty post
    cy.visit("/posts");
    cy.contains("New post").click();

    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get("#new-post-form").submit();

    cy.then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Post cannot be empty!')
    })
  });

  it("shows the most recent posts first", () => {
    // receive posts sorted by most recent first
    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Goodbye, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").find('li').first().should("contain", "Goodbye, world!");
  });

  it("has a back button that works", () => {
    // receive posts sorted by most recent first
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#cancel").click();
    cy.url().should("include", "/posts");
    cy.url().should("not.include", "new");
  });
});
