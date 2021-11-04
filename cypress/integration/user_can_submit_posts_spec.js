describe('POSTS', function() {
  before(async(done) => {
        await cy.task("db:drop:all");
        done();
    })
  it('can submit posts without image and view them', function() {
    cy.visit('/posts');
    cy.contains('New post').click();

    cy.get('#new-post-form').find('[type="text"]').type('Hello, world!');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Hello, world!');
  });

  it('can submit posts with image and view them', () => {
    cy.visit('/posts/new');
    cy.get('#new-post-form').find('[type="text"]').type('Panda');
    cy.get('#new-post-form').find('[type="file"]').attachFile('../panda.jpg');
    cy.get('#new-post-form').submit();

    cy.get('.posts').should('contain', 'Panda');
    // cy.get('.posts').contains('img[alt="post image"]', '');
    cy.get('.posts').find('img.post-img').should('have.attr', 'src', '/images/post_imgs/panda.jpg');

  })
});
