const clearTestDatabase = () => {
  beforeEach(() => {
    cy.exec("mongo acebook_test --eval 'db.users.remove({})'");
    cy.exec("mongo acebook_test --eval 'db.posts.remove({})'");
  });
}

module.exports = clearTestDatabase;