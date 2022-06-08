const submitPost = (message) => {
  cy.visit("/posts");
  cy.contains("New post").click();
  cy.get("#new-post-form").find('[type="text"]').type(message);
  cy.get("#new-post-form").submit();
};

module.exports = submitPost;

