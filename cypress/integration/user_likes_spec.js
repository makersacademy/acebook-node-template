describe("Creating posts", function () {
  before(async (done) => {
    await cy.task("db:drop:all");
    done();
  });

  it("allows a user to like a post", function () {
    cy.visitSignUpPage();
    cy.signUpNewUser("Barry Scott", "example");

    cy.makeTestPost();

    cy.contains("Barry Scott").get(".like-icon").click();
    // cy.find("contains", "Barry Scott").get(".like-counter").should ('eq', 1);
  });

});

