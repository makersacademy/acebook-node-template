describe("Delete request", () => {
  it("It deletes a post via a request", () => {
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

    cy.get("#submit-post").click();

    // this variable helps check that the post being created has the correct time (eg. current time)
    // when this test runs close to the minute it can fail because the variable and post have
    // two different times due to the delay of the request
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

    // post appears in feed with info
    cy.visit("/posts");
    cy.get(".posts").contains("this is a post");
    cy.get(".posts").contains("someone");
    cy.get(".posts").contains(time);

    // make request to delete post
    cy.request("GET", "http://localhost:3030/admin/posts", {
      user: "admin",
      password: "password",
    }).then((response) => {
      cy.request(
        "DELETE",
        `http://localhost:3030/posts/delete/${response.body[0]._id}`
      );
      cy.visit("/admin");
      cy.get("#posts-count").contains("#Posts = 0");
    });
  });
});
