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

    // submit a post
    cy.visit("/posts");
    cy.get(".new-post-link").click();

    cy.get("#new-post-form").find('[type="text"]').type("Old post");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Old post");

    cy.get(".new-post-link").click();
    cy.get("#new-post-form").find('[type="text"]').type("Newer post");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Newer post");

    // cy.get(".posts").then((posts) => {
    //   const postText = posts.text();
    //   const postOrder = postText.split("\n");

    //   expect(postOrder).to.deep.equal(["Old post", "New post"]);
    // });
  });
});
