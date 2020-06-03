describe('Post model', function() {

	var post;

	beforeEach(function(){
		post = new Post({body: "Jommy Tommins eats Baskin Robins"});
	});

  it('has a body', function() {
		expect(post.body).toEqual("Jommy Tommins eats Baskin Robins"); 
  });
})