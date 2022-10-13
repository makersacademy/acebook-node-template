describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("first name example");
    cy.get("#lastName").type("exampleLastName");
    cy.get("#email").type("someone1000@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone1000@example.com");
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
    cy.get("#email").type("someone@example.biz");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.biz");
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
    cy.get("#email").type("Bob10@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("Bob10@example.com");
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
    cy.get("#email").type("b1@b1.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("b1@b1.com");
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
    cy.get("#email").type("a10@a10.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("a10@a10.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    //submit a post
    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();
    // like post
    // cy.contains("likes").click();
    cy.get("#likes-form").submit();
    cy.get(".posts").should("contain", "1");
  });

  // cn comment on a post

  it.only("comment on a post", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("Bob");
    cy.get("#lastName").type("John");
    cy.get("#email").type("d1@d1.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("d1@d1.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    //submit a post
    cy.visit("/posts");
    cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    // comment on a post

    // cy.visit("/posts");

    cy.get("#new-comment-form")
      .find('[type="text"]')
      .first()
      .type("my first comment");
    cy.get("#new-comment-form").submit();

    // get posts with comments

    cy.get(".posts").contains("my first comment");
  });
});
