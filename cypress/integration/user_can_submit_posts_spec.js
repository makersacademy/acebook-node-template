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

    // cy.get(".new-post-btn").click();

    cy.get("#new-post-form")
      .find('[type="text"]', { force: true })
      .type("Hello, world!", { force: true });
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

    // cy.contains("New post").click();

    cy.get("#new-post-form")
      .find('[type="text"]', { force: true })
      .type("Hello, world!", { force: true });
    cy.get("#new-post-form").submit();
    // cy.contains("New post").click({force:true});
    cy.get("#new-post-form")
      .find('[type="text"]', { force: true })
      .type("AAAAA", { force: true });
    cy.get("#new-post-form").submit();
    // cy.contains("New post").click({force:true})
    cy.get("#new-post-form")
      .find('[type="text"]', { force: true })
      .type("BBB", { force: true });
    cy.get("#new-post-form").submit();
    // cy.contains("New post").click({force:true});
    cy.get("#new-post-form")
      .find('[type="text"]', { force: true })
      .type("a", { force: true });
    cy.get("#new-post-form").submit();

    cy.get(".posts").first().should("contain", "a");
    cy.get(".posts").last().should("contain", "Hello, world!");
  });

  it("the timeline has the logged user first name", () => {
    // sign up
    cy.contains("Log Out").click({ force: true });
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

    //   //check if first name of logged in user appears

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
    // cy.contains("New post").click({force:true});
    cy.get("#new-post-form")
      .find('[type="text"]', { force: true })
      .type("Hello, world!", { force: true });
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
    // cy.contains("New post").click({force:true});
    cy.get("#new-post-form")
      .find('[type="text"]', { force: true })
      .type("Hello, world!", { force: true });
    cy.get("#new-post-form").submit();
    // like post
    // cy.contains("likes").click();
    cy.get("#likes-form").submit();
    cy.get(".posts").should("contain", "1");
  });

  // cn comment on a post

  it("comment on a post", () => {
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
    // cy.contains("New post").click({force:true});
    cy.get("#new-post-form")
      .find('[type="text"]', { force: true })
      .type("Hello, world!", { force: true });
    cy.get("#new-post-form").submit();

    // comment on a post

    // cy.visit("/posts");

    cy.get("#new-comment-form")
      .find('[type="text"]', { force: true })
      .first()
      .type("my first comment", { force: true });
    cy.get("#new-comment-form").submit();

    // get posts with comments

    cy.get(".posts").contains("my first comment");
  });

  it("User photo appears next to post", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("Bob");
    cy.get("#lastName").type("John");
    cy.get("#email").type("a2@a.com");
    cy.get("#password").type("password");
    cy.get("#submit").click({ force: true });
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("a2@a.com");
    cy.get("#password").type("password");
    cy.get("#submit").click({ force: true });
    //submit a post
    cy.visit("/posts");
    // cy.contains("New post").click({force:true});
    cy.get("#new-post-form")
      .find('[type="text"]', { force: true })
      .type("Hello, world!", { force: true });
    cy.get("#new-post-form").submit();
    // check user photo in the post
    cy.visit("/posts");
    cy.get(".posts")
      .find("img")
      .should("have.attr", "src", "/images/default-pic.png");
  });

  it("post has a delete button", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("Bob");
    cy.get("#lastName").type("John");
    cy.get("#email").type("new@new.com");
    cy.get("#password").type("password");
    cy.get("#submit").click({ force: true });
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("new@new.com");
    cy.get("#password").type("password");
    cy.get("#submit").click({ force: true });
    //submit a post
    cy.visit("/posts");

    cy.get("#new-post-form")
      .find('[type="text"]', { force: true })
      .type("Hello, world!", { force: true });
    cy.get("#new-post-form").submit();
    // check if delete button is present
    cy.visit("/posts");
    cy.get("#delete_button").contains("Delete");
  });

  //click on delete button and check if post is deleted
  it("delete a post", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#firstName").type("Bob");
    cy.get("#lastName").type("John");
    cy.get("#email").type("new1@new.com");
    cy.get("#password").type("password");
    cy.get("#submit").click({ force: true });
    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("new1@new.com");
    cy.get("#password").type("password");
    cy.get("#submit").click({ force: true });
    //submit a post
    cy.visit("/posts");

    cy.get("#new-post-form")
      .find('[type="text"]', { force: true })
      .type("Hello, world Again!", { force: true });
    cy.get("#new-post-form").submit();
    // find delete button and click it
    cy.visit("/posts");
    cy.get("#delete_button").click({ force: true });
    // check if post is deleted
    cy.get(".posts").should("not.contain", "Hello, world Again!");
  });
});
