describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.signUp()

    // log in
    cy.logIn();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
  });
  
  it("A user tries to submit an empty post", () => {
    // sign up
    cy.signUp();
 
    // log in
    cy.logIn();

    //empty post
    cy.contains("New post").click();
    cy.get("#new-post-form").click();

    cy.url().should("include", "/posts/new");
  });

  it("posts appear in order with latest post first", () => {
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
    cy.contains("New post").click();
    
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    // submit another post
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("post 2");
    cy.get("#new-post-form").submit();

    //checks order of posts
    cy.get(".posts").first().should("contain", "post 2");
  })
});
