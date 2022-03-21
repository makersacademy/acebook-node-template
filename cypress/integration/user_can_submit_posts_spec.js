describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    cy.sign_up_and_sign_in();

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");
    
    cy.get(".posts").get("#createdAt").then((test) =>{
      const currentTime = Date.now();
      const postedTime = Date.parse(test.text())
      cy.log(currentTime)
      cy.log(postedTime)
    })
 
  });
});
