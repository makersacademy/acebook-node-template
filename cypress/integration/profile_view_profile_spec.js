describe("View Profile", () => {
  it("View the profile page", () => {

    cy.signUp()

    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get("#view-profile").click();

    cy.get(".profile").should("contain", "test name");
    cy.get(".posts").should("contain", "Hello, world!");
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