describe("Home page", function() {
  it("has a title", function() {
    cy.visit("/");
    cy.get(".title").should("contain", "Acebook");
  });

  it("user can sign up", function() {
    cy.visit("/");
    cy.get('input[name="Terry"]').then($text => {
      const txt = $text.text();
      cy.log(txt);
    });
  });
});
