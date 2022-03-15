describe("View Profile", () => {
  it("View the profile page", async () => {
    // sign up

    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#name").type("test name");
    
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get("#view-profile").click();

    cy.url().should("include", "/users/show");
    cy.contains("p", "test name");
  });

  it("shows gives a 404 page not found if no user is found", () => {
    cy.visit("/users/6230a23a415ce14c6cf0f93d")
    cy.contains("Not Found");
  })

  it("shows Error if something goes wrong or nonsense passed in URL", () => {

    cy.request({
      url:'127.0.0.1:3000//users/nonsenseblah',
      failOnStatusCode: false
    }).should((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.contain("Error")
    })
  }) 

});