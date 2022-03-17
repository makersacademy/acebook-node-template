describe("View Profile", () => {
  it("View the profile page", async () => {

    cy.visit("/");
    cy.get("#signup").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("someone123");
    cy.get("#submit").click();

    cy.get("#view-profile").click();

    cy.url().should("include", "/users/show");
    cy.contains("p", "test name");
  });

  it("gives a 404 page not found if no user is found", () => {

    cy.request({
      url:'127.0.0.1:3030//users/6230aed25edef17cd0a07d40',
      failOnStatusCode: false
    }).should((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.contain("Not Found")
    })

  })

  it("shows Error if something goes wrong or nonsense passed in URL", () => {

    cy.request({
      url:'127.0.0.1:3030//users/nonsenseblah',
      failOnStatusCode: false
    }).should((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.contain("Error")
    })

  }) 

});