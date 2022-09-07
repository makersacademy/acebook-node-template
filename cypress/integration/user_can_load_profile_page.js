// const mongoose = require("mongoose");

// require("../../spec/mongodb_helper");
// const User = require("../../models/user");

describe("Profile page", () => {
  // beforeEach((done) => {
  //   mongoose.connection.collections.users.drop(() => {
  //     done();
  //   });
  // });

  it("A user can load a profile page", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#username").type("someone");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // const user = new User({
    //   username: "someone",
    //   first_name: "some",
    //   last_name: "one",
    //   email: "someone@example.com",
    //   password: "password",
    //   friends: ["friend1@gmail.com", "friend2@gmail.com"],
    // });

    // sign in
    cy.visit("/");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#login").click();

    cy.visit("/profiles/someone");
    cy.get("#profile-header").should("contain", "someone's profile");
  });
});
