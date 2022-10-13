describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("first name example");
    cy.get("#lastName").type("exampleLastName");
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
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
  });
  it("posts display newest first", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("first name example");
    cy.get("#lastName").type("exampleLastName");
    cy.get("#email").type("someone2@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone2@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("AAAAA");
    cy.get("#new-post-form").submit();
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("BBB");
    cy.get("#new-post-form").submit();
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("a");
    cy.get("#new-post-form").submit();

    cy.get(".posts").first().should("contain", "a");
    cy.get(".posts").last().should("contain", "Hello, world!");
  });

  it("the timeline has the logged user first name", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("Bob");
    cy.get("#lastName").type("John");
    cy.get("#email").type("Bob@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("Bob@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    //check if first name of logged in user appears

    cy.visit("/posts");
    cy.get(".title").contains("Hi Bob! Welcome to the TimeLine");
  });
  // users name appears on posts
  it("the timeline has the logged user first name", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("Bob");
    cy.get("#lastName").type("John");
    cy.get("#email").type("b@b.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("b@b.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    //submit a post
    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();
    //check if first name of logged in user appears
    cy.visit("/posts");
    cy.get(".posts").contains("Bob");
  });

  it("logged in users can like posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("Bob");
    cy.get("#lastName").type("John");
    cy.get("#email").type("a@a.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("a@a.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    //submit a post
    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();
    // like post
    cy.get("#like-btn").click({ force: true });
    cy.get(".posts").should("contain", "1");
  });


  it("User photo appears next to post", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("Bob");
    cy.get("#lastName").type("John");
    cy.get("#email").type("a2@a.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("a2@a.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    //submit a post
    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();
    // check user photo in the post
    cy.visit("/posts");
    cy.get(".posts").find("img").should('have.attr', 'src', '/images/profile_picture.png')
  });
});
