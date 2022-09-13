describe("Delete posts button", () => {
  it("this deletes a post when clicking on it", () => {
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

    // post appears in feed with info
    cy.visit("/posts");
    cy.get(".posts").contains("this is a post");
    cy.get(".posts").contains("someone");
    cy.get(".posts").contains(time);

    // click delete button on post
    cy.get(".post-delete-button").click();
    cy.get(".post-div-container").get("ul").should("not.exist");
    cy.get(".post-delete-message").contains("This post has been deleted");
  });
});
