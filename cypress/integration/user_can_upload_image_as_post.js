describe("Timeline", () => {
  it("it should redirect to upload", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("name");
    cy.get("#email").type("someone@example.com");
    cy.get("#password1").type("password");
    cy.get("#password2").type("password");
    cy.get("#submit").click();

    // find the upload button
    cy.get("#image");
  });
  it("it should upload an image", () => {
    // sign up
    cy.get("#name").type("name");
    cy.get("#email").type("someone1@example.com");
    cy.get("#password1").type("password");
    cy.get("#password2").type("password");
    cy.get("#submit").click();

    // submit a post

    // cy.visit("/posts");
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#image").selectFile("images/fb-evil-creator.jpg");
    cy.get("#new-post-form").submit();

    cy.get(".post").first().contains("Hi, guys!");
    cy.get("img").parent(".postImage");
  });
});
