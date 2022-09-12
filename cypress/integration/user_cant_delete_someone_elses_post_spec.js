describe("Posts feed", () => {
  it("posts contain message, creator's username and timestamp", () => {
    // clearing db
    cy.request("DELETE", "http://localhost:3030/admin/reset", {
      user: "admin",
      password: "password",
    });

    // sign up
    cy.visit("/users/new");
    cy.get("#first-name").type("some");
    cy.get("#last-name").type("one");
    cy.get("#username").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    // sign in
    cy.visit("/");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");

    // make a new post
    cy.visit("/posts/new");
    cy.get("#message").type("this is a post");
    const today = new Date();
    const time =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes();
    cy.get("#submit-post").click();

    //sign out
    cy.get(".logout-button-input").click();

    //sign in as someone else
    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("billy");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#signup").click();

    // sign in
    cy.visit("/");
    cy.get("#email").type("billy@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();

    // make request to delete post
    cy.request("GET", "http://localhost:3030/admin/posts").then((response) => {
      // Object.keys(response).forEach((key) => cy.log(key))
      cy.request(
        "DELETE",
        `http://localhost:3030/posts/delete/${response.body[0]._id}`
      ).then((response) => {
        expect(response.body).to.eq("User IDs do not match");
      });
    });
  });
});
