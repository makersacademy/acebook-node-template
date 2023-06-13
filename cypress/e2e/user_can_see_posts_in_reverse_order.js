describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    cy.exec("npm run seed");
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

    // submit a post
    cy.visit("/posts");
    cy.get(".new-post-link").click();

    cy.get("#new-post-form").find('[type="text"]').type("Oldest post");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Oldest post");

    cy.get(".new-post-link").click();
    cy.get("#new-post-form").find('[type="text"]').type("Newest post");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Newest post");

    let postOrder = [];
    cy.get(".post-message")
      .each((post) => {
        cy.wrap(post)
          .invoke("text")
          .then((text) => {
            postOrder.push(text.trim());
          });
      })
      .then(() => {
        expect(postOrder).to.deep.equal(["Newest post", "Oldest post"]);
      });
  });
});
