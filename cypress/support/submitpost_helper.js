const submitPost = (message) => {
  cy.visit("/posts");
  cy.get("#new-post-form").find('[type="text"]').type(message);
  cy.get("#new-post-form").submit();
};

module.exports = submitPost;

